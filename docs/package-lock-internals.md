---
title: package-lock-internals
tags: node npm package-lock dependency-lock
birth: 2024-01-01
modified: 2026-03-28
---

package-lock-internals
===

**前言:深入讲解 npm package-lock.json 的内部结构与锁定机制**

> 本文档配套交互式演示: `examples/package-lock-internals-demo.html`

---

## 概述

`package-lock.json` 是 npm 5+ 版本引入的锁文件,用于锁定依赖包的精确版本,确保团队协作和构建的可重现性。本文深入讲解其内部结构和工作原理。

### 核心问题:为什么需要 package-lock.json?

没有 lockfile 时,`package.json` 中的 semver 范围在每次安装时可能解析到不同版本:

| package.json | 首次安装 | 6 个月后安装 | 原因 |
|---|---|---|---|
| `"lodash": "^4.17.21"` | 4.17.21 | 4.17.21 → 4.17.**25** | 小版本更新 |
| `"lodash": "~4.17.21"` | 4.17.21 | 4.17.**25** → 4.17.**30** | 补丁版本更新 |
| `"lodash": "4.17.21"` | 4.17.21 | **始终 4.17.21** | 确切版本 |
| `"lodash": "*"` | 随机 | 随机 | 完全不约束 |

`package-lock.json` 的出现就是为了消除这种不确定性——它记录了**首次安装时解析到的精确版本**,下次安装直接复用,而不是重新解析 semver 范围。

---

## package-lock.json 结构详解

### 文件顶层级结构

```json
{
  "name": "项目名称",
  "version": "项目版本",
  "lockfileVersion": 3,           // 锁文件版本号
  "packages": { ... },             // 新格式 (npm v7+)
  "dependencies": { ... },         // 旧格式 (npm v5-v6)
  "requires": true                 // 兼容性字段
}
```

### lockfileVersion 版本对照表

| lockfileVersion | npm 版本 | 说明 |
|-----------------|---------|------|
| 1 | npm 5-6 | 初始版本,仅 `dependencies` 嵌套结构 |
| 2 | npm 7-8 | 新增扁平化 `packages` 字段 |
| 3 | npm 9+ | 当前版本,支持 `optionalDependencies` 完整锁定 |

### 各版本的内部结构差异

```
lockfileVersion 1 (npm 5-6):
package-lock.json
├── name, version
├── dependencies: { pkg: { version, dependencies: { ... } } }  ← 嵌套树
└── (无 packages 字段)

lockfileVersion 2 (npm 7-8):
package-lock.json
├── name, version
├── lockfileVersion: 2
├── packages: { "": {...}, "node_modules/pkg": {...} }     ← 扁平化
└── dependencies: { pkg: { version, resolved, integrity } }     ← 保留,兼容

lockfileVersion 3 (npm 9+):
package-lock.json
├── name, version
├── lockfileVersion: 3
└── packages: { "": {...}, "node_modules/pkg": {...}, ... } ← 主要结构
    (dependencies 字段已废弃,仅作兼容)
```

### v2 → v3 的关键变化

npm 9 (lockfileVersion 3) 最重要的变化是**不再依赖 `dependencies` 字段**,完全基于 `packages` 扁平化结构:

```json
// v3 packages 结构——不再有嵌套的 dependencies 树
{
  "packages": {
    "": { "name": "my-app", "version": "1.0.0" },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "dependencies": { "lodash": "4.17.21" }
    }
  }
}
```

每个包的 `dependencies` 字段现在是**扁平引用**而非嵌套结构——`"lodash": "4.17.21"` 表示"此包的直接依赖是 lodash@4.17.21",而不是把整个 lodash 的依赖树展开。

---

## packages 字段详解 (npm v7+)

`packages` 是一个扁平化的对象,key 为包在 node_modules 中的相对路径。

### 基本结构

