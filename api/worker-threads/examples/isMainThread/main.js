/**
 * 利用 isMainThread 判断是否为主线程
 * 若是则创建 worker
 */

const { isMainThread, Worker } = require('worker_threads');
const path = require('path');

if (isMainThread) {
  console.log('main thread');
  new Worker(path.join(__dirname, './worker.js'));
} else {
  console.log('sub thread');
}
