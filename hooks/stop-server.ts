/**
 * SessionEnd hook — stops OpenConclave server if running.
 * Kills the process listening on the server port.
 */
import { $ } from "bun";

const port = process.env.OPENCONCLAVE_PORT ?? "4000";

// Check if server is running
try {
  await fetch(`http://localhost:${port}/api/health`);
} catch {
  process.exit(0); // Not running
}

// Kill by port — cross-platform
const isWindows = process.platform === "win32";
try {
  if (isWindows) {
    // Find PID listening on the port and kill it
    const result = await $`netstat -ano | findstr :${port} | findstr LISTENING`.text();
    const pids = new Set(
      result.split("\n").map((l) => l.trim().split(/\s+/).pop()).filter(Boolean)
    );
    for (const pid of pids) {
      await $`taskkill /F /PID ${pid}`.quiet();
    }
  } else {
    await $`lsof -ti :${port} | xargs kill`.quiet();
  }
  console.log("OpenConclave server stopped");
} catch {
  // Best effort
}
