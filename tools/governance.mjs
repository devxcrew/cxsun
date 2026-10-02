import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function refreshGovernance(env, root = process.cwd()) {
  try {
    const { connectGovernance } = await import("../../../shared/mcp-governance/client/connect.mjs");
    const instructions = await connectGovernance(env, { timeout: 2000 });
    const directory = resolve(root, ".cache/governance");
    await mkdir(directory, { recursive: true });
    await writeFile(
      resolve(directory, "instructions.json"),
      JSON.stringify(instructions, null, 2) + "\n",
    );
    console.info(
      `Governance connected for ${instructions.appId}. Instructions: .cache/governance/instructions.json`,
    );
    return true;
  } catch {
    console.info(
      "Governance unavailable. Continue with AGENT.md and agent/SKILLS.md.",
    );
    return false;
  }
}
