import log from 'test-module'
import { add } from 'test-module/add';
// 注意此处 exports 没有暴露 minus，在引用的时候会触发检查报错
import { minus } from 'test-module/minus'; 

log(); // test-module
console.log(add(1,2))