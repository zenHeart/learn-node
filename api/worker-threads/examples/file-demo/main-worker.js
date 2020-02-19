const { Worker } = require('worker_threads');

const limit = 1e5;
const threads = 10;
const namesPerThread = limit / threads;
const outputFile = `${__dirname}/data1.txt`;

console.time('process');
for (let i = 0; i < threads; i++) {
  const port = new Worker(require.resolve('./worker.js'), {
    workerData: {
      namesPerThread,
      outputFile
    }
  });
  port.on('error', console.log);
  port.on('exit', code => {
    console.log(`exit code : ${code}`);
  });
}
process.on('exit', function() {
  console.timeEnd('process');
});
