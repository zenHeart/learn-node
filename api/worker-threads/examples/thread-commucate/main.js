/**
 * 利用 isMainThread 判断是否为主线程
 * 若是则创建 worker
 */

const { Worker } = require('worker_threads');
const path = require('path');

for (let i = 0; i < 3; i++) {
  // 实例化线程时传递初始值
  let thread = new Worker(path.join(__dirname, './worker.js'), {
    workerData: { threadId: i }
  });

  thread.on('message', id => {
    console.log(`main receive from ${id} thread`);
    thread.postMessage(`get info from ${id} thread success!`);
  });
  thread.on('error', console.log);
  thread.on('exit', (...args) => {
    console.log(`exit:${args}`);
  });
}
