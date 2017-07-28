/**
 * Created by locke on 2017/3/6.
 */

var deviceServer = require('../../src/device/device_server');
var sysConst = require('../../config/sys.conf');


deviceServer.addIllegalClient(123213);
console.log(deviceServer.getIllegalClient());
deviceServer.addIllegalClient(123212);
console.log(deviceServer.getIllegalClient());
deviceServer.addIllegalClient(123242);
console.log(deviceServer.getIllegalClient());
deviceServer.removeIllegalClient(123213);
console.log(deviceServer.getIllegalClient());
deviceServer.removeIllegalClient(-10);
deviceServer.removeIllegalClient(123213);
console.log(deviceServer.getIllegalClient());

/*******************处理 device 和底层设备通讯的各种消息*******************/
/*
//开启 device 服务器的设备监听端口
deviceServer.listen(sysConst.SOCKET_PORT, function () {
    console.log('device listening on %s',sysConst.SOCKET_PORT);
});

//连接事件，触发绑定设备的函数
deviceServer.on('connection', function (socket) {
    deviceServer.manageConnectNumber(socket,function (err,result) {
        if(err) console.log(err);
        else {
            console.log(result);
        }
    });
});*/
