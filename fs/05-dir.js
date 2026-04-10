// FS - 目录操作

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

async function main() {
  const baseDir = path.join(__dirname, 'test-data', 'project');

  try {
    // 递归创建目录
    await fs.mkdir(path.join(baseDir, 'src', 'components'), { recursive: true });
    await fs.mkdir(path.join(baseDir, 'src', 'utils'), { recursive: true });
    await fs.mkdir(path.join(baseDir, 'dist'), { recursive: true });
    console.log('目录创建完成');

    // 创建一些文件
    await fs.writeFile(path.join(baseDir, 'src', 'index.js'), '// index');
    await fs.writeFile(path.join(baseDir, 'src', 'app.js'), '// app');
    await fs.writeFile(path.join(baseDir, 'src', 'components', 'Button.js'), '// Button');
    await fs.writeFile(path.join(baseDir, 'dist', 'bundle.js'), '// bundle');
    console.log('文件创建完成');

    // 读取目录内容（递归）
    async function readDirDeep(dir, indent = '') {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          console.log(`${indent}📁 ${entry.name}/`);
          await readDirDeep(fullPath, indent + '  ');
        } else {
          console.log(`${indent}📄 ${entry.name}`);
        }
      }
    }

    console.log('\n目录结构:');
    await readDirDeep(baseDir);

    // 同步方式遍历目录
    console.log('\n使用 walkDir 函数遍历:');
    function walkDir(dir, indent = '') {
      const items = fsSync.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fsSync.statSync(fullPath);
        if (stat.isDirectory()) {
          console.log(`${indent}📁 ${item}/`);
          walkDir(fullPath, indent + '  ');
        } else {
          console.log(`${indent}📄 ${item}`);
        }
      }
    }
    walkDir(baseDir);

    // 清理
    await fs.rm(path.join(__dirname, 'test-data'), { recursive: true, force: true });
    console.log('\n清理完成');
  } catch (err) {
    console.error('错误:', err);
  }
}

main();

// 运行结果:
// 目录创建完成
// 文件创建完成
//
// 目录结构:
// 📁 project/
//   📁 src/
//     📄 index.js
//     📄 app.js
//     📁 components/
//       📄 Button.js
//     📁 utils/
//   📁 dist/
//     📄 bundle.js
//
// 使用 walkDir 函数遍历:
// 📁 project/
//   📁 src/
//     📄 index.js
//     📄 app.js
//     📁 components/
//       📄 Button.js
//     📁 utils/
//   📁 dist/
//     📄 bundle.js
// 清理完成
