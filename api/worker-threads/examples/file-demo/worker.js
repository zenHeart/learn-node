const fs = require('fs-extra');
const random = require('random-name');

const { parentPort, workerData } = require('worker_threads');

const { namesPerThread, outputFile } = workerData;

(async function createNameFile() {
  for (let i = 0; i < namesPerThread; i++) {
    const data = `${random.first()} ${random.middle()} ${random.last()}`;
    await fs.appendFile(outputFile, data);
    parentPort.postMessage(data);
  }
})();
