---
name: portal-dev
description: 门户项目开发流程：Superpowers 工作流 + Taste Skill 前端品味 + 强制浏览器验证
---

# 门户项目开发 Skill

当在 `E:\AI\projects\网页设计\` 目录下进行任何前端改动时，自动遵循以下流程。

## 1. 强制加载两个 Skill

每次开始工作前，确认以下 skill 已激活：

- **Superpowers** — 开发流程约束：brainstorming → writing-plans → TDD → review
- **Taste Skill** (`design-taste-frontend`) — 前端设计品味：杜绝样板间 UI，调 VARIANCE / MOTION / DENSITY

如果未安装，先安装：
```
/plugin install superpowers@claude-plugins-official
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

## 2. 强制前端验证

**任何涉及 UI 的改动（HTML/CSS/JS/TSX），改完必须验证，不可跳过。**

验证步骤：

1. 启动本地服务器：
   ```bash
   cd E:\AI\projects\网页设计
   node serve.mjs
   ```

2. 用 Playwright 打开浏览器实际跑一遍：
   - 确认页面正常加载（标题、关键内容存在）
   - 确认交互可用（点击按钮、表单提交、页面跳转）
   - 确认无控制台错误
   - 如改动了布局，检查移动端视口（375/768/1280）

3. 验证脚本模板（按需调整检查项）：
   ```js
   import { chromium } from 'playwright';
   const browser = await chromium.launch({ args: ['--no-sandbox'] });
   const page = await browser.newPage();
   page.on('pageerror', e => console.error('PAGE ERROR:', e.message));
   page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE:', m.text()); });

   await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
   // ... 具体检查项 ...
   await browser.close();
   ```

4. 验证通过标准：
   - 所有目标内容在 DOM 中可见
   - 无 page errors
   - 无 console errors
   - 关键交互可正常触发

## 3. 项目约束

- 子项目放在 `projects/<kebab-case>/`，入口文件统一 `index.html`
- 所有资源使用相对路径（`./assets/...`），保证子目录自包含
- 新增子项目后更新门户 `index.html` 的卡片列表
- 遵守 `CLAUDE.md` 中的设计语言（暗黑底色 + 紫/青/玫瑰金调色板）

## 4. 别忘了

- 改完后更新 `CLAUDE.md` 中的子项目列表（如有新增）
- 子项目需要构建步骤的，构建产物拷贝到对应文件夹
- Vite/React 项目记得设 `base: './'`

## 5. 自动发布到线上

**每次网页设计工作结束后，必须自动执行以下步骤，不可跳过：**

```bash
cd E:\AI\projects\网页设计
git add .
git commit -m "更新：<简述改了什么>"
git push
```

推送后 GitHub Pages 自动部署，线上网址 https://04070212.github.io/website-design/ 即时更新。

- 如果 `git push` 需要认证，提示用户先运行 `gh auth login`
- commit 信息用中文简述改动内容