```json
{
  "packages": {
    "": {                        // 空字符串表示根项目
      "name": "my-project",
      "version": "1.0.0",
      "engines": {...},
      "funding": {...}
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "engines": {
        "node": ">=0.10.0"
      },
      "dependencies": {
        "lodash": "4.17.21"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.23.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.23.0.tgz",
      "integrity": "sha512-3Ba10e9SeKo2E1vDD8gLhLlL6+qjEcULlOj8fX9Ce8bj4bJZ5j/cvK+3vVHrUdR5Xb7BtLAg7XbTqiWg3cT0vT0g=="
    }
  }
}
```

### 关键字段说明

#### version - 精确版本号

```json
"version": "4.17.21"
```

严格匹配 npm 语义化版本,包含主版本.次版本.补丁版本。

#### resolved - 包下载地址

```json
"resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz"
```

指向确切 tarball 文件的完整 URL,用于直接下载,绕过 registry 解析。

#### integrity - SHA512 完整性校验

```json
"integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
```

使用 **Subresource Integrity** (SRI) 格式:
- SHA512 哈希(以 `sha512-` 开头)
- SHA1 哈希(以 `sha1-` 开头,旧格式)
- SHA256 哈希(以 `sha256-` 开头)

#### engines - 引擎约束

```json
"engines": {
  "node": ">=16.0.0",
  "npm": ">=8.0.0"
}
```

声明运行该包所需的 Node.js 和 npm 版本。

#### dependencies - 嵌套依赖

```json
"dependencies": {
  "lodash": "4.17.21"
}
```

声明此包的直接依赖及其精确版本,形成依赖树。

#### optionalDependencies - 可选依赖

```json
"optionalDependencies": {
  "fsevents": "2.3.3"
}
```

标记为可选的依赖,安装失败不会导致整体安装失败。

---

## dependencies 字段详解 (npm v5-v6 旧格式)

旧格式使用嵌套结构,每个包在 `dependencies` 中记录其依赖。

```json
{
  "dependencies": {
    "lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==",
      "dependencies": {
        "lodash": "4.17.21"
      }
    }
  }
}
```

**问题**: 嵌套结构导致相同的包被重复声明,文件体积膨胀。

---

## npm install 如何使用 package-lock

### 安装流程图

```
┌─────────────────────────────────────────────────────────┐
│                    npm install                           │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  1. 读取 package-lock.json                              │
│     ├─ 检查 lockfileVersion 是否兼容                    │
│     └─ 检查 name, version 是否匹配                      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  2. 构建已安装包列表                                     │
│     ├─ 读取 node_modules/.package-lock.json              │
│     └─ 对比 package-lock.json 内容                       │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  3. 依赖解析与锁定                                       │
│     ├─ 根据 package-lock.json 中声明的精确版本安装       │
│     └─ 对于 semver 范围,使用锁定的版本                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  4. 完整性校验                                          │
│     ├─ 下载 tarball                                      │
│     ├─ 计算 SHA512/SHA256 哈希                          │
│     └─ 与 integrity 字段比对                              │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  5. 更新 lock 文件 (如需要)                             │
│     └─ 保存安装后的真实依赖树到 package-lock.json        │
└─────────────────────────────────────────────────────────┘
```

### 核心源码逻辑 (libnpm 对应逻辑)

npm install 实际调用 `@npmcli/arborist` 进行依赖树操作:

1. **加载锁文件**: `Arborist.prototype.loadVirtual()` 读取 package-lock.json
2. **构建树**: 根据 lockfile 构建已安装包树
3. **验证完整性**: 校验 integrity 哈希值
4. **差异检测**: 检测 package.json 变化
5. **安装**: 从 resolved URL 下载并安装

---

## 为什么版本仍然可能不同

即使有 package-lock.json,以下情况仍可能导致版本差异:

### 1. Semver 范围未锁定

`package.json` 中使用范围版本:

```json
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

- `^4.17.21` 表示 `>=4.17.21 <5.0.0`
- 首次安装会锁定到 `4.17.21`
- 但如果项目删除 node_modules 和 package-lock.json 重新安装,可能获取更高的小版本

**解决方案**: 使用确切版本 `4.17.21` 或 `~4.17.21`

### 2. peerDependencies 冲突

```json
{
  "peerDependencies": {
    "react": ">=16.0.0"
  }
}
```

多个包对同一个 peer dependency 有不同版本要求时,npm 会尝试自动解决,不同版本组合可能产生不同结果。

### 3. 可选依赖 (optionalDependencies)

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.3"
  }
}
```

