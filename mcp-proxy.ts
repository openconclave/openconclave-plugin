/**
 * MCP proxy — finds the OpenConclave server and spawns it.
 * Checks multiple candidate paths so it works in both dev and installed setups.
 */
import { resolve } from "path";
import { existsSync } from "fs";
import { spawn } from "bun";

const home = process.env.HOME ?? process.env.USERPROFILE ?? "";
const candidates = [
  process.env.OPENCONCLAVE_DIR,
  resolve(home, ".openconclave-app"),
].filter(Boolean) as string[];

const MCP_PATH = "packages/server/src/mcp/server.ts";

let ocDir: string | null = null;
for (const dir of candidates) {
  if (existsSync(resolve(dir, MCP_PATH))) {
    ocDir = dir;
    break;
  }
}

if (!ocDir) {
  console.error(
    "OpenConclave not found. Set OPENCONCLAVE_DIR or install to ~/.openconclave-app"
  );
  process.exit(1);
}

const proc = spawn({
  cmd: ["bun", "run", resolve(ocDir, MCP_PATH)],
  cwd: ocDir,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const code = await proc.exited;
process.exit(code);
