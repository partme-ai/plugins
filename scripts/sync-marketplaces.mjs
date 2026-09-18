#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspace = path.dirname(root);
const catalog = JSON.parse(fs.readFileSync(path.join(root, "catalog.json"), "utf8"));
const mode = process.argv.includes("--write") ? "write" : "check";

const rawLogo = (plugin) =>
  `https://raw.githubusercontent.com/${plugin.repository}/main/${plugin.logo}`;

const codex = {
  name: catalog.name,
  description: catalog.description,
  owner: { name: "PartMe.AI", url: "https://github.com/partme-ai" },
  plugins: catalog.plugins.map((plugin) => ({
    name: plugin.id,
    source: {
      source: "url",
      url: `https://github.com/${plugin.repository}.git`,
      ref: "main"
    },
    policy: { installation: "AVAILABLE", authentication: "ON_USE" },
    category: plugin.category,
    version: plugin.version,
    description: plugin.description,
    icon: rawLogo(plugin),
    interface: {
      displayName: plugin.displayName,
      shortDescription: plugin.shortDescription,
      logo: rawLogo(plugin)
    }
  })),
  interface: { displayName: catalog.displayName }
};

const zcode = {
  name: catalog.name,
  displayName: catalog.displayName,
  description: catalog.description,
  plugins: catalog.plugins.map((plugin) => ({
    name: plugin.id,
    source: { source: "github", repo: plugin.repository, ref: "main" },
    description: plugin.description,
    version: plugin.version,
    category: plugin.category,
    tags: plugin.tags,
    icon: rawLogo(plugin),
    strict: true
  }))
};

const kimi = {
  version: "2",
  displayName: catalog.displayName,
  plugins: catalog.plugins.map((plugin) => ({
    id: plugin.id,
    displayName: plugin.displayName,
    icon: rawLogo(plugin),
    source: `https://github.com/${plugin.repository}`
  }))
};

const outputs = new Map([
  [path.join(root, ".agents/plugins/marketplace.json"), codex],
  [path.join(root, "marketplace.json"), zcode],
  [path.join(root, "kimi-marketplace.json"), kimi]
]);

const errors = [];
const format = (value) => `${JSON.stringify(value, null, 2)}\n`;

const validateSkills = (plugin, repo) => {
  const skillsRoot = path.join(repo, "skills");
  if (!fs.existsSync(skillsRoot)) {
    errors.push(`${plugin.id}: missing skills directory`);
    return;
  }
  const skillDirectories = fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  if (skillDirectories.length === 0) errors.push(`${plugin.id}: skills directory is empty`);
  for (const skillName of skillDirectories) {
    const skillPath = path.join(skillsRoot, skillName, "SKILL.md");
    if (!fs.existsSync(skillPath)) {
      errors.push(`${plugin.id}: missing skills/${skillName}/SKILL.md`);
      continue;
    }
    const text = fs.readFileSync(skillPath, "utf8");
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
    if (!frontmatter) {
      errors.push(`${plugin.id}: invalid frontmatter in skills/${skillName}/SKILL.md`);
      continue;
    }
    const declaredName = frontmatter[1].match(/^name:\s*["']?([^"'\n]+)["']?\s*$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (declaredName !== skillName) {
      errors.push(`${plugin.id}: skill name ${declaredName ?? "<missing>"} differs from directory ${skillName}`);
    }
    if (!description) errors.push(`${plugin.id}: skill ${skillName} has no description`);
  }
};

for (const planningRepo of catalog.planningRepositories ?? []) {
  const repo = path.join(workspace, planningRepo.localDirectory);
  if (!fs.existsSync(repo)) {
    errors.push(`${planningRepo.name}: missing planning repository ${repo}`);
    continue;
  }
  for (const moduleName of planningRepo.modules ?? []) {
    const specification = path.join(repo, moduleName, "docs/superpowers/specs/plugin-design.md");
    if (!fs.existsSync(specification)) {
      errors.push(`${planningRepo.name}: missing ${moduleName} plugin design specification`);
    }
  }
  for (const manifest of ["plugin.json", ".codex-plugin/plugin.json", ".zcode-plugin/plugin.json", "kimi.plugin.json"]) {
    if (fs.existsSync(path.join(repo, manifest))) {
      errors.push(`${planningRepo.name}: planning-only repository must not publish ${manifest}`);
    }
  }
}

for (const [file, value] of outputs) {
  const expected = format(value);
  if (mode === "write") {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, expected);
  } else if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== expected) {
    errors.push(`${path.relative(root, file)} is not synchronized; run: node scripts/sync-marketplaces.mjs --write`);
  }
}

