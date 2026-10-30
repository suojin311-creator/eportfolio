# 产品作品集网站

个人首页与项目详情页。当前收录智能玩偶开学季成长包，个人定位保留教育、内容与 AI 应用方向，姓名和联系方式按要求使用占位。

## 本地运行

环境：Node.js 22.12+（本次验证为 Node.js 24），npm。

```sh
npm ci
npm run dev
```

生产构建与本地检查：

```sh
npm run build
npm run preview
```

`dist/` 为静态部署目录。开发服务器默认端口 5173，预览端口 4173。当前尚未发布到公网。

## 页面

- `/`：个人定位、精选项目、经历和联系信息。
- `/projects/growth-companion`：背景、研究、方案取舍、可切换的双端路径、任务交互示意、关键判断、阶段交付及支持材料。
- 产品演示在访客点击后以对话框打开；没有自动播放。
- 任务示意仅在浏览器内演示设置、卡片触发和家长确认，不连接真实设备。

## 内容维护

- `src/main.tsx` 顶部的 `profile`：姓名、邮箱与方向。邮箱为空时展示占位，不生成假联系方式。
- `src/main.tsx`：首页与成长包案例。添加项目时，新增项目入口及对应路由/详情内容。
- `src/styles.css`：响应式布局、组件与打印样式。
- `public/media/`：用户提供的录屏与产品截图。
- `public/documents/`：脱敏访谈精选、PRD 重构稿及审核说明。
- `docs/design-references.md`：实际查看的公开参考、采用做法与来源限制。

## 材料范围

案例以本人参与的研究至方案定稿阶段为主，未填写未知上线成绩。NFC 按规划呈现；原界面截图和重构示意明确标记。资料附件中的 PRD、审核说明为依据项目回忆与讨论整理的重构材料，不冒充历史原始版本。

## 部署

站点使用前端路径路由，静态托管需将未知页面路径回退到 `index.html`。仓库提供 Netlify `_redirects` 和 Vercel `vercel.json` 示例。GitHub Pages 使用子目录且没有原生路由回退，正式发布前需按实际域名/路径配置路由和资源基址。

### GitHub Pages 预览

`npm run preview:offline` 生成的独立站点也适用于 GitHub Pages 子目录：资源使用相对路径，页面使用哈希路由，刷新项目页无需服务端重写。

预览发布分支为 `gh-pages`，分支根目录放置独立站点及 `.nojekyll`。在 GitHub 仓库的 Settings → Pages 中选择 **Deploy from a branch**，分支选择 **gh-pages / (root)** 并保存。开通成功后，访问 `https://suojin311-creator.github.io/eportfolio/`。此地址在 Pages 开通及首次部署成功前不可用。

更新流程：修改源码，运行 `npm run preview:offline` 并验证，将 `offline-preview/` 的网站文件同步到 `gh-pages` 分支。源代码保留在 `main`，预览分支只含可公开展示的网站文件，不含原始访谈转写或本地缓存。

## 无需服务器的审阅包

运行 `npm run preview:offline`（另需 Python 3）可生成 `Product_Portfolio_Website_Preview.zip`。解压完整目录后打开 `index.html`，可以直接浏览首页与项目详情、使用任务示意和观看本地视频。此模式使用哈希路由，线上版本保留常规路径路由。
