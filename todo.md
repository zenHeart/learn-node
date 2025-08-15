# learn-node

## 1. 项目目标与核心诉求

### 项目目标

* 构建一个纯前端 SPA 应用，基于 Docusaurus 实现，支持 Node.js 示例在浏览器端交互式运行。
* 使用 WebContainers 提供浏览器端 Node.js 环境，支持最新版本的 Node.js，版本通过组件配置传入，暂不支持动态切换。
* 示例与依赖懒加载，首次显示时预处理，支持离线可用。
* 文档支持 MD 和 MDX 格式，使用 Docusaurus 进行主题定制。
* 示例以 Sandpack 风格嵌入文档中，支持文件树、编辑器和预览区布局。
* 支持移动端适配，提供类似 VS Code 的开发体验。

### 核心诉求

* 提供交互式的 Node.js 示例运行环境，用户无需本地环境即可体验。
* 高度可定制的 UI 和主题，确保品牌一致性。
* 可扩展的架构，预留服务端构建和离线缓存能力。

## 2. 项目结构、页面说明与核心模块

### 页面结构

* **首页 (`/`)**：功能介绍、知识地图、学习路径导航。
* **文档详情页 (`/docs/...`)**：基于 Docusaurus 渲染 MD/MDX 内容，右侧为目录导航，左侧为内容区。
* **Playground 页面 (`/playground`)**：独立的代码编辑和运行环境，左侧为文件目录树，中间为代码编辑器，右侧为预览区。支持类似 vue-repl 效果，url 中编码文档内容支持多个文件

### 核心模块

* **`<NodePlayground>` 组件**：MDX 可嵌入组件，集成 WebContainers，包含文件树、编辑器、终端日志、预览面板、重置按钮，并支持移动端响应式布局。
* **WebContainers 集成层**：封装 `@webcontainer/api` 管理实例生命周期、初始文件载入、启动运行命令与预览端口映射。
* **Docusaurus 主题定制层**：利用 swizzling 或 themeConfig 定制首页、文档页、Playground 页样式与布局，实现品牌一致性。
* **懒加载机制**：Playground 模块仅在用户操作（如进入页面或点击运行按钮）时初始化 WebContainer，避免初始加载性能问题。

---

## 3. 技术选型与工具链

* **文档生成与站点框架**：Docusaurus v3.8.1 — 支持 SPA、MDX、React、版本控制、搜索等功能。
* **交互编辑体验借鉴**：Sandpack 提供 React 组件与工具集，用于代码编辑与预览体验。虽然无法直接用于 Node.js 服务运行，但在 UI 布局和组件行为方面提供良好参考。
* **Node.js in Browser**：使用 StackBlitz WebContainers，通过 API 提供浏览器端运行 Node.js 能力的环境。
* **MDX 插入组件**：Docusaurus 原生支持在 Markdown/MDX 中嵌入 React 组件。
* **主题与样式定制**：

  * 使用 Infima（Docusaurus 默认 UI 框架） + 自定义 CSS 或 swizzling 进行 UI 设计调整。
* **开发与部署工具**：Node.js + npm/yarn, Docusaurus CLI, Git, GitLab CI/CD。

---

## 4. 项目细节拆解与优先级

### 优先级表

| 优先级 | 模块/页面              | 功能描述                                        |
| --- | ------------------ | ------------------------------------------- |
| P0  | Docusaurus 基础架构    | 初始化项目，配置首页、文档结构、Playground 页面，以及 MD/MDX 支持。 |
| P0  | WebContainers 核心集成 | 启动 WebContainer，写入简单示例文件，运行并显示预览。           |
| P1  | 编辑器与文件目录           | 集成 Monaco 编辑器，实现文件树与文件切换编辑功能。               |
| P1  | 终端日志显示             | 显示 WebContainer 控制的 Node 输出日志。              |
| P2  | 重置功能               | 实现编辑区重置，将内容恢复到初始状态。                         |
| P2  | 懒加载机制              | Playground 模块仅在必要时加载与初始化容器。                 |
| P3  | 响应式 & 移动端适配        | 切换布局以适应手机和平板设备。                             |
| P3  | 主题 UI 定制           | 使用 swizzling、自定义 CSS 完成品牌化外观。               |
| P4  | 架构预留字段             | 为服务端版本切换/缓存接口预先设计组件 prop、结构。                |

---

## 5. github CI/CD 部署方案

### 部署地址

* **生产环境**：`http://blog.zenheart.site/learn-node`

---

## 6. 现有仓库评估与迁移策略（基于当前代码直接实施）

### 仓库现状

