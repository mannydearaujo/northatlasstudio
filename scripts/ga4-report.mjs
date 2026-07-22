#!/usr/bin/env node

// Pulls real-lead Key Event counts from the GA4 Data API using a service-account JSON key.
// Headless by design (no OAuth consent screen) so it can run from a scheduled task/cron job —
// see NEXT-STEPS.md and CLAUDE.md "AI-Native Operating Loop" for why this exists alongside the
// human-facing Looker Studio dashboards (this script is for automated priority-signal pulls, not
// client-facing reporting).

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { JWT } from "google-auth-library";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

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
    days: 7,
    out: "",
    events: "",
  };
  let propertyId = "";

  for (const arg of argv) {
    if (arg.startsWith("--property=")) {
      propertyId = arg.slice("--property=".length);
    } else if (arg.startsWith("--days=")) {
      options.days = Number(arg.slice("--days=".length));
    } else if (arg.startsWith("--events=")) {
      options.events = arg.slice("--events=".length);
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
    } else if (!propertyId) {
      propertyId = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  return { propertyId, options };
}

function usage() {
  return [
    "Usage: node scripts/ga4-report.mjs <property-id> [options]",
    "       node scripts/ga4-report.mjs --list",
    "",
    "  <property-id>          Numeric GA4 property ID (Admin > Property Settings), NOT the",
    "                          measurement ID (G-XXXXXXX). Find it at analytics.google.com.",
    "",
    "Options:",
    "  --list                  List every GA4 property the service account currently has",
    "                          Viewer access to (name + numeric property ID), then exit.",
    "                          Use this instead of hunting through the GA4 UI.",
    "  --events=a,b,c          Comma-separated real-lead event names to report on (Key Events).",
    "                          If omitted, reports on all events with any volume.",
    "  --days=N                Look back N days. Default: 7",
    "  --format=summary|json   Print a compact summary or JSON. Default: summary",
    "  --out=path              Write JSON to a file",
    "  --key-path=path         Override GA4_SERVICE_ACCOUNT_KEY_PATH for this run",
    "",
    "Requires a Google service account with Viewer access on the GA4 property, granted via",
    "GA4 Admin > Property Access Management. Store the JSON key path (not the key contents) in",
    "GA4_SERVICE_ACCOUNT_KEY_PATH — recommended location is OUTSIDE this repo entirely, e.g.",
    "~/.secrets/north-atlas-ga4-service-account.json. Never commit the key file.",
  ].join("\n");
}

async function getAccessToken(keyPath) {
  if (!keyPath || !fs.existsSync(keyPath)) {
    throw new Error(
      `Service account key not found at "${keyPath}". Set GA4_SERVICE_ACCOUNT_KEY_PATH in .env ` +
        `or pass --key-path=..., pointing at the JSON key file (store it outside this repo).`,
    );
  }
  // Read the key ourselves and pass email/key explicitly rather than using JWT's `keyFile`
  // option — `keyFile` silently failed to authenticate in this environment (google-auth-library
  // 10.9.0) with "invalid_grant: account not found" even for a valid, active service account;
  // explicit email/key works reliably. Verified against gcloud with the same key file.
  const key = JSON.parse(fs.readFileSync(keyPath, "utf8"));
  const auth = new JWT({ email: key.client_email, key: key.private_key, scopes: SCOPES });
  const token = await auth.authorize();
  return token.access_token;
}

async function listAccessibleProperties(accessToken) {
  const properties = [];
  let pageToken = "";

  do {
    const endpoint = new URL("https://analyticsadmin.googleapis.com/v1beta/accountSummaries");
    endpoint.searchParams.set("pageSize", "200");
    if (pageToken) endpoint.searchParams.set("pageToken", pageToken);

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || response.statusText;
      throw new Error(`GA4 Admin API failed: ${message}`);
    }

    for (const account of data.accountSummaries || []) {
      for (const property of account.propertySummaries || []) {
        properties.push({
          accountName: account.displayName,
          propertyName: property.displayName,
          propertyId: property.property.replace("properties/", ""),
        });
      }
    }
    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return properties;
}

async function runReport(propertyId, accessToken, days, eventNames) {
  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

  const body = {
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
  };

  if (eventNames.length > 0) {
    body.dimensionFilter = {
      filter: {
        fieldName: "eventName",
        inListFilter: { values: eventNames },
      },
    };
  }

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
    throw new Error(`GA4 Data API failed for property ${propertyId}: ${message}`);
  }
  return data;
}

function summarize(propertyId, days, data) {
  const rows = data.rows || [];
  const events = rows.map((row) => ({
    eventName: row.dimensionValues[0].value,
    eventCount: Number(row.metricValues[0].value),
  }));
  events.sort((a, b) => b.eventCount - a.eventCount);

  return {
    propertyId,
    days,
    fetchedAt: new Date().toISOString(),
    events,
    rowCount: events.length,
  };
}

function printSummary(summary) {
  console.log(`\nGA4 property ${summary.propertyId} — last ${summary.days} days`);
  if (summary.events.length === 0) {
    console.log("No events found in this window.");
    return;
  }
  for (const event of summary.events) {
    console.log(`- ${event.eventName}: ${event.eventCount}`);
  }
}

async function main() {
  loadEnvFile(path.join(root, ".env"));
  loadEnvFile(path.join(root, ".env.local"));

  const { propertyId, options } = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const keyPath = options.keyPath || process.env.GA4_SERVICE_ACCOUNT_KEY_PATH;
  const accessToken = await getAccessToken(keyPath);

  if (options.list) {
    const properties = await listAccessibleProperties(accessToken);
    if (properties.length === 0) {
      console.log(
        "No GA4 properties visible to this service account yet.\n" +
          "Grant it Viewer access under GA4 Admin > Property Access Management for each property, " +
          "then re-run this.",
      );
      return;
    }
    console.log(`\nGA4 properties visible to this service account (${properties.length}):`);
    for (const property of properties) {
      console.log(`- [${property.propertyId}] ${property.propertyName} (${property.accountName})`);
    }
    return;
  }

  if (!propertyId) {
    throw new Error(`${usage()}\n\nMissing GA4 property ID.`);
  }
  if (!["summary", "json"].includes(options.format)) {
    throw new Error("--format must be summary or json.");
  }
  if (!Number.isFinite(options.days) || options.days <= 0) {
    throw new Error("--days must be a positive number.");
  }

  const eventNames = options.events
    ? options.events.split(",").map((name) => name.trim()).filter(Boolean)
    : [];

  const data = await runReport(propertyId, accessToken, options.days, eventNames);
  const summary = summarize(propertyId, options.days, data);

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