可选依赖安装失败时 npm 会静默忽略,不同平台可能安装不同的可选包。

### 4. npm 版本差异

| npm 版本 | lockfileVersion | 行为差异 |
|---------|----------------|---------|
| npm 5 | 1 | 基础锁定 |
| npm 6 | 1 | 支持 `npm ci` |
| npm 7 | 2 | 支持 workspace |
| npm 9 | 3 | 支持 optionalDependencies 锁定 |

### 5. npm 配置差异

```bash
# 影响安装的配置文件
~/.npmrc              # 全局配置
.project/.npmrc       # 项目配置
npm config get <key>  # 查看当前配置
```

关键配置项:
- `legacy-peer-deps` - 处理 peer deps 方式
- `engine-strict` - 是否严格校验 engines
- `fetch-retries` - 下载重试次数

### 6. Registry 差异

```json
{
  "registry": "https://registry.npmjs.org/"
}
```

使用私有 registry 或镜像时,resolved URL 不同,可能获取到不同内容的包。

### 7. 手动修改 node_modules 但未更新 lockfile

**这是最常见但最容易被忽视的原因:**

```
场景: 开发者手动修改了 node_modules 中的包内容
     (例如:构建脚本直接替换了某个依赖)

结果: node_modules 中的版本 ≠ package-lock.json 中的版本
      下次 npm install 会把 node_modules 恢复为 lockfile 版本
```

构建脚本中执行 `npm install lodash@latest` 后:
- `node_modules/lodash`: 4.17.30 (最新版)
- `package-lock.json`: 仍记录 4.17.21
- 下次 `npm install`: **回退到 4.17.21,构建修改丢失**

### 8. package.json 和 lockfile 不同步

`npm install` 只在 **package.json 变化时** 才更新 lockfile:

```bash
# 这些操作会触发 lockfile 更新
npm install lodash@latest --save
npm install lodash --save-dev
npm uninstall lodash

# 这些操作不会更新 lockfile
npm install lodash@latest              # --save 缺失时不写 package.json
rm -rf node_modules && npm install    # 只删除 node_modules,lockfile 不更新
```

### 9. integrity 哈希的作用与局限性

```json
{
  "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
}
```

- **能检测**: 下载的 tarball 内容是否被篡改/损坏
- **不能检测**: `node_modules` 目录下的手动修改
- npm 会跳过 `integrity` 不匹配的包,重新下载

### 10. package-lock.json 在不同操作系统间

某些原生模块 (native addons) 的平台差异:
- `fsevents` 仅 macOS
- `node-sqlite3` 有预编译二进制,不同平台内容不同
- `sharp` 的 libvips 绑定因平台而异

```json
"node_modules/fsevents": {
  "version": "2.3.3",
  "resolved": "...",
  "integrity": "...",           // Linux/macOS 内容不同,integrity 也不同
  "optional": true,             // 平台不适配时自动跳过
  "os": ["darwin"]             // 仅 macOS
}
```

---

## npm install 内部解析流程

### 完整流程图

```
npm install 执行流程
│
├─ Step 1: 解析 package.json
│   ├─ 读取 dependencies / devDependencies / peerDependencies
│   ├─ 读取 engines / optionalDependencies
│   └─ 按 workspaces 配置发现所有子包 (如有)
│
├─ Step 2: 检查 package-lock.json
│   ├─ 存在? → 检查 lockfileVersion 是否兼容
│   ├─ name/version 是否与 package.json 匹配
│   └─ 不匹配 → 报警告,忽略 lockfile,重新解析
│
├─ Step 3: 依赖解析 (Arborist load-virtual)
│   ├─ 按 package.json 中的 semver 范围查找可用版本
│   ├─ 如 lockfile 中有锁定版本 → 直接使用
│   ├─ 如无 → 从 registry 获取元数据,按优先级解析
│   └─ 处理 peerDependencies 和嵌套依赖冲突
│
├─ Step 4: 构建依赖图 (dedupe)
│   ├─ npm v7+: 扁平化 (hoisted)
│   └─ 共享依赖提升到根 node_modules
│
├─ Step 5: 下载 & 校验
│   ├─ 从 resolved URL 下载 tarball
│   ├─ 计算 SHA512 哈希
│   └─ 与 integrity 字段比对
│
├─ Step 6: 写入 node_modules/.package-lock.json
│   └─ 记录当前安装的精确状态
│
└─ Step 7: 更新 package-lock.json (如有变化)
    ├─ package.json 有变化 → 重新写入
    └─ package.json 无变化 → 不修改 lockfile
```

