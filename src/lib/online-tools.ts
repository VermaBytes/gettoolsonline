export type OnlineTool = {
  slug: string; name: string; category: string; icon: string; short: string;
  description: string; keywords: string[]; status: "ready" | "coming"; featured?: boolean;
};

export const onlineTools: OnlineTool[] = [
  { slug: "image-compressor", name: "Image Compressor", category: "Image Tools", icon: "▧", short: "Compress JPG, PNG and WebP images while balancing quality and file size.", description: "Reduce image file size in your browser with adjustable quality. Your images stay on your device.", keywords: ["image compressor", "compress image online", "reduce image size"], status: "ready", featured: true },
  { slug: "image-resizer", name: "Image Resizer", category: "Image Tools", icon: "↗", short: "Resize images to exact pixel dimensions for websites and social media.", description: "Resize an image to custom width and height, then download the result.", keywords: ["image resizer", "resize image online"], status: "ready", featured: true },
  { slug: "jpg-to-png", name: "JPG to PNG Converter", category: "Image Tools", icon: "▣", short: "Convert JPG and JPEG images into PNG format.", description: "Convert JPG or JPEG images to PNG directly in your browser.", keywords: ["jpg to png", "jpeg to png"], status: "ready" },
  { slug: "webp-converter", name: "WebP Converter", category: "Image Tools", icon: "◈", short: "Convert images to lightweight WebP format.", description: "Convert common image files to WebP for faster websites and smaller uploads.", keywords: ["webp converter", "convert to webp"], status: "ready" },
  { slug: "pdf-compressor", name: "PDF Compressor", category: "PDF Tools", icon: "▤", short: "Reduce PDF file size for easier sharing and uploads.", description: "A simple PDF compression utility is being prepared.", keywords: ["compress pdf", "pdf compressor online"], status: "coming", featured: true },
  { slug: "pdf-merger", name: "PDF Merger", category: "PDF Tools", icon: "▥", short: "Combine multiple PDF documents into one file.", description: "Combine multiple PDF files into one organised document.", keywords: ["merge pdf", "combine pdf files"], status: "coming" },
  { slug: "pdf-splitter", name: "PDF Splitter", category: "PDF Tools", icon: "✂", short: "Separate selected pages from a PDF document.", description: "Extract selected pages from a PDF into a separate document.", keywords: ["split pdf", "extract pdf pages"], status: "coming" },
  { slug: "jpg-to-pdf", name: "JPG to PDF Converter", category: "PDF Tools", icon: "▧", short: "Turn image files into a shareable PDF document.", description: "Convert one or more images into a PDF document.", keywords: ["jpg to pdf", "image to pdf"], status: "coming", featured: true },
  { slug: "word-counter", name: "Word Counter", category: "Text Tools", icon: "¶", short: "Count words, characters, sentences and reading time instantly.", description: "Analyse text with word, character, sentence, paragraph and reading-time counts.", keywords: ["word counter", "character counter"], status: "ready", featured: true },
  { slug: "case-converter", name: "Case Converter", category: "Text Tools", icon: "Aa", short: "Switch text between uppercase, lowercase, title and sentence case.", description: "Change text case in seconds and copy the converted result.", keywords: ["case converter", "uppercase converter"], status: "ready" },
  { slug: "remove-duplicate-lines", name: "Remove Duplicate Lines", category: "Text Tools", icon: "☷", short: "Clean lists by removing repeated lines while preserving order.", description: "Remove duplicate lines from pasted text while keeping the first occurrence.", keywords: ["remove duplicate lines", "duplicate line remover"], status: "ready" },
  { slug: "percentage-calculator", name: "Percentage Calculator", category: "Calculator Tools", icon: "%", short: "Calculate percentages, percentage changes and values quickly.", description: "Calculate a percentage of any number with an instant result.", keywords: ["percentage calculator", "percent calculator"], status: "ready", featured: true },
  { slug: "age-calculator", name: "Age Calculator", category: "Calculator Tools", icon: "◷", short: "Calculate age in years, months and days from a date of birth.", description: "Calculate your exact age from your date of birth to a selected date.", keywords: ["age calculator", "calculate age"], status: "ready" },
  { slug: "discount-calculator", name: "Discount Calculator", category: "Calculator Tools", icon: "−%", short: "Find sale prices and savings after a discount.", description: "Calculate the final price and amount saved after a percentage discount.", keywords: ["discount calculator", "sale price calculator"], status: "ready" },
  { slug: "meta-tag-generator", name: "Meta Tag Generator", category: "SEO Tools", icon: "⌘", short: "Create title, description and social meta tags for a web page.", description: "Generate copy-ready HTML meta tags for your page title, description and social sharing.", keywords: ["meta tag generator", "seo meta tags"], status: "ready" },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", category: "SEO Tools", icon: "⌁", short: "Create a starter robots.txt file for your website.", description: "Generate a basic robots.txt file with crawl rules and an optional sitemap URL.", keywords: ["robots txt generator", "robots.txt creator"], status: "ready" },
];

export const onlineCategories = [
  { name: "Image Tools", slug: "image-tools", description: "Compress, resize and convert images for web and everyday tasks.", icon: "▧" },
  { name: "PDF Tools", slug: "pdf-tools", description: "Organise and convert PDF documents with simple utilities.", icon: "▤" },
  { name: "Text Tools", slug: "text-tools", description: "Count, format and clean text in seconds.", icon: "¶" },
  { name: "Calculator Tools", slug: "calculator-tools", description: "Fast calculators for everyday numbers and decisions.", icon: "＋" },
  { name: "SEO Tools", slug: "seo-tools", description: "Simple utilities for common technical SEO tasks.", icon: "⌘" },
  { name: "Salary & Tax Tools", slug: "salary-tax-tools", description: "Explore take-home pay, tax and workplace benefit calculators.", icon: "＄" },
];

export function getOnlineTool(slug: string) { return onlineTools.find((tool) => tool.slug === slug); }
