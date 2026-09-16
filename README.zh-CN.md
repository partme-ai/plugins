# PartMe.AI 插件市场

[English](README.md) | [简体中文](README.zh-CN.md)

![Platforms](https://img.shields.io/badge/hosts-Codex%20·%20ZCode%20·%20Kimi%20·%20Claude-blue)
![Plugins](https://img.shields.io/badge/plugins-8-green)
![License](https://img.shields.io/badge/license-Apache--2.0-orange)

**一套插件，全平台宿主通用。** PartMe.AI 插件集包含八个智能体插件，把编程智能体（Codex、ZCode、Kimi Code、Claude Code）变成专业创作工具的操作者——三维设计、AI 图像/视频生成、UI 设计、图表绘制。每个插件仓库内置全平台适配层，同一份代码被所有受支持宿主原生识别与安装；本仓库是薄索引市场，让它们可被统一发现、一次安装。

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

| 插件 | 版本 | 技能 | 斜杠命令 | MCP |
|---|---|---|---|---|
| [blender](https://github.com/partme-ai/partme-blender-plugin) | 0.3.0 | 31 | 10 | ✓（本地 Harness） |
| [maya](https://github.com/partme-ai/partme-maya-plugin) | 0.1.0 | 5 | 5 | — |
| [stitch](https://github.com/partme-ai/partme-stitch-plugin) | 0.7.8 | 43 | 9 | ✓（代理） |
| [processon](https://github.com/partme-ai/partme-processon-plugin) | 0.2.0 | 7 | 7 | ✓（代理） |
| [dreamina-design](https://github.com/partme-ai/partme-dreamina-design) | 0.4.0 | 19 | 9 | ✓ |
| [dreamina-canvas](https://github.com/partme-ai/partme-dreamina-canvas) | 0.1.2 | 13 | 10 | — |
| [image-factory](https://github.com/partme-ai/partme-image-factory) | 0.1.2 | 4 | 4 | — |
| [video-factory](https://github.com/partme-ai/partme-video-factory) | 0.1.0 | 5 | 5 | — |

### [blender](https://github.com/partme-ai/partme-blender-plugin) — 受保护的 Blender 三维设计

通过受控本地 Harness 驱动真实 Blender 安装：带动作绑定授权的结构化场景操作、里程碑截图做视觉评审、事务回滚、后台作业、附验证回执的多格式导出（glTF/FBX/OBJ）。含白模预演（镜头表→渲染→Seedance 交接）与已验证的即梦/Dreamina 流水线。**31 个技能 · 10 条斜杠命令 · 约 176 个 MCP 工具 · 3 个钩子 · 419 项测试。**

### [maya](https://github.com/partme-ai/partme-maya-plugin) — Autodesk Maya 场景检查与 Playblast

只读场景检查（层级、引用、着色、时间轴）、可回滚 Playblast 预览、未装 Maya 也能跑的运行时预检、即梦上传交接。**5 个技能 · 5 条斜杠命令 · 227 项测试。**

### [stitch](https://github.com/partme-ai/partme-stitch-plugin) — Google Stitch 设计与设计转代码

用 Google Stitch 生成与编辑 UI 界面、管理设计系统、代码↔设计双向同步、把 Stitch 产物转成前端组件（React/Vue 生态、shadcn/ui、Remotion）。**43 个技能 · 9 条斜杠命令 · MCP 代理 · 269 项测试。**

### [processon](https://github.com/partme-ai/partme-processon-plugin) — 可编辑图表与信息图

专业可编辑的 ProcessOn 流程图、泳道图、UML、架构/ER 图、思维导图、时间轴、组织架构与结构化信息图——内置质量评审工作流，采用无密钥本地 stdio 代理（凭据始终由用户自持）。**7 个技能 · 7 条斜杠命令 · MCP 代理 · 91+ 项测试。**

### [dreamina-design](https://github.com/partme-ai/partme-dreamina-design) — 即梦图像与视频生成

完整的即梦（Dreamina）图像与视频生成：经官方 CLI 的文生图、图生图、图生视频与多模态视频，为标准账号提供浏览器 CLI 降级通道，每种模式都有提示词打磨指南，另含镜头标注、成片评审、已验证的 Seedance 自动流水线与断点续跑。**19 个技能 · 9 条斜杠命令 · MCP · 861 项测试。**

### [dreamina-canvas](https://github.com/partme-ai/partme-dreamina-canvas) — 即梦画布节点与时间线工作流

结构化的即梦画布自动化：创建画布、编排多节点图（文本/元素/图像/视频/音频）、逐节点生成媒体、管理视觉+音频时间线、带审批绑定的报价-确认-运行、下载已验证资产、异步操作断点续跑。**13 个技能 · 10 条斜杠命令 · 90 项测试。**

### [image-factory](https://github.com/partme-ai/partme-image-factory) — 批量图像生产

带出处的提示词发现、附验证回执的批量出图、像素级指标评审，以及闭环提示词优化（拒绝→优化→重生成直到通过）。**4 个技能 · 4 条斜杠命令 · 407 项测试 + 1000 子测试。**

### [video-factory](https://github.com/partme-ai/partme-video-factory) — 自动视频剪辑与合成

计划/执行/评审/恢复四段式自动剪辑：时间线驱动的合成、同步评审、中断作业恢复、媒体验证回执。**5 个技能 · 5 条斜杠命令 · 6 项测试。**

## 安装

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

## 安装后去哪确认

- **ZCode**：已装插件出现在插件面板的「已安装」视图（及顶部图标条）。技能、斜杠命令、MCP 工具只在**安装之后新开的会话**里出现——请新开会话。面板里「还没有个人插件，使用 /plugin builder 创建…」的空状态指的是*你在会话里用构建器创建的插件*，和市场安装的插件是两个概念；我们的插件在 **partme-ai** 市场分段与已安装视图里。
- **Kimi Code CLI**：没有明显的"添加市场"按钮——在会话里直接输入 `/plugins marketplace <url>` 斜杠命令，或在 `/plugins` 面板里按 GitHub URL 逐个添加插件仓库。已装插件在新会话生效（`/reload` 或 `/new`）。
- **Codex**：用 `codex plugin list` 核对；已装插件在下一个会话生效。

## 质量与安全

- 每个插件带真实测试套件（blender：419；maya：227；stitch：269；processon：91+；dreamina-design：861；dreamina-canvas：90；image-factory：407+1000 子测试；video-factory：6），全部进 CI。
- 钩子只做提示：报告环境就绪度、路由意图、提醒未收尾工作——**永不阻断回合**。
- 破坏性操作需要动作绑定授权；导出与生成的媒体都附带验证回执。
- ProcessOn、Stitch 与即梦集成均为无密钥设计：凭据由用户配置或宿主 CLI 登录态提供，绝不内嵌。
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
