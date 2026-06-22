#!/usr/bin/env node
import fs from 'node:fs';
const files = process.argv.slice(2);
if (!files.length) { console.error('Usage: check-schema-faq-sync.js <html-file> [...]'); process.exit(1); }
function stripTags(s) { return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
let failed = false;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const visible = stripTags(html);
  const h1s = [...html.matchAll(/<h1/gi)].length;
  if (h1s !== 1) { console.log(`${file}: expected one H1, found ${h1s}`); failed = true; }
  if (!/<title>[\s\S]*?<\/title>/i.test(html)) { console.log(`${file}: missing title`); failed = true; }
  if (!/rel=["']canonical["']/i.test(html)) { console.log(`${file}: missing canonical`); failed = true; }
  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    let data; try { data = JSON.parse(match[1]); } catch { console.log(`${file}: invalid JSON-LD`); failed = true; continue; }
    const nodes = Array.isArray(data) ? data : [data];
    for (const node of nodes) if (node['@type'] === 'FAQPage' && Array.isArray(node.mainEntity)) {
      for (const item of node.mainEntity) { const q = item.name || ''; if (q && !visible.includes(q)) { console.log(`${file}: FAQ schema question not visible: ${q}`); failed = true; } }
    }
  }
}
process.exit(failed ? 1 : 0);
