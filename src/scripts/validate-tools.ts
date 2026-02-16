import { tools } from "@/lib/tools";

const requiredArrayFields: Array<keyof (typeof tools)[number]> = [
  "howWeCalculate",
  "explanation",
  "examples",
  "edgeCases",
  "miniGuide",
  "faqs",
  "references",
  "related",
];

const slugs = new Set<string>();
let hasError = false;

for (const tool of tools) {
  if (slugs.has(tool.slug)) {
    console.error(`Duplicate slug: ${tool.slug}`);
    hasError = true;
  }
  slugs.add(tool.slug);

  if (!tool.slug || !tool.name || !tool.summary || !tool.category || !tool.mode) {
    console.error(`Missing required scalar field in ${tool.slug || "unknown"}`);
    hasError = true;
  }

  if (!tool.inputs || tool.inputs.length === 0) {
    console.error(`Tool has no inputs: ${tool.slug}`);
    hasError = true;
  }

  for (const field of requiredArrayFields) {
    const value = tool[field] as unknown;
    if (!Array.isArray(value) || value.length === 0) {
      console.error(`Missing or empty ${String(field)} in ${tool.slug}`);
      hasError = true;
    }
  }

  if (tool.related.length < 6 || tool.related.length > 12) {
    console.error(`Related tools count must be 6-12 in ${tool.slug}, got ${tool.related.length}`);
    hasError = true;
  }

  if (tool.faqs.length < 3 || tool.faqs.length > 6) {
    console.error(`FAQ count must be 3-6 in ${tool.slug}, got ${tool.faqs.length}`);
    hasError = true;
  }
}

if (tools.length < 40 || tools.length > 60) {
  console.error(`Tool count must be 40-60. Got ${tools.length}.`);
  hasError = true;
}

if (hasError) {
  process.exit(1);
}

console.log(`Tool validation passed: ${tools.length} tools checked.`);
