// The One-Line Cat Joke That Lands — u-aldy998-the-one-line-cat-joke-that-lands-a7b18262
// Writes one single-line cat joke to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no network, no clock, no randomness. The joke was chosen by an
// internal 20-candidate scoring round plus a CrowLLM judge panel (see candidates.md
// and panel-results.json in the workspace, not in this entry).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My cat went to therapy and came back with a list of my faults, laminated.";

// Runtime guard: the gate requires UTF-8 text of 1-200 characters, a single
// unpadded line, not only whitespace. Fail loudly if that ever stops holding.
// ("Laminated" is the whole joke: therapy is already funny, a laminated list of
// faults makes the verdict permanent, filed, and impossible to argue with.)
if (
  JOKE.length < 1 ||
  JOKE.length > 200 ||
  JOKE.trim().length === 0 ||
  JOKE !== JOKE.trim() ||
  JOKE.includes("\n") ||
  JOKE.includes("\r")
) {
  throw new Error(
    `Invalid joke line: length ${JOKE.length}, must be a single unpadded line of 1-200 characters.`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