### libnpm / @npmcli/arborist 源码对应

npm 的依赖解析核心在 `@npmcli/arborist`:

```javascript
// 伪代码表示核心逻辑
class Arborist {
  async loadVirtual(opts) {
    // 1. 加载 package-lock.json
    const lockfile = this.loadLockFile(opts)

    // 2. 对比 package.json
    if (!this.packageJsonConsistent(lockfile)) {
      // lockfile 与 package.json 不一致时,重新解析
      return this.rebuildTree()
    }

    // 3. 按 lockfile 构建已安装包树
    return this.buildTreeFromLockfile(lockfile)
  }

  async rebuildTree() {
    // 从 package.json 重新解析所有依赖
    const tree = await this.buildDepTree()
    // dedupe 后写入新的 lockfile
    await this.writeLockfile(tree)
    return tree
  }
}
```

---

## node_modules/.package-lock.json 是什么

npm 在安装过程中会生成 `node_modules/.package-lock.json`,它是当前安装状态的快照:

```json
{
  "lockfileVersion": 3,
  "packages": {
    "node_modules/lodash": {
      "name": "lodash",
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/...",
      "integrity": "sha512-..."
    }
  }
}
```

**与根目录 package-lock.json 的区别:**

| | `package-lock.json` | `node_modules/.package-lock.json` |
|---|---|---|
| 位置 | 项目根目录 | `node_modules/` 内 |
| 作用 | 声明式:想要什么版本 | 命令式:实际安装了哪些 |
| git 提交 | ✅ | ❌ (不应提交) |
| 内容差异 | 可能与实际不符 | 100% 反映实际状态 |

两者内容不一致时,说明 `node_modules` 被人为修改过,或者 lockfile 过期。

---

## 可重现构建最佳实践

### 1. 使用 npm ci 替代 npm install

```bash
# npm install: 读取 package-lock,可能更新
npm install

# npm ci: 干净安装,完全基于 lockfile
npm ci
```

`npm ci` 特点:
- 删除 node_modules 目录
- 按照 package-lock.json 精确安装
- 速度更快
- 适合 CI/CD 环境

### 2. 锁定 package.json 中的依赖版本

```json
{
  "dependencies": {
    "lodash": "4.17.21",
    "axios": "~1.6.0",
    "express": "^4.18.2"
  }
}
```

- 不带前缀: 确切版本
- `~` 前缀: 允许补丁版本更新 `~1.2.3` → `1.2.x`
- `^` 前缀: 允许次版本更新 `^1.2.3` → `1.x.x`
- 建议使用确切版本或 `~` 锁定

### 3. 提交完整的 lock 文件

```bash
git add package-lock.json
git commit -m "Lock dependencies"
```

确保 lock 文件与代码同步提交。

### 4. 验证完整性

```bash
# 验证 lock 文件一致性
npm ls

# 检查过时的依赖
npm outdated

# 更新依赖并锁定
npm update
npm install <package>@latest --save
```

### 5. 使用 --legacy-peer-deps 一致性

在团队中统一 peer dependency 处理策略,避免安装结果不一致。

### 6. 锁定 npm 版本

在 package.json 中指定:

```json
{
  "engines": {
    "npm": ">=9.0.0",
    "node": ">=18.0.0"
  }
}
```

或在 `.nvmrc` 文件中:

```
18.17.0
```

---

## package-lock.json vs yarn.lock vs pnpm-lock.yaml

### 三者详细对比

