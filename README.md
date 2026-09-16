# PartMe.AI Plugins

Tri-platform agent plugins for **Codex / ZCode / Kimi Code** (and Claude Code-compatible hosts). This repository is a thin marketplace index; plugin code lives in each plugin repository.

| Plugin | Platforms | What it does |
|---|---|---|
| [blender](https://github.com/partme-ai/partme-blender-plugin) | Codex · ZCode · Kimi · Claude | Design Blender scenes through a guarded harness: controlled operations, milestones, rollback, verified exports, white-model previs |
| [maya](https://github.com/partme-ai/partme-maya-plugin) | Codex · ZCode · Kimi · Claude | Inspect Autodesk Maya scenes, reversible Playblasts, Jimeng handoff |
| [stitch](https://github.com/partme-ai/partme-stitch-plugin) | Codex · ZCode · Kimi · Claude | Google Stitch design and design-to-code workflows |
| [processon](https://github.com/partme-ai/partme-processon-plugin) | Codex · ZCode · Kimi · Claude | Editable ProcessOn diagrams, mind maps, and infographics |

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

或在 `/plugins` 面板直接添加单个插件仓库的 GitHub URL。

### Claude Code

Add this repository as a third-party marketplace; the `.agents/plugins/marketplace.json` manifest is Claude-compatible.

## Release flow

A plugin repository releases independently; then bump its `version` in the three manifests here and push. Users refresh their marketplace to pick it up.

## Manifests

| File | Consumed by |
|---|---|
| `marketplace.json` | ZCode |
| `.agents/plugins/marketplace.json` | Codex, Claude Code |
| `kimi-marketplace.json` | Kimi Code CLI |
