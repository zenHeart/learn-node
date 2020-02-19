const { workerData, parentPort } = require('worker_threads');

const { threadId } = workerData;

parentPort.postMessage(threadId);
parentPort.on('message', data => {
  console.log(`thread ${threadId} receive from parent ${data}`);
});
