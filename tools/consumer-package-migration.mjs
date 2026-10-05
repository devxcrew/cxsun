import { lstatSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export function renamePublicPackageReferences(source) {
  return source.replace(
    /(["'])@devxcrew\/(core-framework|react-ui)(?=\/|["'])/g,
    (_, quote, name) => `${quote}@devxcrew/${name === "core-framework" ? "framework" : "ui"}`,
  );
}

export function migrateConsumerPackageReferences(target) {
  const changed = [];
  for (const owner of ["src", "tests", "tools"]) walk(owner);
  return changed;

  function walk(path) {
    const absolute = resolve(target, path);
    const entry = lstatSync(absolute);
    if (entry.isSymbolicLink()) throw new Error("Consumer migration cannot follow symlinks.");
    if (entry.isDirectory()) {
      for (const child of readdirSync(absolute)) walk(`${path}/${child}`);
      return;
    }
    if (!/\.(?:[cm]?js|tsx?|css)$/.test(path)) return;
    const source = readFileSync(absolute, "utf8");
    const migrated = renamePublicPackageReferences(source);
    if (migrated !== source) {
      writeFileSync(absolute, migrated);
      changed.push(path);
    }
  }
}
