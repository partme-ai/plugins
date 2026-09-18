#!/usr/bin/env node
/**
 * sync-release-tooling.mjs —— 把发版工具链分发到所有 partme 插件仓。
 *
 * 分发内容（幂等，内容以本文件内嵌模板为准）：
 *   1. scripts/bump-plugin.mjs   —— 主本（plugins/scripts/bump-plugin.mjs）逐字节拷贝
 *   2. AGENTS.md                 —— 发版纪律要求（plugin-id 按仓定制）
 *
 * 范围：catalog.json 的全部 plugins[].localDirectory + planningRepositories[].localDirectory。
 * planning 仓（无可安装 manifest）的 AGENTS.md 会注明跟随宿主插件发版。
 *
 * 用法：node scripts/sync-release-tooling.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspace = path.dirname(root);
const dryRun = process.argv.includes("--dry-run");

const catalog = JSON.parse(fs.readFileSync(path.join(root, "catalog.json"), "utf8"));

const targets = [
  ...catalog.plugins.map((p) => ({
    dir: p.localDirectory,
    pluginId: p.id,
    displayName: p.displayName,
    planning: false,
  })),
  ...(catalog.planningRepositories ?? []).map((p) => ({
    dir: p.localDirectory,
    pluginId: p.name ?? p.id,
    displayName: p.displayName ?? p.name ?? p.id,
    planning: true,
  })),
];

const bumpScript = fs.readFileSync(path.join(root, "scripts", "bump-plugin.mjs"));

const agentsTemplate = (id, displayName, planning) => `# AGENTS.md — ${displayName}

## 版本升级要求（强制，AI 必须遵守）

任何代码改动——无论大小——都必须 bump 版本并发布。PartMe.AI 插件市场
靠版本号感知更新：版本号不动，用户永远看不到「可更新」提示。

${planning ? `> 本仓是**规划仓**（planning repository），无可安装插件清单，不执行独立 bump；\n> 仓内设计变更跟随宿主插件的发版节奏，且不得出现 plugin.json 等 manifest（\n> sync-marketplaces 校验会拒绝）。\n` : ""}
### 发版流程（每次改动完成后执行）

\`\`\`bash
node scripts/bump-plugin.mjs ${planning ? "<宿主插件id>" : id} patch   # 文档/注释/小修复
node scripts/bump-plugin.mjs ${planning ? "<宿主插件id>" : id} minor   # 新功能
node scripts/bump-plugin.mjs ${planning ? "<宿主插件id>" : id} major   # 破坏性变更
\`\`\`

脚本自动完成：catalog.json 版本更新 + 全部 manifest 同步（codex 清单带
当日 \`+codex.日期\` 后缀）+ 三平台市场清单重新生成与校验。之后按脚本
提示提交并 push **两个仓库**（本仓 + plugins 市场仓）。

### 硬性禁令

- 禁止改代码不 bump 版本（「小版本也要发」）
- 禁止手改 catalog.json 的 version 以外的生成产物、或手改三份市场清单——
  它们只能由 \`scripts/bump-plugin.mjs\` 与 \`plugins/scripts/sync-marketplaces.mjs\` 生成
- 版本号必须全链一致（catalog + 4 manifest），\`sync-marketplaces\` 校验会拦截不一致
- 插件本体放本仓根目录；\`plugins/\` 市场仓只存元数据，绝不物理包含插件代码
`;

let written = 0;
for (const t of targets) {
  const repoDir = path.join(workspace, t.dir);
  if (!fs.existsSync(repoDir)) {
    console.error(`⚠️  缺少目录，跳过: ${t.dir}`);
    continue;
  }
  const scriptsDir = path.join(repoDir, "scripts");
  const bumpTarget = path.join(scriptsDir, "bump-plugin.mjs");
  const agentsTarget = path.join(repoDir, "AGENTS.md");
  const agentsText = agentsTemplate(t.pluginId, t.displayName, t.planning);

  const plan = [];
  if (!fs.existsSync(bumpTarget) || !bumpScript.equals(fs.readFileSync(bumpTarget))) {
    plan.push(bumpTarget);
  }
  if (!fs.existsSync(agentsTarget) || fs.readFileSync(agentsTarget, "utf8") !== agentsText) {
    plan.push(agentsTarget);
  }
  if (plan.length === 0) {
    console.log(`= ${t.dir}（已同步）`);
    continue;
  }
  console.log(`+ ${t.dir}: ${plan.map((p) => path.basename(path.dirname(p)) + "/" + path.basename(p)).join(", ")}`);
  if (!dryRun) {
    fs.mkdirSync(scriptsDir, { recursive: true });
    if (plan.includes(bumpTarget)) fs.writeFileSync(bumpTarget, bumpScript);
    if (plan.includes(agentsTarget)) fs.writeFileSync(agentsTarget, agentsText);
  }
  written += plan.length;
}
console.log(dryRun ? `dry-run：将写 ${written} 个文件` : `完成：写入 ${written} 个文件`);
