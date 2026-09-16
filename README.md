# PartMe.AI Plugins

[English](README.md) | [简体中文](README.zh-CN.md)

![Platforms](https://img.shields.io/badge/hosts-Codex%20·%20ZCode%20·%20Kimi%20·%20Claude-blue)
![Plugins](https://img.shields.io/badge/plugins-4-green)
![License](https://img.shields.io/badge/license-Apache--2.0-orange)

**One plugin, every coding agent.** PartMe.AI Plugins is a curated set of agent plugins that turn coding agents (Codex, ZCode, Kimi Code, Claude Code) into operators of professional creative tools — 3D design, UI design, and diagramming. Each plugin repository ships platform adapters so a single codebase is recognized and installed natively by all supported hosts; this repository is the thin marketplace index that makes them discoverable and installable in one place.

## How it works

Each plugin repository carries the full tri-platform adapter inside — the marketplace here holds no plugin code, only the index:

```
┌───────────────────────── one plugin repository ─────────────────────────┐
│  skills/            platform-neutral capability packs (SKILL.md)         │
│  commands/          slash-command set shared by ZCode & Kimi            │
│  hooks/             advisory SessionStart / UserPromptSubmit hooks      │
│  .codex-plugin/     → recognized by Codex                               │
│  .zcode-plugin/     → recognized by ZCode                               │
│  kimi.plugin.json   → recognized by Kimi Code CLI                       │
│  .agents/plugins/   single-plugin marketplace (Codex / Claude)          │
└──────────────────────────────────────────────────────────────────────────┘
                                ▲ referenced by git source
┌──────────────────────────────────────────────────────────────────────────┐
│  partme-ai/plugins (this repo) — index manifests for four hosts          │
└──────────────────────────────────────────────────────────────────────────┘
```

## Plugins

### [blender](https://github.com/partme-ai/partme-blender-plugin) — guarded Blender 3D design

Drive a real Blender installation through a guarded local harness: structured scene operations with action-bound authorization, milestone screenshots for visual review, transaction rollback, background jobs, and verified multi-format exports (glTF/FBX/OBJ) with receipts. Includes white-model previs (shot table → render → Seedance handoff) and a validated Dreamina/Seedance pipeline. **31 skills · 10 slash commands · ~176 MCP tools · 3 hooks.**

### [maya](https://github.com/partme-ai/partme-maya-plugin) — Autodesk Maya scene inspection & Playblast

Read-only scene inspection (hierarchy, references, shading, timeline), reversible Playblast previews, runtime preflight that works even without Maya installed, and Jimeng upload handoff. **5 skills · 5 slash commands · 47-file test suite.**

### [stitch](https://github.com/partme-ai/partme-stitch-plugin) — Google Stitch design & design-to-code

Generate and edit UI screens with Google Stitch, manage design systems, run code-to-design round trips, and turn Stitch artifacts into frontend components (React/Vue ecosystems, shadcn/ui, Remotion). **43 skills · 9 slash commands · MCP proxy.**

### [processon](https://github.com/partme-ai/partme-processon-plugin) — editable diagrams & infographics

Professional, editable ProcessOn flowcharts, swimlanes, UML, architecture/ER diagrams, mind maps, timelines, org charts, and structured infographics — with a built-in quality-review workflow and a secret-free local stdio proxy (credentials stay with the user). **7 skills · 7 slash commands · MCP proxy.**

## Install

### Codex

```bash
codex plugin marketplace add partme-ai/plugins
codex plugin add codex-blender@partme-ai
codex plugin add codex-maya@partme-ai
codex plugin add stitch-design@partme-ai
codex plugin add codex-processon-plugin@partme-ai
```

### ZCode

设置 → 插件 → 创建 → 添加插件市场，填本仓库地址（`partme-ai/plugins`），在「个人」分段安装。

### Kimi Code CLI

```
/plugins marketplace https://raw.githubusercontent.com/partme-ai/plugins/main/kimi-marketplace.json
```

Or add an individual plugin repository's GitHub URL from the `/plugins` panel.

### Claude Code

Add this repository as a third-party marketplace; the `.agents/plugins/marketplace.json` manifest is Claude-compatible.

## Quality & security

- Every plugin ships a real test suite (blender: 419 tests; maya: 227; stitch: 269; processon: 91+) run in CI.
- Hooks are advisory-only: they report environment readiness, route intents, and remind about unfinished work — they never block a turn.
- Destructive operations require action-bound authorization; exports and generated media come back with verified receipts.
- The ProcessOn and Stitch integrations are secret-free: credentials are configured by the user, never embedded.
- Vendored third-party skills keep their licenses and `THIRD_PARTY_NOTICES`.

## Release flow

A plugin repository releases independently; then bump its `version` in the three manifests here and push. Users refresh their marketplace to pick it up.

## Manifests

| File | Consumed by |
|---|---|
| `marketplace.json` | ZCode |
| `.agents/plugins/marketplace.json` | Codex, Claude Code |
| `kimi-marketplace.json` | Kimi Code CLI |

## License

Apache-2.0. Each plugin repository carries its own license and third-party notices.
