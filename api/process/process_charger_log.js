/**
 * Created by lockepc on 2017/5/10.
 * 充电桩日志处理功能
 * 1. 每天 00:00:00 备份日志,保存到 YYYY-MM-DD 文件夹,日志名为 origin-YYYY-MM-DD
 * 2. 按照设备提取昨日日志信息保存到 YYYY-MM-DD 文件夹,名字为 id-MAC-YYYY-MM-DD.txt 和 id-MAC-YYYY-MM-DD-heart.txt
 * 3. 清空昨天日志
 * 4. todo 后面可以写一些控制日志的命令行工具
 * 5. todo 可以添加邮件发送的功能
 * todo 后续需要可配置的 rootpath 路径
 */
const readline = require('readline');
const fs = require('fs');
var moment = require('moment');
var inputFile = null;
var outputPath = null;
var backLogFile = null;

//测试命令是否有效
var debugModel = false;
//文件夹和文件名的时间标识
var timeMark = moment().format("YYYY-MM-DD");
var fileExt = '.log';

//rmDir 清除整个目录及自身
rmDir = function (dirPath) {
    try {
        var files = fs.readdirSync(dirPath);
    }
    catch (e) {
        return;
    }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
                console.log(`delete fiel: ${filePath} successs!`);
            }
            else {
                rmDir(filePath);
                console.log(`delete dir: ${filePath}  successs!`);
            }
        }
    fs.rmdirSync(dirPath);
    console.log('delete all success!');
};

//初始化文件信息
if (debugModel) {
    //测试目录
    inputFile = 'log_analysis/charger.log';
    outputPath = 'log_analysis/' + timeMark + '/';
    backLogFile = outputPath + 'back-charger'  + fileExt;

} else {
    //真实目录
    inputFile = '/home/locke-remote/project/release_charger/log/charger.log';
    outputPath = '/home/locke-remote/log_analysis/' + timeMark + '/';
    backLogFile = outputPath + 'back-charger'  + fileExt;
    //不需要过滤直接打出每天存在的设备日志
    // var filterCondition = [18];
}


//创建每天的日志文件夹
//若手动执行命令则删除当天文件夹重新创建
if (fs.existsSync(outputPath)) {
    rmDir(outputPath);
}
fs.mkdirSync(outputPath, (err, folder) => {
    if (err) console.log(err.message);
    console.log(folder);
});

fs.createReadStream(inputFile).pipe(fs.createWriteStream(backLogFile));


let rl = readline.createInterface({
    input: fs.createReadStream(inputFile)
});

//读取当天日志文件
rl.on('line', (line) => {
    //防止出现空行解析错误
    try {
        var data = JSON.parse(line);
        var req = data.rawData && JSON.parse(data.rawData).reqType;
        var mac = data.mac || null;
        var id = data.deviceId || null;
        //定义文件的输出名
        var deviceInfoFile = `${outputPath}${id}_${mac}_${timeMark}${fileExt}`;
        var deviceHeartFile = `${outputPath}${id}_${mac}_${timeMark}_heart${fileExt}`;
        var serverInfoFile = `${outputPath}${timeMark}_server${fileExt}`;

        if (mac && req !== "notifyHeartPackage") {
            var newData = moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss') +
                '\n' + (data.rawData || line) +
                '\n' + (data.message || 'no message').trim() + '\n\n';


            fs.appendFile(deviceInfoFile, newData, function (err) {
                if (err) {
                    console.log('deviceInfoFile 写入失败!')
                }
                console.log('deviceInfoFile 写入成功');
            })
        }
        else if (mac && req === "notifyHeartPackage") {
            newData = moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss') + '\n';


            fs.appendFile(deviceHeartFile, newData, function (err) {
                if (err) {
                    console.log('deviceHeartFile 写入失败!')
                }
                console.log('deviceHeartFile 写入成功');
            })
        }
        else {

            //todo 此处用来过滤服务器信息
            /*      newData = moment(data.timestamp).format('YYYY-MM-DD HH:mm:ss') +
                  '\n' + (data.message || 'no message').trim() + '\n\n';

                  fs.appendFile(serverInfoFile, newData, function (err) {
                      if (err) {
                          console.log('serverInfoFile 写入失败!')
                      }
                      console.log('serverInfoFile 写入成功');
                  })

              }*/
        }
    }
    catch (e) {
        console.log(e.message);
    }
});


//清空日志内容
//todo 暂时关闭 log 清空 log 的函数
// fs.truncate(inputFile, 0, function(){console.log('clear charger.log')})


