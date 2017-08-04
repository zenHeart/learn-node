const chai = require('chai');
const {assert,should,expect} = chai;
const net = require('net');
const {Server} = net;
const server = new Server();
const PORT = 33331;

//
// chai.should();
//
// describe('测试 socket 超时连接',function () {
//    it('测试 setTimeout 在断网情况下的使用',function () {
//
//    });
//
// });
server.listen(PORT,function () {
    console.log(`listen on ${PORT}`);
});

server.on('connection',function (socket) {
    console.log('connect');
    var intervalHandle = null;
    socket.setTimeout(1000*20,function () {
       console.log('socket timeout');
       socket.end();
    });
    socket.setEncoding('utf8');
    socket.on('data',function (data) {
        console.log(data);
        socket.write(data);
        if(!intervalHandle) {
            intervalHandle = setInterval(function () {
                socket.write('hello!');
            },1000*10);
        }
    });
    socket.on('error',function (e) {
        console.log(e.message);
    });
    socket.on('timeout',function (e) {
        console.log('timeout');
        socket.end();
    });
    socket.on('end',function (e) {
        console.log('end');
        socket.end();
    });
    socket.on('close',function (e) {
        console.log('close');
    });
});
