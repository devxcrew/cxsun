import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

export function exportTemplateArtifact({
  root = resolve(import.meta.dirname, ".."),
  destination,
  releaseManifest,
  dryRun = false,
}) {
  root = realpathSync(root);
  destination = resolve(destination);
  if (existsSync(destination) || destination === root || destination.startsWith(root + sep))
    throw new Error("Use a new artifact directory outside the app.");
  const parent = dirname(destination);
  if (!existsSync(parent) || realpathSync(parent) !== parent)
    throw new Error("Artifact parent must exist without symlinks.");
  const releasePath = resolve(releaseManifest);
  const release = JSON.parse(readFileSync(releasePath, "utf8"));
  if (
    release.version !== 1 ||
    release.status !== "approved" ||
    typeof release.releaseId !== "string" ||
    !release.releaseId ||
    !release.packages ||
    typeof release.lockfile !== "string"
  )
    throw new Error(
      "Provide an approved version 1 release manifest with releaseId, packages, and lockfile.",
    );
  const manifest = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
  for (const group of ["dependencies", "devDependencies"]) {
    for (const [name, current] of Object.entries(manifest[group] ?? {})) {
      const version = release.packages[name];
      if (typeof version !== "string" || !/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(version))
        throw new Error(`Missing exact release package version: ${name}`);
      manifest[group][name] = current.startsWith("npm:")
        ? current.replace(/@[^@]+$/, `@${version}`)
        : version;
    }
  }
  const lock = JSON.parse(readFileSync(resolve(dirname(releasePath), release.lockfile), "utf8"));
  validateLock(lock, manifest);
  manifest.name = "{{APP_ID}}";
  manifest.version = "0.1.0";
  delete manifest.repository;
  for (const script of [
    "packages:local",
    "packages:npm",
    "packages:platform",
    "test:consumers",
    "test:consumers:registry",
  ])
    delete manifest.scripts[script];
  lock.name = manifest.name;
  lock.version = manifest.version;
  Object.assign(lock.packages[""], {
    name: manifest.name,
    version: manifest.version,
    dependencies: manifest.dependencies,
    devDependencies: manifest.devDependencies,
  });
  const files = new Map();
  for (const directory of ["src", "public", "tests"]) collect(root, directory, files);
  for (const file of [
    "index.html",
    "tsconfig.json",
    "tsconfig.server.json",
    "vite.config.ts",
    "eslint.config.js",
    ".gitignore",
    ".github/workflows/check.yml",
  ]) {
    if (existsSync(resolve(root, file))) files.set(file, safeRead(root, file));
  }
  for (const file of [
    "dev.mjs",
    "governance.mjs",
    "check-packages.mjs",
    "identity-smoke.mjs",
    "production-smoke.mjs",
    "live-identity-check.mjs",
    "email-check.mjs",
  ]) {
    if (existsSync(resolve(root, "tools", file)))
      files.set(`tools/${file}`, safeRead(root, `tools/${file}`));
  }
  files.set("agent/connect.mjs", safeRead(root, "agent/connect.mjs"));
  const config = JSON.parse(safeRead(root, ".devxcrew-tools.json"));
  config.allowLocalPackages = false;
  config.maintenance = { ...config.maintenance, changelogPath: "agent/CHANGELOG.md" };
  files.set(".devxcrew-tools.json", JSON.stringify(config, null, 2) + "\n");
  files.set(".env.example", safeRead(root, ".env.example"));
  files.set(".npmrc", "install-strategy=hoisted\nlegacy-peer-deps=true\n");
  files.set("package.json", JSON.stringify(manifest, null, 2) + "\n");
  files.set("package-lock.json", JSON.stringify(lock, null, 2) + "\n");
  files.set(
    "agent/CHANGELOG.md",
    `# Changelog\n\n## Version State\n\nCurrent version: 0.1.0\n\nRelease tag: v-0.1.0\n\nChangelog label: v 0.1.0\n\n## v-0.1.0\n\n### [v 0.1.0] ${releaseTimestamp()} - Foundation application\n\nInitial application from the approved foundation release.\n`,
  );
  for (const [file, title, content] of [
    [
      "TASK.md",
      "Current task",
      "Configure this app and verify its own installation, identity, and file-backed database.",
    ],
    [
      "PLAN.md",
      "Application plan",
      "Verify the generated foundation before implementing requested business modules.",
    ],
    [
      "AUDIT.md",
      "Verification evidence",
      "Generation does not verify this application. Record its actual checks and operational evidence here.",
    ],
    [
      "SKILLS.md",
      "Repository capabilities",
      "Compose public Framework, Platform, UI, Email, and Tools packages. Shared rules come from live MCP.",
    ],
  ])
    files.set(`agent/${file}`, `# ${title}\n\n${content}\n`);
  files.set(
    "README.md",
    "# {{APP_NAME}}\n\nInstall the supported Node/npm versions, then run npm ci and npm run tools:env.\nConfigure the ignored environment and cloud MCP credentials. Run npm run setup, then npm run verify.\nKeep business modules inside their owners and use public provider contracts.\n",
  );
  files.set(
    "AGENTS.md",
    "# Application instructions\n\nRetrieve authenticated guidance with npm run mcp:connect before repository work. Stop on connection failure.\nKeep matching frontend and backend capabilities module-owned. Inject public provider contracts.\nValidate untrusted inputs on the server. Preserve data, history, and secrets.\nCommit, publish, and deploy only within user authorization.\n",
  );
  for (const [file, content] of files) {
    const value = tokenize(content, file);
    if (
      /(?:file:vendor|\.\.\/\.\.\/shared|shared\/platform\/src|@(?:devxcrew|codexsun)\/[^\s"']+\/(?:src|dist)\/)/.test(
        value,
      )
    )
      throw new Error(`Private dependency in artifact: ${file}`);
    if (
      file === ".env.example" &&
      /^[ \t]*[A-Z_]*(?:SECRET|TOKEN|PASSWORD|API_KEY)[ \t]*=[ \t]*[^ \t\r\n#]+/m.test(value)
    )
      throw new Error("Environment example contains a secret.");
    files.set(file, value);
  }
  const inventory = [...files.keys()].sort();
  if (dryRun) return { releaseId: release.releaseId, files: inventory, destination, dryRun: true };
  const staging = resolve(parent, `.template-artifact-${randomUUID()}`);
  mkdirSync(staging);
  try {
    for (const [file, content] of files) {
      const target = resolve(staging, file);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, content, { flag: "wx" });
    }
    writeFileSync(
      resolve(staging, ".foundation-template.json"),
      JSON.stringify(
        { version: 1, releaseId: release.releaseId, freshAgentRecords: true, files: inventory },
        null,
        2,
      ) + "\n",
    );
    if (existsSync(destination)) throw new Error("Artifact destination appeared during export.");
    renameSync(staging, destination);
  } finally {
    if (existsSync(staging)) rmSync(staging, { recursive: true });
  }
  return { releaseId: release.releaseId, files: inventory, destination, dryRun: false };
}

function tokenize(content, file) {
  if (content.includes("\u0000")) throw new Error(`Binary artifact source: ${file}`);
  return content
    .replaceAll("http://127.0.0.1:5173", "{{APP_URL}}")
    .replaceAll("http://localhost:5173", "{{APP_URL}}")
    .replaceAll("5173", "{{APP_PORT}}")
    .replaceAll("Cxsun", "{{APP_NAME}}")
    .replaceAll("cxsun", "{{APP_ID}}");
}

function releaseTimestamp() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(new Date())
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} ${parts.dayPeriod.toLowerCase()}`;
}

function collect(root, directory, files) {
  const path = resolve(root, directory);
  if (!existsSync(path)) return;
  if (lstatSync(path).isSymbolicLink()) throw new Error(`Artifact symlink rejected: ${directory}`);
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const file = `${directory}/${entry.name}`;
    if (/^tests\/template.*\.test\.mjs$/.test(file)) continue;
    if (entry.isSymbolicLink()) throw new Error(`Artifact symlink rejected: ${file}`);
    if (entry.isDirectory()) collect(root, file, files);
    else if (/\.(?:[cm]?[jt]sx?|json|css|html|svg|md)$/.test(file))
      files.set(file, safeRead(root, file));
    else throw new Error(`Unapproved artifact file type: ${file}`);
  }
}

function safeRead(root, file) {
  if (isAbsolute(file) || file.split("/").includes(".."))
    throw new Error("Artifact path leaves source.");
  const path = resolve(root, file);
  let current = root;
  for (const part of file.split("/")) {
    current = resolve(current, part);
    if (lstatSync(current).isSymbolicLink()) throw new Error("Artifact symlink rejected.");
  }
  if (lstatSync(path).isSymbolicLink() || relative(root, realpathSync(path)).startsWith(".."))
    throw new Error("Artifact symlink rejected.");
  return readFileSync(path, "utf8");
}

function validateLock(lock, manifest) {
  if (lock.lockfileVersion !== 3 || !lock.packages?.[""])
    throw new Error("Provide a registry release lockfile version 3.");
  for (const group of ["dependencies", "devDependencies"]) {
    for (const [name, version] of Object.entries(manifest[group] ?? {})) {
      const installed = lock.packages[`node_modules/${name}`];
      const actualVersion = version.startsWith("npm:")
        ? version.slice(version.lastIndexOf("@") + 1)
        : version;
      if (lock.packages[""][group]?.[name] !== version || installed?.version !== actualVersion)
        throw new Error(`Release lock mismatch: ${name}`);
    }
  }
  for (const [path, item] of Object.entries(lock.packages)) {
    if (!path) continue;
    if (
      item.link ||
      !/^https:\/\/registry\.npmjs\.org\//.test(item.resolved ?? "") ||
      !/^sha512-/.test(item.integrity ?? "")
    )
      throw new Error(`Non-registry release artifact: ${path}`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const flag = args[index];
    if (flag === "--dry-run") options.dryRun = true;
    else if (["--destination", "--release-manifest"].includes(flag) && args[index + 1])
      options[flag === "--destination" ? "destination" : "releaseManifest"] = args[++index];
    else throw new Error(`Unknown or missing option: ${flag}`);
  }
  console.info(JSON.stringify(exportTemplateArtifact(options), null, 2));
}
