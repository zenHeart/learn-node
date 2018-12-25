
let module1 = require('./module1')
console.log(module1.demo,module1.isFinish);

module.exports = function (params) {
    console.log('module2');
    setTimeout(() => {
        console.log(module1.demo,module1.isFinish);
    }, 0)
}