for (let index = 0; index < catalog.plugins.length; index += 1) {
  const plugin = catalog.plugins[index];
  const previous = catalog.plugins[index - 1];
  if (previous && previous.displayName.localeCompare(plugin.displayName, "en", { sensitivity: "base" }) > 0) {
    errors.push(`catalog order is not alphabetical: ${previous.displayName} before ${plugin.displayName}`);
  }

  const repo = path.join(workspace, plugin.localDirectory);
  const logo = path.join(repo, plugin.logo);
  if (!fs.existsSync(logo)) errors.push(`${plugin.id}: missing ${logo}`);
  validateSkills(plugin, repo);

  const repositoryMarketplacePath = path.join(repo, ".agents/plugins/marketplace.json");
  if (!fs.existsSync(repositoryMarketplacePath)) {
    errors.push(`${plugin.id}: missing ${repositoryMarketplacePath}`);
  } else {
    const repositoryMarketplace = JSON.parse(fs.readFileSync(repositoryMarketplacePath, "utf8"));
    const entry = repositoryMarketplace.plugins?.[0];
    if (!entry || repositoryMarketplace.plugins.length !== 1) {
      errors.push(`${plugin.id}: repository marketplace must contain exactly one plugin`);
    } else {
      if (entry.name !== plugin.id) errors.push(`${plugin.id}: repository marketplace name is ${entry.name}`);
      if (entry.description !== plugin.description) errors.push(`${plugin.id}: repository marketplace description differs`);
      if (entry.version !== plugin.version) errors.push(`${plugin.id}: repository marketplace version differs`);
      if (entry.interface?.displayName !== plugin.displayName) errors.push(`${plugin.id}: repository marketplace displayName differs`);
      if (entry.interface?.shortDescription !== plugin.shortDescription) errors.push(`${plugin.id}: repository marketplace shortDescription differs`);
      if (repositoryMarketplace.interface?.displayName !== plugin.displayName) errors.push(`${plugin.id}: marketplace displayName differs`);
    }
  }

  const codexManifestPath = path.join(repo, ".codex-plugin/plugin.json");
  const portableManifestPath = path.join(repo, "plugin.json");
  const codexManifest = fs.existsSync(codexManifestPath)
    ? JSON.parse(fs.readFileSync(codexManifestPath, "utf8"))
    : null;
  if (fs.existsSync(portableManifestPath)) {
    const portable = JSON.parse(fs.readFileSync(portableManifestPath, "utf8"));
    if (portable.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json") {
      errors.push(`${plugin.id}: plugin.json has an unsupported Agent Plugins schema`);
    }
    if (portable.name !== plugin.id) errors.push(`${plugin.id}: plugin.json name is ${portable.name}`);
    if (portable.version !== plugin.version) errors.push(`${plugin.id}: plugin.json version is ${portable.version}`);
    if (portable.description !== plugin.description) errors.push(`${plugin.id}: plugin.json description differs`);
    const portableDisplayName = portable.extensions?.["com.openai"]?.interface?.displayName;
    const fallbackDisplayName = codexManifest?.interface?.displayName;
    if ((portableDisplayName ?? fallbackDisplayName) !== plugin.displayName) {
      errors.push(`${plugin.id}: OpenAI displayName differs from catalog`);
    }
  }

  for (const relative of [".codex-plugin/plugin.json", ".zcode-plugin/plugin.json", "kimi.plugin.json"]) {
    const manifestPath = path.join(repo, relative);
    if (!fs.existsSync(manifestPath)) {
      errors.push(`${plugin.id}: missing ${manifestPath}`);
      continue;
    }
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (manifest.name !== plugin.id) errors.push(`${plugin.id}: ${relative} name is ${manifest.name}`);
    if (manifest.description !== plugin.description) errors.push(`${plugin.id}: ${relative} description differs`);
    if (relative === ".zcode-plugin/plugin.json" && manifest.displayName !== plugin.displayName) {
      errors.push(`${plugin.id}: ${relative} displayName is ${manifest.displayName}`);
    }
    if (relative === "kimi.plugin.json") {
      if (manifest.interface?.displayName !== plugin.displayName) {
        errors.push(`${plugin.id}: ${relative} interface.displayName is ${manifest.interface?.displayName}`);
      }
      for (const field of ["skills", "commands", "agents"]) {
        const values = Array.isArray(manifest[field]) ? manifest[field] : manifest[field] ? [manifest[field]] : [];
        for (const value of values) {
          if (typeof value !== "string" || !value.startsWith("./")) {
            errors.push(`${plugin.id}: ${relative} ${field} path must start with ./`);
          } else if (!fs.existsSync(path.join(repo, value))) {
            errors.push(`${plugin.id}: ${relative} ${field} path does not exist: ${value}`);
          }
        }
      }
      if (manifest.hooks && !Array.isArray(manifest.hooks)) {
        errors.push(`${plugin.id}: ${relative} hooks must be an array`);
      }
      for (const [serverName, server] of Object.entries(manifest.mcpServers ?? {})) {
        if (server.command?.startsWith("/")) {
          errors.push(`${plugin.id}: ${relative} MCP ${serverName} command must be on PATH or start with ./`);
        }
        if (server.cwd && !server.cwd.startsWith("./")) {
          errors.push(`${plugin.id}: ${relative} MCP ${serverName} cwd must start with ./`);
        }
      }
    }
    if (manifest.version !== plugin.version && !manifest.version.startsWith(`${plugin.version}+`)) {
      errors.push(`${plugin.id}: ${relative} version ${manifest.version} does not match ${plugin.version}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`${mode === "write" ? "Synchronized" : "Validated"} ${catalog.plugins.length} installable plugins and ${(catalog.planningRepositories ?? []).length} planning repository for Codex, ZCode, and Kimi.`);