| 特性 | package-lock.json | yarn.lock | pnpm-lock.yaml |
|-----|-------------------|-----------|----------------|
| 格式 | JSON | YAML | YAML |
| 格式版本 | lockfileVersion | 无显式版本字段 | 6.0 / 9.0 |
| Frozen 命令 | `npm ci` | `yarn install --frozen-lockfile` | `pnpm install --frozen-lockfile` |
| 默认确定性 | ❌ (`npm install` 可能更新) | ✅ | ✅ |
| workspace 支持 | npm workspaces | yarn workspaces | pnpm workspaces |
| 离线缓存 | 需 lock 文件 | `.yarn/cache` | `.pnpm-store` |
| node_modules 结构 | 扁平化 (hoisted) | 扁平化 (hoisted) | 非扁平化 (symlink) |
| 幽灵依赖 | 可能出现 | 可能出现 | 不可能出现 |
| 依赖提升 | 全部提升到根 | 全部提升到根 | 严格按需提升 |

### yarn.lock 结构详解

Yarn 的 lockfile 以**依赖声明**为 key,而非物理路径:

```yaml
# yarn.lock 的 key 是 "package-name@semver-range"
lodash@^4.17.21:
  version "4.17.21"                # 解析到的精确版本
  resolved "https://registry.yarnpkg.com/lodash/-/lodash-4.17.21.tgz#..."
  integrity sha512-v2kDEe57lecTulaDIuNTPy3Ry4gG...

axios@^1.6.0:
  version "1.6.8"
  resolved "https://registry.yarnpkg.com/axios/-/axios-1.6.8.tgz#..."
  integrity sha512-v2kDEe57lecTulaDIuNTPy3Ry4gG...
  dependencies:
    follow-redirects "^1.15.6"
    form-data "^4.0.0"
    proxy-from-env "^1.1.0"
```

Yarn 的 lockfile 优势:
1. **人类可读**: YAML 格式,手动可审查
2. **变更可追踪**: `git diff yarn.lock` 比 JSON 更清晰
3. **离线缓存**: `.yarn/cache/` 内置离线安装
4. **确定性**: `yarn install` 默认不更新 lockfile (除非需要)

### pnpm-lock.yaml 结构详解

pnpm 使用内容寻址存储 (CAS),lockfile 结构与其他两者显著不同:

```yaml
lockfileVersion: '6.0'

importers:
  .:
    dependencies:
      lodash:
        specifier: ^4.17.21
        version: 4.17.21
    packages:
      lodash: &1
        id: registry.npmjs.org/lodash/4.17.21
        dev: false
        engines:
          node: '>=0.10.0'
        resolution:
          integrity: sha512-...
          tarball: https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz
        version: 4.17.21

packages:
  # 内容寻址 ID
  /lodash/4.17.21:
    engines:
      node: '>=0.10.0'
    resolution:
      integrity: sha512-...
      tarball: https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz
    version: 4.17.21

  /axios/1.6.8_node_modules/axios:
    resolution: {integrity: sha512-...,tarball: ...}
    version: 1.6.8
```

pnpm lockfile 特点:
1. **内容寻址**: 包按 hash 存储,同一版本只存一份
2. **严格依赖**: `node_modules/.pnpm` 存储真实包,通过 symlink 引用
3. **幽灵依赖不存在**: 无法引用未在 package.json 声明的包
4. **磁盘高效**: 跨项目共享同一 store

### 从一种 lockfile 切换到另一种

```bash
# 从 yarn 切换到 npm
rm -rf node_modules yarn.lock
npm install                    # 生成 package-lock.json

# 从 npm 切换到 yarn
rm -rf node_modules package-lock.json
yarn install                   # 生成 yarn.lock

# 从 pnpm 切换到 npm
rm -rf node_modules pnpm-lock.yaml .pnpm-store
npm install

# ⚠️ 禁止: 直接删 lock 文件而不删 node_modules
# rm package-lock.json
# npm install   ← node_modules 残留旧版本,导致不一致
```

---

## 常见问题排查

### Q: package-lock.json 和 package.json 冲突怎么办?

```bash
# 删除 lock 文件重新生成
rm package-lock.json
npm install
```

### Q: 为什么 node_modules 中包的版本与 lockfile 不一致?

