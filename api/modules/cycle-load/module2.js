console.log('load module2')
let module1 = require('./module1')
console.log('module2 cycle module1:',module1);

module.exports = {
	module2:'module2'
}