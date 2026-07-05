#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const checkOnly = process.argv.includes("--check");

const paths = {
  agents: path.join(root, "AGENTS.md"),
  agencySkills: path.join(root, "agency-skills"),
  blueprint: path.join(root, "BUSINESS-BLUEPRINT.md"),
  claude: path.join(root, "CLAUDE.md"),
  index: path.join(root, "index.html"),
  robots: path.join(root, "robots.txt"),
  sitemap: path.join(root, "sitemap.xml"),
};

const skillInstallTargets = [
  { label: "Codex", directory: path.join(os.homedir(), ".codex", "skills") },
  { label: "Claude", directory: path.join(os.homedir(), ".claude", "skills") },
];

const sourceFiles = [
  "index.html",
  "README.md",
  "90-day-rollout-plan.md",
  "GA4-lead-logic.md",
  "weekly-report-template.md",
  "NEXT-STEPS.md",
  "ai-search-reference.md",
  "docs/brand/BRAND-GUIDE.md",
];

const requiredCopy = [
  "North Atlas Studio",
  "local service businesses",
  "local SEO",
  "AI-assisted discovery",
  "GA4",
  "calls",
  "quote requests",
  "bookings",
  "Golden Paws",
  "AlphaGutterCo",
];

const stalePatterns = [
  { label: "old brand name", pattern: /\bNorthline\b/gi },
  { label: "old brand name", pattern: /\bNorthPoint\b/gi },
  { label: "old positioning", pattern: /\bLocal Growth Agency\b/gi },
  { label: "placeholder proof metric", pattern: /\[\+X%\]/gi },
  { label: "placeholder form endpoint", pattern: /\bYOUR_FORM_ID\b/gi },
  { label: "brand-pack template placeholder", pattern: /\bAlex Mercer\b|\b123 Atlas Way\b|\b401 555\b/gi },
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, contents) {
  fs.writeFileSync(filePath, contents);
}

function buildAgentsDoc() {
  if (!fs.existsSync(paths.claude)) return "";

  return [
    "<!--",
    "Generated from CLAUDE.md by scripts/sync-agent-docs.mjs.",
    "Edit CLAUDE.md, then run: node scripts/sync-agent-docs.mjs",
    "-->",
    "",
    read(paths.claude).trimEnd(),
    "",
  ].join("\n");
}

function syncAgentDocs() {
  const expectedAgentsDoc = buildAgentsDoc();
  if (!expectedAgentsDoc) {
    return {
      isSynced: true,
      nextAgentsDoc: "",
    };
  }

  const currentAgentsDoc = fs.existsSync(paths.agents) ? read(paths.agents) : "";

  return {
    isSynced: currentAgentsDoc === expectedAgentsDoc,
    nextAgentsDoc: expectedAgentsDoc,
  };
}

function directoryEntries(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.name !== ".DS_Store")
    .sort((a, b) => a.name.localeCompare(b.name));
}

function relativeFiles(directory, prefix = "") {
  const files = [];

  for (const entry of directoryEntries(directory)) {
    const relativePath = path.join(prefix, entry.name);
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...relativeFiles(fullPath, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files.sort();
}

function compareSkillDirectories(sourceDirectory, targetDirectory) {
  if (!fs.existsSync(targetDirectory)) {
    return ["install target is missing"];
  }

  const sourceFiles = relativeFiles(sourceDirectory);
  const targetFiles = relativeFiles(targetDirectory);
  const findings = [];
  const allFiles = [...new Set([...sourceFiles, ...targetFiles])].sort();

  for (const relativeFile of allFiles) {
    const sourcePath = path.join(sourceDirectory, relativeFile);
    const targetPath = path.join(targetDirectory, relativeFile);

    if (!fs.existsSync(sourcePath)) {
      findings.push(`extra installed file: ${relativeFile}`);
      continue;
    }

    if (!fs.existsSync(targetPath)) {
      findings.push(`missing installed file: ${relativeFile}`);
      continue;
    }

    if (read(sourcePath) !== read(targetPath)) {
      findings.push(`differs from source: ${relativeFile}`);
    }
  }

  return findings;
}

function checkAgencySkillMirrors() {
  if (!fs.existsSync(paths.agencySkills)) {
    return [];
  }

  const findings = [];
  const skills = directoryEntries(paths.agencySkills).filter((entry) => entry.isDirectory());

  for (const skill of skills) {
    const sourceDirectory = path.join(paths.agencySkills, skill.name);

    for (const target of skillInstallTargets) {
      const targetDirectory = path.join(target.directory, skill.name);
      const targetFindings = compareSkillDirectories(sourceDirectory, targetDirectory);

      for (const finding of targetFindings) {
        findings.push(`${skill.name} -> ${target.label}: ${finding}`);
      }
    }
  }

  return findings;
}

function todayIso() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function tagAttributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), match[2].trim()]),
  );
}

