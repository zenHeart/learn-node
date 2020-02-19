const random = require('random-name');
const fs = require('fs-extra');

const limit = 1e5;
const outputFile = `${__dirname}/data.txt`;

async function createNameFile() {
  for (let i = 0; i < limit; i++) {
    const data = `${random.first()} ${random.middle()} ${random.last()}`;
    await fs.appendFile(outputFile, data);
  }
}

console.time('process');
createNameFile();
process.on('exit', function() {
  console.timeEnd('process');
});
