const ora = require ('ora');

const spinner = ora ('请等待!');

// 开始

function delay (sNum, cb) {
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      cb ();
      return resolve ();
    }, sNum * 1000);
  });
}

async function testSpinner () {
  await delay (1, () => spinner.start ('开始'));
  await delay (1, () => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
    spinner.info ('下载中');
  });

  spinner.info ('等待 3 s');
  await delay (3, () => {
    spinner.stop ();
  });
  await delay (1, () => spinner.succeed ('成功'));
  await delay (1, () => spinner.fail ('失败'));
  await delay (1, () => spinner.warn ('警告'));
}

testSpinner ();
