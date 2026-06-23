#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SCORE_CATEGORIES = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best Practices",
  seo: "SEO",
};

const METRICS = {
  "first-contentful-paint": "FCP",
  "largest-contentful-paint": "LCP",
  "speed-index": "Speed Index",
  "total-blocking-time": "TBT",
  "cumulative-layout-shift": "CLS",
};

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
    full: false,
    out: "",
    strategy: "mobile",
  };
  let url = "";

  for (const arg of argv) {
    if (arg.startsWith("--strategy=")) {
      options.strategy = arg.split("=")[1];
    } else if (arg.startsWith("--out=")) {
      options.out = arg.slice("--out=".length);
    } else if (arg.startsWith("--format=")) {
      options.format = arg.split("=")[1];
    } else if (arg.startsWith("--key=")) {
      options.key = arg.slice("--key=".length);
    } else if (arg === "--full") {
      options.full = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (!url) {
      url = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  return { url, options };
}

function usage() {
  return [
    "Usage: node scripts/pagespeed-insights.mjs <url> [options]",
    "",
    "Options:",
    "  --strategy=mobile|desktop|both   Run one strategy or both. Default: mobile",
    "  --format=summary|json            Print a compact summary or compact JSON. Default: summary",
    "  --out=path                       Write compact JSON to a file",
    "  --full                           Include the full API response in JSON output",
    "  --key=API_KEY                    Override PAGESPEED_API_KEY for this run",
    "",
    "Store the key in .env or .env.local as PAGESPEED_API_KEY=...",
  ].join("\n");
}

function validateUrl(value) {
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("URL must start with http:// or https://");
    }
    return parsed.toString();
  } catch (error) {
    throw new Error(`Invalid URL: ${value}. ${error.message}`);
  }
}

function score(category) {
  if (!category || typeof category.score !== "number") return null;
  return Math.round(category.score * 100);
}

function auditValue(audit) {
  if (!audit) return null;
  return {
    displayValue: audit.displayValue || "",
    numericValue: typeof audit.numericValue === "number" ? audit.numericValue : null,
    score: typeof audit.score === "number" ? audit.score : null,
  };
}

function topFailingAudits(audits) {
  return Object.entries(audits)
    .filter(([, audit]) => typeof audit.score === "number" && audit.score < 0.9)
    .map(([id, audit]) => ({
      id,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue || "",
      description: audit.description || "",
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 12);
}

function summarize(data, strategy, includeFullResponse) {
  const lighthouse = data.lighthouseResult || {};
  const categories = lighthouse.categories || {};
  const audits = lighthouse.audits || {};

  const categoryScores = Object.fromEntries(
    Object.entries(SCORE_CATEGORIES).map(([id, label]) => [
      id,
      { label, score: score(categories[id]) },
    ]),
  );

  const metrics = Object.fromEntries(
    Object.entries(METRICS).map(([id, label]) => [
      id,
      { label, ...auditValue(audits[id]) },
    ]),
  );

  const summary = {
    requestedUrl: data.id || "",
    finalUrl: lighthouse.finalDisplayedUrl || lighthouse.finalUrl || "",
    strategy,
    fetchedAt: new Date().toISOString(),
    categories: categoryScores,
    metrics,
    coreWebVitalsUrl: data.loadingExperience?.overall_category || "UNAVAILABLE",
    coreWebVitalsOrigin: data.originLoadingExperience?.overall_category || "UNAVAILABLE",
    topFailingAudits: topFailingAudits(audits),
  };

  if (includeFullResponse) {
    summary.raw = data;
  }

  return summary;
}

function printSummary(results) {
  for (const result of results) {
    console.log(`\n${result.strategy.toUpperCase()} - ${result.finalUrl || result.requestedUrl}`);
    console.log("Scores:");
    for (const item of Object.values(result.categories)) {
      console.log(`- ${item.label}: ${item.score ?? "n/a"}`);
    }
    console.log("Metrics:");
    for (const item of Object.values(result.metrics)) {
      console.log(`- ${item.label}: ${item.displayValue || "n/a"}`);
    }
    console.log(`Core Web Vitals origin: ${result.coreWebVitalsOrigin}`);
    console.log("Top failing audits:");
    for (const audit of result.topFailingAudits.slice(0, 6)) {
      const value = audit.displayValue ? ` (${audit.displayValue})` : "";
      console.log(`- ${audit.title}${value}`);
    }
  }
}

async function fetchPageSpeed(url, strategy, apiKey) {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("key", apiKey);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("category", "performance");
  endpoint.searchParams.append("category", "accessibility");
  endpoint.searchParams.append("category", "best-practices");
  endpoint.searchParams.append("category", "seo");

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || response.statusText;
    throw new Error(`PageSpeed Insights API failed for ${strategy}: ${message}`);
  }

  return data;
}

async function main() {
  loadEnvFile(path.join(root, ".env"));
  loadEnvFile(path.join(root, ".env.local"));

  const { url, options } = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  if (!url) {
    throw new Error(`${usage()}\n\nMissing URL.`);
  }

  if (!["mobile", "desktop", "both"].includes(options.strategy)) {
    throw new Error("--strategy must be mobile, desktop, or both.");
  }

  if (!["summary", "json"].includes(options.format)) {
    throw new Error("--format must be summary or json.");
  }

  const apiKey = options.key || process.env.PAGESPEED_API_KEY;
  if (!apiKey || apiKey.includes("replace-with")) {
    throw new Error("Missing PAGESPEED_API_KEY. Add it to .env or .env.local, or pass --key=...");
  }

  const targetUrl = validateUrl(url);
  const strategies = options.strategy === "both" ? ["mobile", "desktop"] : [options.strategy];
  const results = [];

  for (const strategy of strategies) {
    const data = await fetchPageSpeed(targetUrl, strategy, apiKey);
    results.push(summarize(data, strategy, options.full));
  }

  if (options.out) {
    const outPath = path.resolve(root, options.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, `${JSON.stringify(results, null, 2)}\n`);
    console.log(`Wrote ${path.relative(root, outPath)}`);
  }

  if (options.format === "json") {
    console.log(JSON.stringify(results, null, 2));
  } else if (!options.out) {
    printSummary(results);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
