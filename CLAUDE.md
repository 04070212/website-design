# 网页设计 — 项目合集规范

> **Skill 已配置**：`.claude/skills/portal-dev.md` — 自动启用 Superpowers + Taste Skill，强制浏览器验证。

## 目录结构

```
E:\AI\projects\网页设计\
├── index.html          ← 门户首页（卡片导航）
├── projects/           ← 所有子项目
│   ├── <project-name>/ ← 每个子项目一个文件夹，kebab-case 命名
│   └── _template/      ← 新项目模板
├── assets/             ← 门户自身资源（预览图等）
└── CLAUDE.md           ← 本文件
```

## 添加新子项目

1. 在 `projects/` 下新建文件夹，命名用 kebab-case（如 `my-new-tool/`）
2. 确保子项目**完全自包含**：
   - 所有资源使用相对路径（`./assets/...`、`../assets/...`）
   - 不依赖外部服务器（纯客户端或自带 serve 脚本）
   - 可在 `file://` 协议下运行（或用简单 HTTP 服务器）
3. 在门户 `index.html` 的 `.grid` 里添加一张卡片，替换一个 placeholder
4. 卡片格式：
   ```html
   <a href="projects/my-new-tool/" class="card">
     <div class="card-emoji">🆕</div>
     <div class="card-title">项目名</div>
     <div class="card-desc">一句话描述</div>
     <div class="card-tags"><span class="tag">标签</span></div>
   </a>
   ```

## 子项目命名约定

- 文件夹名：`kebab-case`（如 `cyber-fortune`、`career-compass`）
- 入口文件：统一命名为 `index.html`
- 如需构建步骤，构建产物拷贝到对应子项目文件夹

## 设计语言

- 暗黑底色 `#0a0a0f`
- 主色调：紫 `#9b8ec4` / 青 `#7cc8d8` / 玫瑰金 `#c9a0b8`
- 卡片风格：深色半透明 + 细边框 + hover 上浮发光
- 字体：PingFang SC / Microsoft YaHei

## 当前子项目

| 文件夹 | 名称 | 描述 | 技术栈 |
|--------|------|------|--------|
| `cyber-fortune/` | 赛博算命 | 星座/星盘/八字/流年 | React + Vite + astronomy-engine |
| `career-compass/` | 职场能量罗盘 | 24题职场人格测评 | Vanilla HTML/CSS/JS |
| `resume-optimizer/` | 简历优化助手 | AI简历优化、匹配度评分、对比 | Vanilla HTML/CSS/JS |

## 验证方式

1. 浏览器打开 `E:\AI\projects\网页设计\index.html`
2. 确认门户首页显示两张项目卡片 + 两张 placeholder
3. 点击各卡片进入子项目，确认功能正常
4. 返回门户首页，确认导航正常