function metaContent(html, key, value) {
  for (const match of html.matchAll(/<meta\s+[^>]*>/gi)) {
    const attributes = tagAttributes(match[0]);
    if ((attributes[key] || "").toLowerCase() === value.toLowerCase()) {
      return attributes.content || "";
    }
  }
  return "";
}

function linkHref(html, rel) {
  const tagMatch = html.match(new RegExp(`<link\\s+[^>]*rel=["']${rel}["'][^>]*>`, "i"));
  if (!tagMatch) return "";
  return tagAttributes(tagMatch[0]).href || "";
}

function title(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : "";
}

function h1(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? stripTags(match[1]) : "";
}

function jsonLd(html) {
  const match = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (!match) return null;
  return JSON.parse(match[1]);
}

function schemaNodes(schema) {
  const roots = Array.isArray(schema) ? schema : [schema];
  return roots.flatMap((node) => {
    if (node && Array.isArray(node["@graph"])) return node["@graph"];
    return node ? [node] : [];
  });
}

function nodeTypes(node) {
  return Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]].filter(Boolean);
}

function findSchemaNode(schema, preferredTypes) {
  const preferred = new Set(preferredTypes);
  return schemaNodes(schema).find((node) => nodeTypes(node).some((type) => preferred.has(type))) || null;
}

function sectionIds(html) {
  return [...html.matchAll(/<section\b[^>]*>/gi)]
    .map((match, index) => tagAttributes(match[0]).id || `section-${index + 1}`)
    .join(", ");
}