* 根目录已有大量 Node 示例与测试：`api/`, `modules/`, `examples/`, `docs/` 等。
* 测试工具链：`jest.config.js` 存在，`package.json` 的 `test` 使用 `jest --watch`（交互模式，不适合 CI）。
* 文档目录：`docs/` 已存在若干 Markdown 文档，但尚未集成 Docusaurus 站点。
* 目标部署：GitHub Pages（CNAME/路径为 `blog.zenheart.site/learn-node`）。

### 迁移与对齐原则

* 保持现有目录不动，新增站点目录 `site/`（或 `website/`），以避免破坏当前示例与历史记录。
* 以非侵入方式引用仓库中的示例文件，构建时生成可供浏览器端 WebContainers 读取的 “示例清单（manifest）”。
* `docs/` 作为 Docusaurus 内容根（通过配置 alias 指向），避免复制内容。

### 新增目录与文件（建议）

* `site/`：Docusaurus 工程根
  * `docusaurus.config.ts` / `tsconfig.json`
  * `src/theme/`：主题与样式定制
  * `src/components/NodePlayground/`：交互组件实现
  * `src/pages/playground/index.tsx`：独立 Playground 页面
  * `plugins/learn-node-loader/`：自定义插件，收集并打包示例文件
  * `generated/manifest.json`：构建期生成的示例清单
  * `static/`：静态资源（图标、示例截图等）

---

## 7. 示例打包与发现机制（Manifest 规范）

### 扫描来源

* 默认目录白名单：`api/`, `modules/`, `examples/`
* 忽略规则：`**/*.test.*`, `**/__tests__/**`, 二进制、超大文件（> 128KB，可配置）
* README/说明文档可作为示例描述，但不直接注入容器执行

### 示例单元定义

每个示例在清单中抽象为：

```json
{
  "id": "api/fs/rename-basic",
  "title": "fs.rename 基础用法",
  "description": "演示在 Node 环境中进行文件重命名",
  "tags": ["fs", "node", "api"],
  "entry": "index.js",
  "nodeVersion": "20.11.0",
  "deps": { "lodash": "^4.17.21" },
  "files": {
    "index.js": { "contents": "..." },
    "package.json": { "contents": "{\\n  \\\"type\\\": \\\"module\\\"\\n}" }
  }
}
```

说明：

* `entry` 为默认运行入口；若未提供，则按规则尝试：`index.js` > `main.js` > `src/index.js`。
* `nodeVersion` 透传给 WebContainers（当前 WebContainers 支持的 Node 版本范围内，默认固定版本）。
* `deps` 会用于容器内 `npm install`（支持最小化安装，鼓励示例内联 `package.json`）。

### 生成流程

* 在 Docusaurus 构建前（`contentLoaded` 钩子）运行扫描器：
  1. 读取白名单目录，应用忽略规则
  2. 基于文件树与启发式规则生成示例单元
  3. 输出到 `site/generated/manifest.json`，构建产物中以静态 JSON 提供

---

## 8. `<NodePlayground>` 组件 API 与行为

### Props

* `exampleId: string`：从清单中加载指定示例
* `initialFiles?: Record<string, { contents: string; active?: boolean }>`：覆盖或动态注入文件
* `nodeVersion?: string`：默认 `20.11.0`
* `autoStart?: boolean`：是否自动运行，默认 `true`
* `runCommand?: string`：默认 `node index.js`
* `installCommand?: string`：默认 `npm install`
* `previewPort?: number`：若示例为 HTTP 服务，指定映射端口（如 3000/5173）
* `readOnly?: boolean`：只读模式（文档页默认开启，Playground 页可关闭）
* 事件：`onReady`, `onStdout`, `onStderr`, `onError`, `onReset`

### UI 组成

* 左侧：文件树（可新建/重命名/删除，受 `readOnly` 影响）
* 中间：Monaco Editor（支持 TS/JS，高亮、格式化、搜索、跳转）
* 右侧：
  * 终端输出（`stdout/stderr` 实时流）
  * 预览面板（当示例是 HTTP 服务时显示 iframe）
* 顶部工具栏：运行、重置、依赖安装、切换 Node 版本（预留/只读）

### 行为细节

* 懒加载：首次渲染时动态加载 `@webcontainer/api` 与 Monaco
* 容器初始化：
  1. 创建 WebContainer 实例
  2. 写入文件（`initialFiles` 覆盖清单文件）
  3. 执行安装命令（若 `deps` 非空）
  4. 执行运行命令
  5. 若指定 `previewPort`，建立端口转发并渲染 iframe
* 重置：恢复到清单的原始文件快照（IndexedDB 缓存会被清理）

---

## 9. Playground 路由与 URL 协议

* 独立页：`/playground`
* 通过查询参数选择示例：`/playground?example=api/fs/rename-basic`
* 通过 `code=` 参数传入多文件编码（Base64 + JSON），结构：

