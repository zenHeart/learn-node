exports.isFinish = false;
const module2 =require('./module2');

exports.demo = function name(params) {
    module2();
    console.log('module1.js');
}
exports.isFinish = true;
