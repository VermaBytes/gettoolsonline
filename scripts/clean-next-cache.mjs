import { existsSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const nextCache = resolve(projectRoot, ".next");

if (nextCache !== join(projectRoot, ".next") || !existsSync(join(projectRoot, "package.json"))) {
  throw new Error("Refusing to clean an unexpected Next.js build directory.");
}

rmSync(nextCache, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
