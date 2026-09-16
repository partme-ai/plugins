# PartMe.AI 插件市场

[English](README.md) | [简体中文](README.zh-CN.md)

面向 **Codex / ZCode / Kimi Code**（以及兼容 Claude Code 的宿主）的三平台智能体插件。本仓库只是一个薄索引市场；插件代码都在各自的插件仓库里。

| 插件 | 平台 | 能力 |
|---|---|---|
| [blender](https://github.com/partme-ai/partme-blender-plugin) | Codex · ZCode · Kimi · Claude | 通过受控本地 Harness 设计 Blender 场景：受控操作、里程碑截图、事务回滚、校验导出、白模预演 |
| [maya](https://github.com/partme-ai/partme-maya-plugin) | Codex · ZCode · Kimi · Claude | 检查 Autodesk Maya 场景、可回滚 Playblast 预览、即梦交接 |
| [stitch](https://github.com/partme-ai/partme-stitch-plugin) | Codex · ZCode · Kimi · Claude | Google Stitch 设计与设计转代码工作流 |
| [processon](https://github.com/partme-ai/partme-processon-plugin) | Codex · ZCode · Kimi · Claude | 可编辑的 ProcessOn 流程图、思维导图与信息图 |

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