```json
{
  "entry": "index.js",
  "files": { "index.js": "console.log('hello')" },
  "deps": { }
}
```

优先级：`code` > `example`

---

## 10. 兼容性、降级与安全

* 浏览器支持：Chrome/Edge ≥ 108；Safari 需新版本（若不支持 WebContainers 则降级为只读代码 + 运行禁用提示）
* 网络与权限：默认禁止外网访问；依赖安装仅限 npm registry；不允许写入持久化文件系统之外的区域
* 资源上限：
  * 单示例打包体积 ≤ 200KB（可配置）
  * 容器 CPU/内存限制（遵循 WebContainers 默认）
* 降级路径：
  * 不支持容器 → 隐藏运行入口，显示提示与本地运行指南

---

## 11. 性能与离线

* 首屏 JS 预算（首页/文档页）：≤ 250KB（gzip）
* WebContainers 与 Monaco 按需加载，仅在进入 Playground 或首次展开代码示例时加载
* 使用 Service Worker + Workbox 缓存清单与静态资源；示例文件采用 IndexedDB 缓存

---

## 12. 构建、部署与 CI/CD

### 构建脚本（建议新增）

* 根目录 `package.json`：
  * `site:dev`：在 `site/` 启动 Docusaurus 开发
  * `site:build`：构建站点并生成清单
  * `site:serve`：本地预览构建产物
* CI 使用 GitHub Actions：
  * 触发：`push` 到 `master`/`main`
  * 步骤：安装 → 构建（包含清单生成）→ 部署到 `gh-pages` 分支
  * Pages 路径前缀：`/learn-node`

### 测试

* 单元测试：
  * `plugins/learn-node-loader` 的扫描与过滤规则
  * `NodePlayground` 的文件覆盖/重置逻辑
* 端到端：
  * 使用 Playwright 验证示例能成功运行并产出预期 stdout/HTTP 预览

---

## 13. 可观测性与可维护性

* 日志：组件级别日志开关（debug 模式），错误集中上报（可选埋点开关）
* 指标：容器启动时长、依赖安装耗时、示例运行成功率
* 反馈通道：示例页面提供一键反馈/编辑入口（跳转到对应仓库路径）

---

## 14. MVP 交付清单（对应优先级）

### P0（两天内可交付）

* [ ] 初始化 `site/`，最小化 Docusaurus 站点，接入 `docs/`
* [ ] 建立 `NodePlayground` 骨架，跑通 “Hello World” Node 脚本（stdout 输出）
* [ ] 清单生成器：从 `api/fs` 挑选 1–2 个示例生成 manifest，并在文档中嵌入
* [ ] `/playground?example=...` 路由，支持 stdout 显示

### P1

* [ ] Monaco Editor + 文件树，支持文件切换与简单编辑
* [ ] 终端日志流与清屏
* [ ] 重置功能（IndexedDB 缓存清理）

### P2

* [ ] 预览端口映射，演示一个 http 服务示例（如 `http.createServer`）
* [ ] 依赖安装与最小化策略
* [ ] 离线缓存（SW 基础）

### P3

* [ ] 移动端适配（栅格/抽屉式文件树）
* [ ] 主题 UI 定制（与品牌色对齐）

---

## 15. 与现有仓库对接的具体规则

* 示例标题与标签：优先读取同目录 `README.md` 第一段与 Frontmatter 提示；否则基于路径自动生成
* `entry` 识别：若存在 `package.json#scripts.start`，则推导 `runCommand`；否则按 `entry` 规则
* 文件过滤：默认排除 `.md`、`.map`、图片、压缩包；可在目录内 `example.config.json` 覆盖（白名单/黑名单）
* 安装依赖：
  * 优先使用示例内 `package.json#dependencies`
  * 若无，则允许通过 `example.config.json#deps` 指定

---

## 16. 风险与备选方案

* 如 WebContainers 受限（Safari/企业网络），退化为只读示例 + 复制到 StackBlitz/Sandbox 的一键跳转
* 体积约束无法满足时：将示例按需打包（路由切分）并引入 CDN 边缘缓存

---

## 17. 开发环境与要求

* Node.js ≥ 18（本地开发）
* 包管理：npm（与现仓库一致）；后续可迁移 pnpm 优化安装
* 代码规范：沿用现有 ESLint 配置，新增前端规则集（Docusaurus/React/TS）

---

## 18. 验收标准（MVP）

* 访问首页与任一文档页正常
* 在文档中嵌入的 `NodePlayground` 能：
  * 显示示例文件树与代码
  * 启动容器并打印 stdout
  * 重置恢复初始状态
* 在 `/playground` 中通过 `?example=` 打开示例并运行成功
