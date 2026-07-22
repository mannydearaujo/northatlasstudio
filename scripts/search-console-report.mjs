#!/usr/bin/env node

// Pulls Search Console performance data using the same service-account JSON key as
// scripts/ga4-report.mjs. Headless by design so it can run from a scheduled task/cron job — see
// CLAUDE.md "AI-Native Operating Loop" for why this exists alongside human-facing dashboards.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { JWT } from "google-auth-library";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const contents = fs.readFileSync(filePath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    value = value.replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function parseArgs(argv) {
  const options = {
    format: "summary",
    days: 28,
    out: "",
    dimensions: "query",
    rowLimit: 20,
  };
  let siteUrl = "";

  for (const arg of argv) {
    if (arg.startsWith("--days=")) {
      options.days = Number(arg.slice("--days=".length));
    } else if (arg.startsWith("--dimensions=")) {
      options.dimensions = arg.slice("--dimensions=".length);
    } else if (arg.startsWith("--row-limit=")) {
      options.rowLimit = Number(arg.slice("--row-limit=".length));
    } else if (arg.startsWith("--format=")) {
      options.format = arg.split("=")[1];
    } else if (arg.startsWith("--out=")) {
      options.out = arg.slice("--out=".length);
    } else if (arg.startsWith("--key-path=")) {
      options.keyPath = arg.slice("--key-path=".length);
    } else if (arg === "--list") {
      options.list = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (!siteUrl) {
      siteUrl = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  return { siteUrl, options };
}

function usage() {
  return [
    "Usage: node scripts/search-console-report.mjs <site-url> [options]",
    "       node scripts/search-console-report.mjs --list",
    "",
    "  <site-url>              e.g. sc-domain:northatlasstudio.com or https://example.com/",
    "",
    "Options:",
    "  --list                  List every Search Console property this service account has",
    "                          access to, then exit.",
    "  --dimensions=a,b        Comma-separated dimensions: query, page, country, device, date.",
    "                          Default: query",
    "  --row-limit=N           Max rows to return. Default: 20",
    "  --days=N                Look back N days (Search Console data lags ~2-3 days). Default: 28",
    "  --format=summary|json   Print a compact summary or JSON. Default: summary",
    "  --out=path              Write JSON to a file",
    "  --key-path=path         Override GA4_SERVICE_ACCOUNT_KEY_PATH for this run",
    "",
    "Requires the service account added as a Restricted (or Full) user under Search Console",
    "Settings > Users and permissions, for each property. Reuses GA4_SERVICE_ACCOUNT_KEY_PATH —",
    "the same key works for both GA4 and Search Console.",
  ].join("\n");
}

async function getAccessToken(keyPath) {
  if (!keyPath || !fs.existsSync(keyPath)) {
    throw new Error(
      `Service account key not found at "${keyPath}". Set GA4_SERVICE_ACCOUNT_KEY_PATH in .env ` +
        `or pass --key-path=..., pointing at the JSON key file (store it outside this repo).`,
    );
  }
  // See scripts/ga4-report.mjs for why we read the key ourselves and pass email/key explicitly
  // rather than using JWT's `keyFile` option (which silently failed with "invalid_grant" here).
  const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));
  const auth = new JWT({ email: key.client_email, key: key.private_key, scopes: SCOPES });
  const token = await auth.authorize();
  return token.access_token;
}

async function listSites(accessToken) {
  const response = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || response.statusText;
    throw new Error(`Search Console sites.list failed: ${message}`);
  }
  return (data.siteEntry || []).map((entry) => ({
    siteUrl: entry.siteUrl,
    permissionLevel: entry.permissionLevel,
  }));
}

function isoDateDaysAgo(days) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

async function queryAnalytics(siteUrl, accessToken, days, dimensions, rowLimit) {
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;

  const body = {
    startDate: isoDateDaysAgo(days),
    endDate: isoDateDaysAgo(2), // Search Console data typically lags 2-3 days
    dimensions,
    rowLimit,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || response.statusText;
    throw new Error(`Search Console searchAnalytics.query failed for ${siteUrl}: ${message}`);
  }
  return data;
}

function summarize(siteUrl, days, dimensions, data) {
  const rows = (data.rows || []).map((row) => ({
    keys: row.keys,
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));

  return {
    siteUrl,
    days,
    dimensions,
    fetchedAt: new Date().toISOString(),
    rows,
    rowCount: rows.length,
  };
}

function printSummary(summary) {
  console.log(`\nSearch Console: ${summary.siteUrl} — last ${summary.days} days, by ${summary.dimensions.join(", ")}`);
  if (summary.rows.length === 0) {
    console.log("No rows returned in this window.");
    return;
  }
  for (const row of summary.rows) {
    const label = row.keys.join(" / ");
    console.log(
      `- ${label}: ${row.clicks} clicks, ${row.impressions} impressions, ` +
        `${(row.ctr * 100).toFixed(1)}% CTR, avg position ${row.position.toFixed(1)}`,
    );
  }
}

async function main() {
  loadEnvFile(path.join(root, ".env"));
  loadEnvFile(path.join(root, ".env.local"));

  const { siteUrl, options } = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const keyPath = options.keyPath || process.env.GA4_SERVICE_ACCOUNT_KEY_PATH;
  const accessToken = await getAccessToken(keyPath);

  if (options.list) {
    const sites = await listSites(accessToken);
    if (sites.length === 0) {
      console.log(
        "No Search Console properties visible to this service account yet.\n" +
          "Add it under Search Console > Settings > Users and permissions for each property, " +
          "then re-run this.",
      );
      return;
    }
    console.log(`\nSearch Console properties visible to this service account (${sites.length}):`);
    for (const site of sites) {
      console.log(`- ${site.siteUrl} (${site.permissionLevel})`);
    }
    return;
  }

  if (!siteUrl) {
    throw new Error(`${usage()}\n\nMissing site URL.`);
  }
  if (!["summary", "json"].includes(options.format)) {
    throw new Error("--format must be summary or json.");
  }
  if (!Number.isFinite(options.days) || options.days <= 0) {
    throw new Error("--days must be a positive number.");
  }

  const dimensions = options.dimensions.split(",").map((d) => d.trim()).filter(Boolean);
  const data = await queryAnalytics(siteUrl, accessToken, options.days, dimensions, options.rowLimit);
  const summary = summarize(siteUrl, options.days, dimensions, data);

  if (options.out) {
    const outPath = path.resolve(root, options.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, `${JSON.stringify(summary, null, 2)}\n`);
    console.log(`Wrote ${path.relative(root, outPath)}`);
  }

  if (options.format === "json") {
    console.log(JSON.stringify(summary, null, 2));
  } else if (!options.out) {
    printSummary(summary);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
