# PartMe.AI Plugins

[English](README.md) | [简体中文](README.zh-CN.md)

![Platforms](https://img.shields.io/badge/hosts-Codex%20·%20ZCode%20·%20Kimi%20·%20Claude-blue)
![Plugins](https://img.shields.io/badge/plugins-8-green)
![License](https://img.shields.io/badge/license-Apache--2.0-orange)

**One plugin, every coding agent.** PartMe.AI Plugins is a curated set of eight agent plugins that turn coding agents (Codex, ZCode, Kimi Code, Claude Code) into operators of professional creative tools — 3D design, AI image/video generation, UI design, and diagramming. Each plugin repository ships platform adapters so a single codebase is recognized and installed natively by all supported hosts; this repository is the thin marketplace index that makes them discoverable and installable in one place.

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

| Plugin | Version | Skills | Slash commands | MCP |
|---|---|---|---|---|
| [blender](https://github.com/partme-ai/partme-blender-plugin) | 0.3.0 | 31 | 10 | ✓ (local harness) |
| [maya](https://github.com/partme-ai/partme-maya-plugin) | 0.1.0 | 5 | 5 | — |
| [stitch](https://github.com/partme-ai/partme-stitch-plugin) | 0.7.8 | 43 | 9 | ✓ (proxy) |
| [processon](https://github.com/partme-ai/partme-processon-plugin) | 0.2.0 | 7 | 7 | ✓ (proxy) |
| [dreamina-design](https://github.com/partme-ai/partme-dreamina-design) | 0.4.0 | 19 | 9 | ✓ |
| [dreamina-canvas](https://github.com/partme-ai/partme-dreamina-canvas) | 0.1.2 | 13 | 10 | — |
| [image-factory](https://github.com/partme-ai/partme-image-factory) | 0.1.2 | 4 | 4 | — |
| [video-factory](https://github.com/partme-ai/partme-video-factory) | 0.1.0 | 5 | 5 | — |

### [blender](https://github.com/partme-ai/partme-blender-plugin) — guarded Blender 3D design

Drive a real Blender installation through a guarded local harness: structured scene operations with action-bound authorization, milestone screenshots for visual review, transaction rollback, background jobs, and verified multi-format exports (glTF/FBX/OBJ) with receipts. Includes white-model previs (shot table → render → Seedance handoff) and a validated Dreamina/Seedance pipeline. **31 skills · 10 slash commands · ~176 MCP tools · 3 hooks · 419 tests.**

### [maya](https://github.com/partme-ai/partme-maya-plugin) — Autodesk Maya scene inspection & Playblast

Read-only scene inspection (hierarchy, references, shading, timeline), reversible Playblast previews, runtime preflight that works even without Maya installed, and Jimeng upload handoff. **5 skills · 5 slash commands · 227 tests.**

### [stitch](https://github.com/partme-ai/partme-stitch-plugin) — Google Stitch design & design-to-code

Generate and edit UI screens with Google Stitch, manage design systems, run code-to-design round trips, and turn Stitch artifacts into frontend components (React/Vue ecosystems, shadcn/ui, Remotion). **43 skills · 9 slash commands · MCP proxy · 269 tests.**

### [processon](https://github.com/partme-ai/partme-processon-plugin) — editable diagrams & infographics

Professional, editable ProcessOn flowcharts, swimlanes, UML, architecture/ER diagrams, mind maps, timelines, org charts, and structured infographics — with a built-in quality-review workflow and a secret-free local stdio proxy (credentials stay with the user). **7 skills · 7 slash commands · MCP proxy · 91+ tests.**

### [dreamina-design](https://github.com/partme-ai/partme-dreamina-design) — Dreamina image & video generation

Full Dreamina (即梦) image and video generation: text-to-image, image-to-image, image-to-video and multimodal video via the official CLI, with browser-CLI fallbacks for standard accounts, prompt-craft guides for every mode, shot annotation, video evaluation, a validated Seedance auto-pipeline, and resumable operations. **19 skills · 9 slash commands · MCP · 861 tests.**

### [dreamina-canvas](https://github.com/partme-ai/partme-dreamina-canvas) — Dreamina Canvas node & timeline workflows

Structured Dreamina Canvas automation: create canvases, compose multi-node graphs (text/element/image/video/audio), generate per-node media, manage visual+audio timelines, quote-and-run with approval binding, download verified assets, and resume async operations. **13 skills · 10 slash commands · 90 tests.**

### [image-factory](https://github.com/partme-ai/partme-image-factory) — batch image production

Attributed prompt discovery, batch image generation with verified receipts, pixel-metric judging, and a closed-loop prompt optimization cycle (reject → optimize → regenerate until accepted). **4 skills · 4 slash commands · 407 tests + 1000 subtests.**

### [video-factory](https://github.com/partme-ai/partme-video-factory) — automatic video editing & composition

Plan/run/judge/recover four-stage automatic editing: timeline-driven composition, synchronized review, recovery from interrupted jobs, and verified media receipts. **5 skills · 5 slash commands · 6 tests.**

## Install

### Codex

```bash
codex plugin marketplace add partme-ai/plugins
codex plugin add codex-blender@partme-ai
codex plugin add codex-maya@partme-ai
codex plugin add stitch-design@partme-ai
codex plugin add codex-processon-plugin@partme-ai
codex plugin add codex-dreamina-design@partme-ai
codex plugin add codex-dreamina-canvas@partme-ai
codex plugin add codex-image-factory@partme-ai
codex plugin add codex-video-factory@partme-ai
codex plugin add codex-bt@partme-ai
codex plugin add partme-comfy@partme-ai
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

## After install — where to find things

- **ZCode**: installed plugins appear in the plugins panel's **installed** view (and the icon strip). Skills, slash commands, and MCP tools only appear in sessions **started after** the install — open a new session. The panel's "还没有个人插件 … use /plugin builder" empty state refers to plugins *created in-session with the builder* — a different concept from marketplace plugins; ours live under the **partme-ai** market segment.
- **Kimi Code CLI**: there is no obvious "add marketplace" button — type the `/plugins marketplace <url>` slash command in a session, or add individual plugin repositories by GitHub URL from the `/plugins` panel. Installed plugins load in new sessions (`/reload` or `/new`).
- **Codex**: verify with `codex plugin list`; installed plugins are active in the next session.

## Quality & security

- Every plugin ships a real test suite (blender: 419; maya: 227; stitch: 269; processon: 91+; dreamina-design: 861; dreamina-canvas: 90; image-factory: 407+1000 subtests; video-factory: 6) run in CI.
- Hooks are advisory-only: they report environment readiness, route intents, and remind about unfinished work — they never block a turn.
- Destructive operations require action-bound authorization; exports and generated media come back with verified receipts.
- The ProcessOn, Stitch, and Dreamina integrations are secret-free: credentials are configured by the user or the host CLI login, never embedded.
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
