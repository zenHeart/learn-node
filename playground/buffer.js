const crypto = require ('crypto');
const iv = crypto.randomBytes (16);
let arr1 = new Uint8Array (iv);
function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join(',');
  }
  let res = iv.toString ('utf-8');
let arr2 = Buffer.from (iv.toString ('utf-8'), 'utf-8');
console.log (arr1, arr2,buf2hex(arr1),iv)
