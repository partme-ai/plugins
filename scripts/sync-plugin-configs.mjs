#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspace = path.dirname(root);
const catalog = JSON.parse(fs.readFileSync(path.join(root, "catalog.json"), "utf8"));
const format = (value) => `${JSON.stringify(value, null, 2)}\n`;

for (const plugin of catalog.plugins) {
  const repo = path.join(workspace, plugin.localDirectory);
  const files = {
    marketplace: path.join(repo, ".agents/plugins/marketplace.json"),
    codex: path.join(repo, ".codex-plugin/plugin.json"),
    zcode: path.join(repo, ".zcode-plugin/plugin.json"),
    kimi: path.join(repo, "kimi.plugin.json")
  };
  for (const [kind, file] of Object.entries(files)) {
    if (!fs.existsSync(file)) throw new Error(`${plugin.id}: missing ${kind} config: ${file}`);
  }

  const marketplace = JSON.parse(fs.readFileSync(files.marketplace, "utf8"));
  const entry = marketplace.plugins?.[0];
  if (!entry || marketplace.plugins.length !== 1) {
    throw new Error(`${plugin.id}: repository marketplace must contain exactly one plugin`);
  }
  const logoUrl = `https://raw.githubusercontent.com/${plugin.repository}/main/${plugin.logo}`;
  marketplace.interface ??= {};
  marketplace.interface.displayName = plugin.displayName;
  entry.name = plugin.id;
  entry.source = {
    source: "url",
    url: `https://github.com/${plugin.repository}.git`,
    ref: "main"
  };
  entry.policy = { installation: "AVAILABLE", authentication: "ON_USE" };
  entry.category = plugin.category;
  entry.version = plugin.version;
  entry.description = plugin.description;
  entry.icon = logoUrl;
  entry.interface ??= {};
  entry.interface.displayName = plugin.displayName;
  entry.interface.shortDescription = plugin.shortDescription;
  entry.interface.logo = logoUrl;

  const codex = JSON.parse(fs.readFileSync(files.codex, "utf8"));
  codex.name = plugin.id;
  codex.description = plugin.description;
  codex.interface ??= {};
  codex.interface.displayName = plugin.displayName;
  codex.interface.shortDescription = plugin.shortDescription;
  codex.interface.logo = `./${plugin.logo}`;
  codex.interface.logoDark = `./${plugin.logo}`;

  const zcode = JSON.parse(fs.readFileSync(files.zcode, "utf8"));
  zcode.name = plugin.id;
  zcode.displayName = plugin.displayName;
  if (zcode.displayName_i18n) zcode.displayName_i18n.en = plugin.displayName;
  zcode.version = plugin.version;
  zcode.description = plugin.description;

  const kimi = JSON.parse(fs.readFileSync(files.kimi, "utf8"));
  kimi.name = plugin.id;
  kimi.version = plugin.version;
  kimi.description = plugin.description;
  kimi.interface ??= {};
  kimi.interface.displayName = plugin.displayName;
  kimi.interface.shortDescription = plugin.shortDescription;

  for (const [kind, file] of Object.entries(files)) {
    const value = { marketplace, codex, zcode, kimi }[kind];
    fs.writeFileSync(file, format(value));
  }
}

console.log(`Synchronized and formatted ${catalog.plugins.length * 4} plugin configuration files.`);
