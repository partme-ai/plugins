# PartMe.AI 插件市场

[English](README.md) | [简体中文](README.zh-CN.md)

![Platforms](https://img.shields.io/badge/hosts-Codex%20·%20ZCode%20·%20Kimi-blue)
![Plugins](https://img.shields.io/badge/plugins-11-green)
![License](https://img.shields.io/badge/license-Apache--2.0-orange)

本仓库集中管理 10 个独立发布的 PartMe.AI 插件，只保存市场元数据，不复制插件运行代码。ID、显示名称、描述、版本、仓库地址、排序和 Logo 均由同一份中央目录统一生成到 Codex、ZCode、Kimi Code 三个平台。

## 管理的插件

| 显示名称 | 插件 ID | 独立仓库 | 版本 | Logo |
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
| MiniMax 设计 | `minimax-design` | [partme-minimax-design](https://github.com/partme-ai/partme-minimax-design) | 0.1.0 | `assets/logo-approved.png` |
| 代码规范检查 | `codeguard` | [partme-codeguard-plugin](https://github.com/partme-ai/partme-codeguard-plugin) | 0.2.0 | `assets/official-logo.png` |
| 宝塔 Linux 面板 | `bt-linux-panel` | [partme-bt-plugin](https://github.com/partme-ai/partme-bt-plugin) | 1.0.0 | `assets/official-logo.png` |

插件按显示名称字母顺序排列。现有 Codex 插件 ID 是三个平台共同使用的事实源。

### 规划仓库

[`partme-cine-planning`](https://github.com/partme-ai/partme-cine-planning) 以 `design_baseline_not_released` 状态纳入本仓管理。其 `director`、`script`、`storyboard` 当前只有规格基线，按仓库自身发行边界刻意不提供插件 manifest，也不会进入三个平台的可安装市场；完成独立实现与发行门禁后再发布。

## 平台清单

| 平台 | 清单文件 |
|---|---|
| Codex | `.agents/plugins/marketplace.json` |
| ZCode | `marketplace.json` |
| Kimi Code | `kimi-marketplace.json` |

每个独立插件仓库继续自行维护 `.codex-plugin/plugin.json`、`.zcode-plugin/plugin.json` 和 `kimi.plugin.json` 运行适配层。

ZCode 市场清单只使用官方文档列出的字段。ZCode 文档规定的插件身份字段是 `name`；通用 Display Name 继续保存在 `catalog.json` 和插件 manifest 中，供兼容客户端使用。Skills、Commands、子智能体、Hooks 和 MCP 服务从各独立插件仓库加载。Kimi 市场条目使用官方支持的 `id`、`displayName` 和 `source` 字段。

OpenAI 侧，各仓继续以 `.codex-plugin/plugin.json` 为 compatibility-first 事实源；Dreamina Canvas 额外维护并测试 Agent Plugins 1.0 根 `plugin.json`。可移植迁移必须由各仓自身完成，因为增加根 manifest 会改变组件发现方式，并可能让旧 MCP 声明失效。进入本地市场或发布到工作区不等于已提交到通用公共插件目录。

## 安装

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

设置 → 插件 → 创建 → 添加插件市场，填入 `partme-ai/plugins`，再从个人市场分段安装。

### Kimi Code CLI

```text
/plugins marketplace https://raw.githubusercontent.com/partme-ai/plugins/main/kimi-marketplace.json
```

### 国内镜像（AtomGit）

如果 GitHub 访问缓慢或不可达，改为添加本市场的 AtomGit 镜像。所有安装命令保持不变，只替换市场地址：

```bash
codex plugin marketplace add https://atomgit.com/partme-ai/plugins.git
codex plugin add maya-design@partme-ai
codex plugin add stitch-design@partme-ai
# ……其余插件命令与上方 Codex 段完全一致
```

ZCode：打开 设置 → 插件 → 创建 → 添加插件市场，输入 `atomgit.com/partme-ai/plugins`。Kimi Code：登记 AtomGit 原始端点上的 `kimi-marketplace.json` 地址，或克隆本仓库后登记本地文件。

注意事项：

- AtomGit 源与 GitHub 源共用市场名 `partme-ai`，后添加的会覆盖先添加的。切回官方源执行
  `codex plugin marketplace add partme-ai/plugins`。
- 镜像与官方源跟踪同一条 `main` 分支，双平台插件版本完全一致。

## 目录维护

`catalog.json` 是市场元数据的唯一事实源。独立插件发布新版本后：

1. 更新 `catalog.json` 中对应条目。
2. 运行 `node scripts/sync-marketplaces.mjs --write`，生成三个平台清单。
3. 运行 `node scripts/sync-marketplaces.mjs`，校验平台清单、兄弟仓中的平台元数据以及引用的 Logo 文件。

只要平台清单与中央目录发生漂移，或任一独立插件仓缺少必要适配文件，校验就会失败。

ZCode 格式依据：[Plugin](https://zcode.z.ai/cn/docs/plugin)、[子智能体](https://zcode.z.ai/cn/docs/subagents)、[Skill](https://zcode.z.ai/cn/docs/skill)、[MCP](https://zcode.z.ai/cn/docs/mcp-services)、[Hooks](https://zcode.z.ai/cn/docs/hooks)、[Command](https://zcode.z.ai/cn/docs/commands)。

Kimi 格式依据：[Plugins](https://www.kimi.com/code/docs/kimi-code-cli/customization/plugins.html)、[Agents](https://www.kimi.com/code/docs/kimi-code-cli/customization/agents.html)、[Skills](https://www.kimi.com/code/docs/kimi-code-cli/customization/skills.html)、[MCP](https://www.kimi.com/code/docs/kimi-code-cli/customization/mcp.html)、[Hooks](https://www.kimi.com/code/docs/kimi-code-cli/customization/hooks.html)。

OpenAI 格式依据：[构建插件](https://learn.chatgpt.com/docs/build-plugins)、[插件架构](https://developers.openai.com/plugins/concepts/plugins)、[Skills](https://developers.openai.com/plugins/build/skills)、[MCP Server](https://developers.openai.com/plugins/build/mcp-server)、[ChatGPT UI](https://developers.openai.com/plugins/build/chatgpt-ui)、[插件打包](https://developers.openai.com/plugins/build/plugins)、[连接与测试](https://developers.openai.com/plugins/deploy/connect-chatgpt)、[提交发布](https://developers.openai.com/plugins/deploy/submission)。

## 许可

Apache-2.0。各插件仓库自带独立许可证与第三方声明。