可能原因:
1. 手动修改了 node_modules
2. 使用了 `npm install --ignore-scripts`
3. npm 版本不同

解决: `npm ci`

### Q: lockfileVersion 不兼容?

```
npm notice package-lock.json exists but your npm version (6.14.17)
does not support lockfileVersion 3.
```

解决: 升级 npm 或使用兼容的 node 版本。

---

## 调试与验证命令

### 查看依赖树

```bash
# 查看完整依赖树 (哪些版本实际被安装了)
npm ls

# 查看特定包的依赖链
npm ls lodash

# 查看为什么某个包被安装了
npm why lodash

# 仅查看直接依赖
npm ls --depth=0

# 查看生产依赖
npm ls --prod
```

### 验证 lockfile 一致性

```bash
# 检查实际安装的包与 lockfile 是否一致
npm ci --dry-run

# 对比 package.json 和 lockfile
# 如果不一致,会列出差异
npm install --package-lock-only

# 查看哪些包会更新 (但实际不安装)
npm outdated

# 更新包并锁定 (不会超过 semver 范围)
npm update
```

### 查看 lockfile 内容

```bash
# 查看 lockfile 解析后的结构 (npm v7+)
npm pkg get dependencies --package-lock-only

# 查看 lockfile 中的 integrity 哈希
cat package-lock.json | jq '.packages["node_modules/lodash"].integrity'

# 查看 resolved URL
cat package-lock.json | jq '.packages["node_modules/lodash"].resolved'

# 查看 lockfile 版本
cat package-lock.json | jq '.lockfileVersion'
```

### 常见问题诊断

```bash
# lockfile 与 package.json 不一致时重新生成
npm install --package-lock-only  # 仅重新生成 lockfile,不安装
npm install                      # 安装并同步

# 强制重新安装 (清理 node_modules)
rm -rf node_modules
npm ci                           # 推荐,基于 lockfile 精确安装

# 强制从 registry 更新所有包
rm -rf node_modules package-lock.json
npm install                      # 重新解析,可能获取新版本

# 查看当前安装的精确版本
cat node_modules/.package-lock.json | jq '.packages["node_modules/lodash"].version'

# 查找悬空包 (在 lockfile 中不存在)
npm ls --all | grep "invalid"

# 检查包的 integrity 哈希
npm pack <package>@<version> --dry-run
```

---

## 总结

package-lock.json 是 npm 实现可重现构建的核心机制:

1. **精确版本锁定**: 记录每个包的确切版本号
2. **完整性校验**: 使用 SHA 哈希确保下载内容正确
3. **依赖树完整**: 记录完整嵌套依赖关系
4. **下载地址**: 记录精确的 tarball URL

### 关键认知地图

```
package-lock.json 生命周期

创建 ──── npm install (首次)
  │       lockfileVersion 决定格式
  │       记录首次解析的精确版本
  │
更新 ──── npm install (package.json 变化时)
  │       不会自动更新 lockfile 中的包版本
  │       除非 package.json 声明的 semver 范围扩大
  │
使用 ──── npm ci (CI/CD)
  │       完全基于 lockfile 安装
  │       不会更新 lockfile
  │       node_modules 不一致时直接报错
  │
失效 ──── package-lock.json 和 package.json 不一致
          npm 忽略 lockfile,重新解析依赖
          可能安装与团队其他成员不同的版本
```

### 最佳实践清单

- [ ] 使用 `npm ci` 替代 `npm install` 在 CI/CD 中
- [ ] 始终 `git add package-lock.json` 与 package.json 一起提交
- [ ] 优先使用确切版本或 `~` 前缀,避免 `^` 和 `*`
- [ ] 永远不要手动修改 `node_modules` 后不更新 lockfile
- [ ] 永远不要删 `package-lock.json` 但保留 `node_modules`
- [ ] 在 `.npmrc` 中锁定 registry 地址
- [ ] 使用 `npm why <pkg>` 排查依赖来源
- [ ] monorepo 中在根目录执行 `npm ci`

通过遵循最佳实践,可以确保团队协作和 CI/CD 中的构建一致性。