function sitemapValue(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

function robotsSitemap(robots) {
  const match = robots.match(/^Sitemap:\s*(.+)$/im);
  return match ? match[1].trim() : "";
}

function contactAction(html) {
  const match = html.match(/<form\b[^>]*id=["']audit-form["'][^>]*>/i);
  if (!match) return "";
  return tagAttributes(match[0]).action || "";
}

function markdownList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function runGuardrails() {
  const findings = [];

  for (const relativeFile of sourceFiles) {
    const filePath = path.join(root, relativeFile);
    if (!fs.existsSync(filePath)) continue;
    const contents = read(filePath);

    for (const { label, pattern } of stalePatterns) {
      pattern.lastIndex = 0;
      for (const match of contents.matchAll(pattern)) {
        const line = contents.slice(0, match.index).split("\n").length;
        findings.push(`${relativeFile}:${line} contains ${label}: ${match[0]}`);
      }
    }
  }

  return findings;
}

function buildSnapshot() {
  const html = read(paths.index);
  const robots = read(paths.robots);
  const sitemap = read(paths.sitemap);
  const schema = jsonLd(html);
  const businessSchema = findSchemaNode(schema, ["ProfessionalService", "LocalBusiness", "Organization"]);

  const snapshot = {
    title: title(html),
    description: metaContent(html, "name", "description"),
    canonical: linkHref(html, "canonical"),
    h1: h1(html),
    ogTitle: metaContent(html, "property", "og:title"),
    ogDescription: metaContent(html, "property", "og:description"),
    ogImage: metaContent(html, "property", "og:image"),
    twitterTitle: metaContent(html, "name", "twitter:title"),
    twitterDescription: metaContent(html, "name", "twitter:description"),
    twitterImage: metaContent(html, "name", "twitter:image"),
    schemaType: nodeTypes(businessSchema).join(", "),
    schemaName: businessSchema?.name || "",
    schemaUrl: businessSchema?.url || "",
    schemaImage: businessSchema?.image || "",
    serviceCatalog: businessSchema?.hasOfferCatalog?.itemListElement
      ?.map((item) => item.itemOffered?.name || item.name)
      .filter(Boolean)
      .join(", ") || "",
    robotsSitemap: robotsSitemap(robots),
    sitemapLoc: sitemapValue(sitemap, "loc"),
    sitemapLastmod: sitemapValue(sitemap, "lastmod"),
    sections: sectionIds(html),
    contactAction: contactAction(html),
  };

  const missingRequiredCopy = requiredCopy.filter((phrase) => !html.includes(phrase));
  return { snapshot, missingRequiredCopy };
}

function buildGeneratedBlock(snapshot) {
  const lines = [
    "<!-- production-sync:start -->",
    "## Production Sync Snapshot",
    "",
    `Last generated: ${todayIso()}`,
    "",
    "This section is generated from production-facing files by `node scripts/production-sync.mjs`. Edit the source files first, then rerun the sync.",
    "",
    "### Homepage Metadata",
    "",
    markdownList([
      `Title: ${snapshot.title}`,
      `Meta description: ${snapshot.description}`,
      `Canonical URL: ${snapshot.canonical}`,
      `H1: ${snapshot.h1}`,
    ]),
    "",
    "### Social Preview",
    "",
    markdownList([
      `Open Graph title: ${snapshot.ogTitle}`,
      `Open Graph description: ${snapshot.ogDescription}`,
      `Open Graph image: ${snapshot.ogImage}`,
      `Twitter title: ${snapshot.twitterTitle}`,
      `Twitter description: ${snapshot.twitterDescription}`,
      `Twitter image: ${snapshot.twitterImage}`,
    ]),
    "",
    "### Schema, Robots, and Sitemap",
    "",
    markdownList([
      `JSON-LD type: ${snapshot.schemaType}`,
      `JSON-LD name: ${snapshot.schemaName}`,
      `JSON-LD URL: ${snapshot.schemaUrl}`,
      `JSON-LD image: ${snapshot.schemaImage}`,
      `JSON-LD services: ${snapshot.serviceCatalog}`,
      `Robots sitemap: ${snapshot.robotsSitemap}`,
      `Sitemap URL: ${snapshot.sitemapLoc}`,
      `Sitemap lastmod: ${snapshot.sitemapLastmod}`,
    ]),
    "",
    "### Production Structure",
    "",
    markdownList([
      `Homepage sections: ${snapshot.sections}`,
      `Audit form action: ${snapshot.contactAction}`,
    ]),
    "<!-- production-sync:end -->",
  ];

  return lines.join("\n");
}

function updateBlueprint(blueprint, snapshot) {
  const generatedBlock = buildGeneratedBlock(snapshot);
  let next = blueprint.replace(/^_Production sync: .+_$/m, `_Production sync: ${todayIso()}_`);

  next = next.replace(
    /^\*\*Current production title:\*\*.*$/m,
    `**Current production title:** ${snapshot.title}`,
  );
  next = next.replace(
    /^\*\*Current production meta description:\*\*.*$/m,
    `**Current production meta description:** ${snapshot.description}`,
  );
  next = next.replace(
    /^\*\*Core homepage promise:\*\*.*$/m,
    `**Core homepage promise:** ${snapshot.h1.replace(/\.$/, "")}.`,
  );

  const blockPattern = /<!-- production-sync:start -->[\s\S]*?<!-- production-sync:end -->/;
  if (blockPattern.test(next)) {
    return next.replace(blockPattern, generatedBlock);
  }

  const insertAfter = "When production changes, update the relevant section below in the same commit. Do not keep multiple competing versions of positioning, offers, or proof.";
  return next.replace(insertAfter, `${insertAfter}\n\n${generatedBlock}`);
}

const { snapshot, missingRequiredCopy } = buildSnapshot();
const guardrailFindings = runGuardrails();
const currentBlueprint = read(paths.blueprint);
const syncedBlueprint = updateBlueprint(currentBlueprint, snapshot);
const isSynced = currentBlueprint === syncedBlueprint;
const agentDocs = syncAgentDocs();
const skillMirrorFindings = checkAgencySkillMirrors();

if (checkOnly) {
  if (!isSynced || !agentDocs.isSynced || skillMirrorFindings.length || guardrailFindings.length || missingRequiredCopy.length) {
    console.error("Production sync check failed.");
    if (!isSynced) console.error("- BUSINESS-BLUEPRINT.md is not synced with production files.");
    if (!agentDocs.isSynced) console.error("- AGENTS.md is not synced with CLAUDE.md.");
    for (const finding of skillMirrorFindings) console.error(`- agency skill mirror drift: ${finding}`);
    for (const finding of guardrailFindings) console.error(`- ${finding}`);
    for (const phrase of missingRequiredCopy) console.error(`- index.html is missing required positioning phrase: ${phrase}`);
    process.exit(1);
  }

  console.log("Production sync check passed.");
  process.exit(0);
}

if (!isSynced) {
  write(paths.blueprint, syncedBlueprint);
}

if (!agentDocs.isSynced) {
  write(paths.agents, agentDocs.nextAgentsDoc);
}

if (skillMirrorFindings.length || guardrailFindings.length || missingRequiredCopy.length) {
  console.error("Production sync completed with issues to review.");
  for (const finding of skillMirrorFindings) console.error(`- agency skill mirror drift: ${finding}`);
  for (const finding of guardrailFindings) console.error(`- ${finding}`);
  for (const phrase of missingRequiredCopy) console.error(`- index.html is missing required positioning phrase: ${phrase}`);
  process.exit(1);
}

const messages = [
  isSynced ? "BUSINESS-BLUEPRINT.md is already synced." : "BUSINESS-BLUEPRINT.md synced from production files.",
  agentDocs.isSynced ? "AGENTS.md is already synced." : "AGENTS.md synced from CLAUDE.md.",
  "Agency skill mirrors are synced.",
];

console.log(messages.join("\n"));
