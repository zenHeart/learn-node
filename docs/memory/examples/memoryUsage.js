#!/usr/bin/env node

/**
 * Node.js 内存使用示例
 * 演示堆内存 vs 对外内存（Buffer）的区别
 * 
 * 用法：
 * node memoryUsage.js heap     - 测试堆内存增长（可能导致崩溃）
 * node memoryUsage.js buffer   - 测试Buffer内存增长（只增长RSS）
 */

const args = process.argv.slice(2);
const memoryType = args[0] || 'heap';

// 格式化内存使用信息
function formatMemoryUsage(memUsage) {
  const formatBytes = (bytes) => {
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  };

  return {
    rss: formatBytes(memUsage.rss),           // 常驻集大小 - 进程占用的物理内存
    heapTotal: formatBytes(memUsage.heapTotal), // 堆内存总量
    heapUsed: formatBytes(memUsage.heapUsed),   // 已使用的堆内存
    external: formatBytes(memUsage.external),   // V8引擎外部的内存使用
    arrayBuffers: formatBytes(memUsage.arrayBuffers) // ArrayBuffer 分配的内存
  };
}

// 打印内存使用情况
function printMemoryUsage(label) {
  const memUsage = process.memoryUsage();
  const formatted = formatMemoryUsage(memUsage);
  
  console.log(`\n=== ${label} ===`);
  console.log(`RSS (物理内存):     ${formatted.rss}`);
  console.log(`Heap Total (堆总量): ${formatted.heapTotal}`);
  console.log(`Heap Used (堆使用):  ${formatted.heapUsed}`);
  console.log(`External (对外内存): ${formatted.external}`);
  console.log(`ArrayBuffers:       ${formatted.arrayBuffers}`);
}

// 堆内存增长测试 - 可能导致崩溃
function testHeapMemory() {
  console.log('🚨 测试堆内存增长 - 可能导致进程崩溃！');
  printMemoryUsage('初始状态');
  
  const arrays = [];
  let iteration = 0;
  
  const interval = setInterval(() => {
    try {
      // 创建大量对象存储在堆中
      const largeArray = new Array(1000000).fill('这是一个很长的字符串用来占用堆内存空间');
      arrays.push(largeArray);
      
      iteration++;
      
      if (iteration % 10 === 0) {
        printMemoryUsage(`堆内存测试 - 第${iteration}次迭代`);
        
        // 检查堆内存是否接近限制
        const memUsage = process.memoryUsage();
        const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
        
        if (heapUsedMB > 1000) { // 1GB 限制
          console.log('\n⚠️  堆内存使用超过1GB，停止测试以避免崩溃');
          clearInterval(interval);
        }
      }
      
      if (iteration > 100) {
        console.log('\n✅ 测试完成，未发生崩溃');
        clearInterval(interval);
      }
      
    } catch (error) {
      console.log('\n💥 发生内存不足错误:', error.message);
      clearInterval(interval);
    }
  }, 100);
  
  // 监听可能的内存不足错误
  process.on('uncaughtException', (error) => {
    if (error.message.includes('out of memory') || error.code === 'ERR_OUT_OF_MEMORY') {
      console.log('\n💥 进程因内存不足而崩溃:', error.message);
      process.exit(1);
    }
  });
}

// Buffer内存增长测试 - 主要影响RSS
function testBufferMemory() {
  console.log('📈 测试Buffer内存增长 - 主要影响RSS，不会轻易崩溃');
  printMemoryUsage('初始状态');
  
  const buffers = [];
  let iteration = 0;
  
  const interval = setInterval(() => {
    // 创建大型Buffer（对外内存）
    const largeBuffer = Buffer.alloc(10 * 1024 * 1024); // 10MB
    largeBuffer.fill('B'); // 填充数据确保实际分配
    buffers.push(largeBuffer);
    
    iteration++;
    
    if (iteration % 5 === 0) {
      printMemoryUsage(`Buffer测试 - 第${iteration}次迭代`);
      
      const memUsage = process.memoryUsage();
      const rssMB = memUsage.rss / 1024 / 1024;
      
      if (rssMB > 2000) { // 2GB 限制
        console.log('\n⚠️  RSS内存使用超过2GB，停止测试');
        clearInterval(interval);
      }
    }
    
    if (iteration > 50) {
      console.log('\n✅ Buffer测试完成');
      clearInterval(interval);
    }
  }, 200);
}

// 比较不同内存类型的影响
function compareMemoryTypes() {
  console.log('🔍 内存类型对比测试');
  printMemoryUsage('初始状态');
  
  console.log('\n--- 创建堆内存对象 ---');
  const heapObjects = [];
  for (let i = 0; i < 100; i++) {
    heapObjects.push(new Array(100000).fill(`heap-object-${i}`));
  }
  printMemoryUsage('堆内存对象创建后');
  
  console.log('\n--- 创建Buffer对象 ---');
  const bufferObjects = [];
  for (let i = 0; i < 10; i++) {
    bufferObjects.push(Buffer.alloc(10 * 1024 * 1024, `buffer-${i}`));
  }
  printMemoryUsage('Buffer对象创建后');
  
  console.log('\n--- 清理堆内存对象 ---');
  heapObjects.length = 0;
  global.gc && global.gc(); // 如果可用，强制垃圾回收
  printMemoryUsage('堆内存清理后');
  
  console.log('\n--- 清理Buffer对象 ---');
  bufferObjects.length = 0;
  global.gc && global.gc();
  printMemoryUsage('Buffer清理后');
}

// 主函数
function main() {
  console.log('🚀 Node.js 内存使用分析工具');
  console.log(`当前Node.js版本: ${process.version}`);
  console.log(`测试类型: ${memoryType}`);
  
  // 如果启用了垃圾回收器暴露
  if (global.gc) {
    console.log('✅ 垃圾回收器已暴露 (使用 --expose-gc 参数)');
  } else {
    console.log('ℹ️  垃圾回收器未暴露，建议使用 --expose-gc 参数运行');
  }
  
  switch (memoryType.toLowerCase()) {
    case 'heap':
      testHeapMemory();
      break;
    case 'buffer':
      testBufferMemory();
      break;
    case 'compare':
      compareMemoryTypes();
      break;
    default:
      console.log('❌ 无效的内存类型');
      console.log('使用方法:');
      console.log('  node memoryUsage.js heap     - 测试堆内存');
      console.log('  node memoryUsage.js buffer   - 测试Buffer内存');
      console.log('  node memoryUsage.js compare  - 对比测试');
      console.log('\n建议使用参数:');
      console.log('  node --expose-gc --max-old-space-size=512 memoryUsage.js heap');
      process.exit(1);
  }
}

// 错误处理
process.on('warning', (warning) => {
  console.log('⚠️  警告:', warning.message);
});

// 运行主函数
main();
