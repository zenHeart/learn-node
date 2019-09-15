/**
 * 采用如下方法实现 buffer 数组的安全转义
 */
function bufferToHex (bufferArr) {
  return Array.from (bufferArr, byte) {
    return ('0' + (byte & 0xff).toString (16)).slice (-2);
  }).join ('');
}

function hexTobuffer(hexStr){
	return Buffer.from(hexStr,'hex')
}
