/**
 * Created by lockepc on 2017/6/3.
 */
var clientLog = require('../../src/simulator/client_log');
var Simulator = require('../../src/simulator/simulator');
var CMD_CONST = require('../../src/simulator/simulator_command');
var CMD_NAME = CMD_CONST.API;
var ITEM = CMD_CONST.ITEM;
var sysConst = require('../../config/sys.conf');

var HOST = 'localhost';
var PORT = sysConst.SOCKET_PORT;

var simulator = Simulator({mac: '121212121212', heartInterval: 10});

simulator.connect(PORT, HOST, function () {
    clientLog.debug('connect success', {
        ip: simulator.localAddress,
        port: this.localPort,
    });
});


simulator.notifyNewDevice(1);
simulator.heartSend(1);

simulator.on('data', function (data) {

    var cmdResult = simulator.resolveCmd(data);

    //第一个参数为命令名,后一个参数为命令值
    simulator.emit(cmdResult[0], cmdResult[1]);
    clientLog.debug('receive server data : ', data.toString());
});

//该消息用来初始化上线设备的基本信息
simulator.on(CMD_NAME.NOTIFY_NEW_DEVICE, function (result) {

    //接收到结果证明上线
    clientLog.debug('device %s online', simulator.mac, result);
    this.netStatus = 1;
    simulator.meterNumber = result[ITEM.METER_NUMBER];
});

