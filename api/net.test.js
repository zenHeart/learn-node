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
    console.log(`connect client ${socket.remoteAddress}`);
    var intervalHandle = null;
    socket.setTimeout(1000*20,function () {
       console.log('socket timeout');
       socket.end();
    });
    socket.setEncoding('utf8');
    //测试 tcp 连接维持
    //socket.setKeepAlive(true,1000*20);


    socket.on('data',function (data) {
        console.log(`server receive: ${data}`);
        socket.write(data);
        if(!intervalHandle) {
            intervalHandle = setInterval(function () {
                console.log('send to client!');
                socket.write('server respond!');
            },1000*10);
        }
    });
    socket.on('error',function (e) {
        console.log(`error:${e.message}`);
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


//
// const client = net.createConnection({ port: 33331 }, () => {
//     //'connect' listener
//     console.log('connected to server!');
//     client.write('clinet info!\r\n');
// });
// client.on('data', (data) => {
//     console.log(`client receive:${data}`);
//     client.end();
// });
// client.on('end', () => {
//     console.log('disconnected from server');
// });
