# PartMe.AI Plugins

[English](README.md) | [简体中文](README.zh-CN.md)

![Platforms](https://img.shields.io/badge/hosts-Codex%20·%20ZCode%20·%20Kimi-blue)
![Plugins](https://img.shields.io/badge/plugins-11-green)
![License](https://img.shields.io/badge/license-Apache--2.0-orange)

PartMe.AI Plugins is the central catalog for ten independently released plugins. This repository contains marketplace metadata rather than plugin runtime code. One canonical catalog keeps IDs, display names, descriptions, versions, repositories, ordering, and logos aligned across Codex, ZCode, and Kimi Code.

## Managed plugins

| Display name | Plugin ID | Repository | Version | Logo |
|---|---|---|---|---|
| Autodesk Maya Design | `maya-design` | [partme-maya-plugin](https://github.com/partme-ai/partme-maya-plugin) | 0.1.0 | `assets/official-logo.png` |
| Blender Design | `blender-design` | [partme-blender-plugin](https://github.com/partme-ai/partme-blender-plugin) | 0.3.0 | `assets/official-logo.png` |
| Comfy Design | `comfy-design` | [partme-comfy-plugin](https://github.com/partme-ai/partme-comfy-plugin) | 0.1.0 | `assets/official-logo.png` |
| Dreamina Canvas | `dreamina-canvas` | [partme-dreamina-canvas](https://github.com/partme-ai/partme-dreamina-canvas) | 0.1.2 | `assets/official-logo.png` |
| Dreamina Design | `dreamina-design` | [partme-dreamina-design](https://github.com/partme-ai/partme-dreamina-design) | 0.4.0 | `assets/logo-approved.png` |
| Google Stitch Design | `stitch-design` | [partme-stitch-plugin](https://github.com/partme-ai/partme-stitch-plugin) | 0.7.8 | `assets/official-logo.png` |
| Image Factory | `image-factory` | [partme-image-factory](https://github.com/partme-ai/partme-image-factory) | 0.1.2 | `assets/logo-approved.png` |
| ProcessOn Design | `processon-design` | [partme-processon-plugin](https://github.com/partme-ai/partme-processon-plugin) | 0.2.0 | `assets/official-logo.png` |
| Video Factory | `video-factory` | [partme-video-factory](https://github.com/partme-ai/partme-video-factory) | 0.1.0 | `assets/logo-approved.png` |
| MiniMax Design | `minimax-design` | [partme-minimax-design](https://github.com/partme-ai/partme-minimax-design) | 0.4.0 | `assets/logo-approved.png` |
| 代码规范检查 | `codeguard` | [partme-codeguard-plugin](https://github.com/partme-ai/partme-codeguard-plugin) | 0.2.0 | `assets/official-logo.png` |
| 宝塔 Linux 面板 | `bt-linux-panel` | [partme-bt-plugin](https://github.com/partme-ai/partme-bt-plugin) | 1.0.0 | `assets/official-logo.png` |
| JianYing Edit | `jianying-edit` | [partme-jianying-plugin](https://github.com/partme-ai/partme-jianying-plugin) | 0.2.0 | `assets/official-logo.png` |

Entries are alphabetized by display name. Existing Codex plugin IDs are the canonical IDs for all three platforms.

### Planning repository

[`partme-cine-planning`](https://github.com/partme-ai/partme-cine-planning) is managed here as `design_baseline_not_released`. Its `director`, `script`, and `storyboard` modules contain specifications only. It intentionally has no plugin manifest and is excluded from all three installable marketplaces until its own release boundary is completed.

## Platform manifests

| Platform | Manifest |
|---|---|
| Codex | `.agents/plugins/marketplace.json` |
| ZCode | `marketplace.json` |
| Kimi Code | `kimi-marketplace.json` |

Each independent plugin repository remains responsible for its runtime adapters: `.codex-plugin/plugin.json`, `.zcode-plugin/plugin.json`, and `kimi.plugin.json`.

The ZCode marketplace uses only fields documented by ZCode. ZCode's documented plugin identity field is `name`; canonical display names remain in `catalog.json` and the plugin manifests for compatible clients. Runtime components are resolved from each independent plugin repository. Kimi marketplace entries expose the documented `id`, `displayName`, and `source` fields.

For OpenAI, the repositories remain compatibility-first with `.codex-plugin/plugin.json`; Dreamina Canvas additionally carries a tested portable Agent Plugins 1.0 root `plugin.json`. Portable migration is repository-owned because adding a root manifest changes component discovery and can disable legacy MCP declarations. A local marketplace or workspace publication is not a universal public-directory submission.

## Install

### Codex

```bash
codex plugin marketplace add partme-ai/plugins
codex plugin add maya-design@partme-ai
codex plugin add blender-design@partme-ai
codex plugin add comfy-design@partme-ai
codex plugin add dreamina-canvas@partme-ai
codex plugin add dreamina-design@partme-ai
codex plugin add stitch-design@partme-ai
codex plugin add image-factory@partme-ai
codex plugin add processon-design@partme-ai
codex plugin add video-factory@partme-ai
codex plugin add codeguard@partme-ai
codex plugin add bt-linux-panel@partme-ai
```

### ZCode

Open Settings → Plugins → Create → Add plugin marketplace, enter `partme-ai/plugins`, then install from the personal marketplace section.

### Kimi Code CLI

```text
/plugins marketplace https://raw.githubusercontent.com/partme-ai/plugins/main/kimi-marketplace.json
```

### China mirror (AtomGit)

If GitHub is slow or unreachable, add the AtomGit mirror of this marketplace
instead. Every install command stays the same — only the marketplace URL
changes:

```bash
codex plugin marketplace add https://atomgit.com/partme-ai/plugins.git
codex plugin add maya-design@partme-ai
codex plugin add stitch-design@partme-ai
# ... the remaining plugin lines are identical to the Codex section above
```

For ZCode, open Settings → Plugins → Create → Add plugin marketplace and enter
`atomgit.com/partme-ai/plugins`. For Kimi Code, register the mirrored
`kimi-marketplace.json` URL from the AtomGit raw endpoint, or clone this
repository and register the local file.

Notes:

- The AtomGit source and the GitHub source share the marketplace name
  `partme-ai`, so adding one replaces the other. Switch back with
  `codex plugin marketplace add partme-ai/plugins`.
- The mirror tracks the same `main` branch; plugin versions are identical on
  both platforms.

## Catalog maintenance

`catalog.json` is the only marketplace metadata source of truth. After an independent plugin release:

1. Update its entry in `catalog.json`.
2. Run `node scripts/sync-marketplaces.mjs --write` to regenerate all three platform manifests.
3. Run `node scripts/sync-marketplaces.mjs` to validate the generated manifests, sibling repositories' platform metadata, and referenced logo files.

The validator fails when a platform manifest drifts from the catalog or an independent plugin repository is incomplete.

ZCode format reference: [Plugin](https://zcode.z.ai/cn/docs/plugin), [Subagents](https://zcode.z.ai/cn/docs/subagents), [Skill](https://zcode.z.ai/cn/docs/skill), [MCP](https://zcode.z.ai/cn/docs/mcp-services), [Hooks](https://zcode.z.ai/cn/docs/hooks), and [Command](https://zcode.z.ai/cn/docs/commands).

Kimi format reference: [Plugins](https://www.kimi.com/code/docs/kimi-code-cli/customization/plugins.html), [Agents](https://www.kimi.com/code/docs/kimi-code-cli/customization/agents.html), [Skills](https://www.kimi.com/code/docs/kimi-code-cli/customization/skills.html), [MCP](https://www.kimi.com/code/docs/kimi-code-cli/customization/mcp.html), and [Hooks](https://www.kimi.com/code/docs/kimi-code-cli/customization/hooks.html).

OpenAI format reference: [Build plugins](https://learn.chatgpt.com/docs/build-plugins), [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins), [Skills](https://developers.openai.com/plugins/build/skills), [MCP server](https://developers.openai.com/plugins/build/mcp-server), [ChatGPT UI](https://developers.openai.com/plugins/build/chatgpt-ui), [Packaging](https://developers.openai.com/plugins/build/plugins), [Connect and test](https://developers.openai.com/plugins/deploy/connect-chatgpt), and [Submission](https://developers.openai.com/plugins/deploy/submission).

## License

Apache-2.0. Each plugin repository carries its own license and third-party notices.
