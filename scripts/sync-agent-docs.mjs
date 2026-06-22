#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const checkOnly = process.argv.includes("--check");

const claudePath = path.join(root, "CLAUDE.md");
const agentsPath = path.join(root, "AGENTS.md");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function buildAgentsDoc(claudeDoc) {
  return [
    "<!--",
    "Generated from CLAUDE.md by scripts/sync-agent-docs.mjs.",
    "Edit CLAUDE.md, then run: node scripts/sync-agent-docs.mjs",
    "-->",
    "",
    claudeDoc.trimEnd(),
    "",
  ].join("\n");
}

const claudeDoc = read(claudePath);
const expectedAgentsDoc = buildAgentsDoc(claudeDoc);
const currentAgentsDoc = fs.existsSync(agentsPath) ? read(agentsPath) : "";
const isSynced = currentAgentsDoc === expectedAgentsDoc;

if (checkOnly) {
  if (!isSynced) {
    console.error("AGENTS.md is not synced with CLAUDE.md. Run `node scripts/sync-agent-docs.mjs`.");
    process.exit(1);
  }

  console.log("AGENTS.md is synced with CLAUDE.md.");
  process.exit(0);
}

if (!isSynced) {
  fs.writeFileSync(agentsPath, expectedAgentsDoc);
}

console.log(isSynced ? "AGENTS.md is already synced." : "AGENTS.md synced from CLAUDE.md.");
