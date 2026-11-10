#!/usr/bin/env node
// Usage: npm run new-tool -- <slug> "<Tool name>" <category> <flag>
// Example: npm run new-tool -- canada-rrsp-calculator "RRSP Calculator" Canada ca
// flag = in | us | uk | ca | au | sg | ae | ie | global
import fs from "node:fs";
import path from "node:path";

const [slug, name, category = "Salary", flag = "global"] = process.argv.slice(2);
if (!slug || !name) { console.error('Usage: npm run new-tool -- <slug> "<Tool name>" <category> <flag>'); process.exit(1); }
if (!/^[a-z0-9-]+$/.test(slug)) { console.error("slug must be lowercase letters, numbers and dashes"); process.exit(1); }
if (!["in", "us", "uk", "ca", "au", "sg", "ae", "ie", "global"].includes(flag)) { console.error("unknown flag: " + flag); process.exit(1); }

const comp = slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("") + "Tool";
const root = process.cwd();
const metaFile = path.join(root, "src/lib/site.ts");
const idxFile = path.join(root, "src/tools/index.tsx");
const compFile = path.join(root, `src/tools/${comp}.tsx`);

let meta = fs.readFileSync(metaFile, "utf8");
if (meta.includes(`slug: "${slug}"`)) { console.error("A tool with this slug already exists."); process.exit(1); }
if (fs.existsSync(compFile)) { console.error(compFile + " already exists."); process.exit(1); }

const q = (s) => JSON.stringify(s);
const entry = `  {
    slug: ${q(slug)},
    name: ${q(name)},
    category: ${q(category)},
    flag: ${q(flag)},
    short: "TODO: one-line summary shown on cards.",
    title: ${q(name + " – TODO (max ~60 characters)")},
    description: "TODO: 150-160 character meta description with your main keyword.",
    keywords: [${q(name.toLowerCase())}],
    intro: "TODO: 2-3 sentences explaining what this tool does and who it helps.",
    steps: ["TODO step 1", "TODO step 2", "TODO step 3"],
    formula: "TODO: formula in plain words.",
    example: "TODO: a worked example with real numbers.",
    faqs: [{ q: "TODO question?", a: "TODO answer." }],
    related: []
  },
`;
meta = meta.replace("  // <<NEW_TOOL_META>>", entry + "  // <<NEW_TOOL_META>>");
fs.writeFileSync(metaFile, meta);

fs.writeFileSync(compFile, `"use client";
import { useState } from "react";
import { Field, Num, Result, fmt, num } from "./shared";

export function ${comp}() {
  const [value, setValue] = useState("100");
  const result = num(value) * 2; // TODO: replace with your calculation

  return (
    <div className="calc">
      <div className="calc-form">
        <Field id="v" label="Input"><Num id="v" value={value} onChange={setValue} /></Field>
      </div>
      <Result label="Result" value={fmt(result)} sub="Describe the result here" />
    </div>
  );
}
`);

let idx = fs.readFileSync(idxFile, "utf8");
idx = idx.replace("// <<NEW_TOOL_IMPORT>>", `import { ${comp} } from "./${comp}";\n// <<NEW_TOOL_IMPORT>>`);
idx = idx.replace("  // <<NEW_TOOL_MAP>>", `  ${q(slug)}: ${comp},\n  // <<NEW_TOOL_MAP>>`);
fs.writeFileSync(idxFile, idx);

console.log(`Created src/tools/${comp}.tsx and registered "${slug}".`);
console.log("Next: edit the calculation in that file and fill the TODO text in src/lib/site.ts.");
console.log("The page, card (with flag), sitemap entry and footer link are generated automatically.");
