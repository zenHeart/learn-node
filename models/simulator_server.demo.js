/**
 * Created by lockepc on 2017/6/2.
 */
/*npm 包依赖*/
var CMD_CONST = require('../../src/simulator/simulator_command');
var CMD_NAME = CMD_CONST.API;
var ITEM = CMD_CONST.ITEM;
var sysConst = require('../../config/sys.conf');
var HOST = 'localhost';
var PORT = sysConst.SOCKET_PORT;

var SimulatorServer = require('../../src/simulator/simulator_server');
var clientLog = require('../../src/simulator/client_log');

var simulator_1Server = SimulatorServer();


simulator_1Server.newSimulator([{deviceId:1},{deviceId:2,mac:'e247b7d57a86'}]);

var simulator_1 = simulator_1Server.getSimulator(1);
var simulator_2 = simulator_1Server.getSimulator(2);


simulator_1.connect(PORT, HOST, function () {
    clientLog.debug('simulator_1 connect success', {
        ip: simulator_1.localAddress,
        port: this.localPort,
    });
});
simulator_1.notifyNewDevice(1);
simulator_1.heartSend(1);
simulator_1.on('data', function (data) {
    var cmdResult = simulator_1.resolveCmd(data);
    //第一个参数为命令名,后一个参数为命令值
    simulator_1.emit(cmdResult[0], cmdResult[1]);
    clientLog.debug('simulator_1 receive server data : ', data.toString());
});
//该消息用来初始化上线设备的基本信息
simulator_1.on(CMD_NAME.NOTIFY_NEW_DEVICE, function (result) {

    //接收到结果证明上线
    clientLog.debug('device %s online', simulator_1.mac, result);
    this.netStatus = 6;
    simulator_1.meterNumber = result[ITEM.METER_NUMBER];
});


simulator_2.connect(PORT, HOST, function () {
    clientLog.debug('simulator_2connect success', {
        ip: simulator_2.localAddress,
        port: this.localPort,
    });
});
simulator_2.notifyNewDevice(0);
simulator_2.heartSend(1);
simulator_2.on('data', function (data) {
    var cmdResult = simulator_1.resolveCmd(data);
    //第一个参数为命令名,后一个参数为命令值
    simulator_2.emit(cmdResult[0], cmdResult[1]);
    clientLog.debug('simulator_2 receive server data : ', data.toString());
});
simulator_2.on(CMD_NAME.NOTIFY_NEW_DEVICE, function (result) {
    //接收到结果证明上线
    clientLog.debug('device %s online', simulator_2.mac, result);
    this.netStatus = 5;
    simulator_2.meterNumber = result[ITEM.METER_NUMBER];
});





