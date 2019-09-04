/**
 * 测试 spawn 函数
 */

const {exec} = require ('child_process');

exec('pwd',{
	env:{
		ENV:'test-exec'
	}
},(err,stdout,stderr) => {
	if(err) {
		return console.log(`exec err:${err}`)
	}
	console.log(`stdout:${stdout}`)
	console.log(`stderr:${stderr}`)
});