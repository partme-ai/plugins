# PartMe.AI 插件市场

[English](README.md) | [简体中文](README.zh-CN.md)

![Platforms](https://img.shields.io/badge/hosts-Codex%20·%20ZCode%20·%20Kimi%20·%20Claude-blue)
![Plugins](https://img.shields.io/badge/plugins-4-green)
![License](https://img.shields.io/badge/license-Apache--2.0-orange)

**一套插件，全平台宿主通用。** PartMe.AI 插件集把编程智能体（Codex、ZCode、Kimi Code、Claude Code）变成专业创作工具的操作者——三维设计、UI 设计、图表绘制。每个插件仓库内置全平台适配层，同一份代码被所有受支持宿主原生识别与安装；本仓库是薄索引市场，让它们可被统一发现、一次安装。

## 工作原理

每个插件仓库自带完整的三平台适配层——本市场不含任何插件代码，只有索引：

```
┌───────────────────────── 一个插件仓库 ─────────────────────────┐
│  skills/            平台无关的能力包（SKILL.md）                  │
│  commands/          ZCode 与 Kimi 共用的斜杠命令集                 │
│  hooks/             SessionStart / UserPromptSubmit 提示性钩子     │
│  .codex-plugin/     → 被 Codex 识别                              │
│  .zcode-plugin/     → 被 ZCode 识别                              │
│  kimi.plugin.json   → 被 Kimi Code CLI 识别                      │
│  .agents/plugins/   单插件市场（Codex / Claude）                  │
└────────────────────────────────────────────────────────────────┘
                                ▲ 以 git source 被引用
┌────────────────────────────────────────────────────────────────┐
│  partme-ai/plugins（本仓）—— 四宿主的索引清单                    │
└────────────────────────────────────────────────────────────────┘
```

## 插件

### [blender](https://github.com/partme-ai/partme-blender-plugin) — 受保护的 Blender 三维设计

通过受控本地 Harness 驱动真实 Blender 安装：带动作绑定授权的结构化场景操作、里程碑截图做视觉评审、事务回滚、后台作业、附验证回执的多格式导出（glTF/FBX/OBJ）。含白模预演（镜头表→渲染→Seedance 交接）与已验证的即梦/Dreamina 流水线。**31 个技能 · 10 条斜杠命令 · 约 176 个 MCP 工具 · 3 个钩子。**

### [maya](https://github.com/partme-ai/partme-maya-plugin) — Autodesk Maya 场景检查与 Playblast

只读场景检查（层级、引用、着色、时间轴）、可回滚 Playblast 预览、未装 Maya 也能跑的运行时预检、即梦上传交接。**5 个技能 · 5 条斜杠命令 · 47 个测试文件。**

### [stitch](https://github.com/partme-ai/partme-stitch-plugin) — Google Stitch 设计与设计转代码

用 Google Stitch 生成与编辑 UI 界面、管理设计系统、代码↔设计双向同步、把 Stitch 产物转成前端组件（React/Vue 生态、shadcn/ui、Remotion）。**43 个技能 · 9 条斜杠命令 · MCP 代理。**

### [processon](https://github.com/partme-ai/partme-processon-plugin) — 可编辑图表与信息图

专业可编辑的 ProcessOn 流程图、泳道图、UML、架构/ER 图、思维导图、时间轴、组织架构与结构化信息图——内置质量评审工作流，采用无密钥本地 stdio 代理（凭据始终由用户自持）。**7 个技能 · 7 条斜杠命令 · MCP 代理。**

## 安装

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

将本仓库添加为第三方市场即可；`.agents/plugins/marketplace.json` 清单与 Claude 兼容。

## 质量与安全

- 每个插件带真实测试套件（blender：419 项；maya：227 项；stitch：272 项；processon：91+ 项），全部进 CI。
- 钩子只做提示：报告环境就绪度、路由意图、提醒未收尾工作——**永不阻断回合**。
- 破坏性操作需要动作绑定授权；导出与生成的媒体都附带验证回执。
- ProcessOn 与 Stitch 集成是无密钥设计：凭据由用户配置，绝不内嵌。
- vendor 进来的第三方技能保留其许可证与 `THIRD_PARTY_NOTICES`。

## 发布流程

各插件仓库独立发版；发版后在这里把对应条目的 `version` 号更新并推送，用户端刷新市场即可拿到更新。

## 清单文件

| 文件 | 使用方 |
|---|---|
| `marketplace.json` | ZCode |
| `.agents/plugins/marketplace.json` | Codex、Claude Code |
| `kimi-marketplace.json` | Kimi Code CLI |

## 许可

Apache-2.0。各插件仓库自带独立的许可证与第三方声明。
