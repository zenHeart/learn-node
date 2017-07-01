/**
 * Created by lockepc on 2017/6/13.
 */

/**
 * spawn 产生一个新进程
 * arg1 命令名
 * arg2 可选的参数
 * arg3 可选的选项
 * */
const { spawn } = require('child_process');
const ls = spawn('node', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(process.execPath);
    console.log(`child process exited with code ${code}`);
});