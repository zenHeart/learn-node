/**
 *
 * Created by lockepc on 2017/6/22.
 */
/*const EventEmitter = require('events');
const  eventEmitter = new EventEmitter();
eventEmitter.emit('hello','data');

eventEmitter.on('hello',function (data) {
    eventEmitter.emit('hello','data');
    console.log(data)
});*/


var a = {a:1,b:{
    a:1,
    b:2,
}};
c = a.b;
delete  a;
console.log(c);
d= c;
delete c;
console.log(d);
delete d;