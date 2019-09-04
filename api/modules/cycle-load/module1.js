console.log('load module1')
const module2 =require('./module2');
console.log('module1 cycle module2:',module2);

module.exports = {
	module1:'module1'
}
