const rewire = require('rewire')
const hiModule = rewire('./hi')

console.log("%o",hiModule);
hiModule.hi();
hiModule.__set__("name", "tom");
hiModule.hi();
