var winston = require('winston');
var moment = require('moment');
var sysConst = require('../../config/sys.conf.js');

var myCustomLevels = {
    levels: {
        error: 0, //错误信息
        warn: 1, //警告信息
        access: 2, //获取记录
        debug: 3, //调试信息
        info: 4 //其他冗余信息
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        access: 'green',
        debug: 'blue',
        info: 'cyan'
    }
};


var chargerLog = new (winston.Logger)({
        levels: myCustomLevels.levels,
        colors: myCustomLevels.colors,
        exceptionHandlers: [
            new winston.transports.File({
                timestamp: function () {
                    return moment().format();
                },
                filename: sysConst.EXCEPTION_PATH
            })
        ],
        /*在运行出现错误时不退出服务*/
        exitOnError: false,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                colorize: true,
                prettyPrint: true,
                handleExceptions: true,
                timestamp: function () {
                    return moment().format('YYYY-M-D H:m:s.SSS');
                }
            }),
            new winston.transports.File({
                level: sysConst.LOG_LEVEL,
                filename: sysConst.LOG_PATH,
                colorize: true,
                timestamp: function () {
                    return moment().format('YYYY-M-D H:m:s.SSS');
                }

            })
        ]
    }
);

chargerLog.cli();

var customLevelLogger = new (winston.Logger)({levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            colorize: true,
            prettyPrint: true,
            handleExceptions: true,
            timestamp: function () {
                return moment().format('YYYY-M-D H:m:s.SSS');
            }
        }),
        new winston.transports.File({
            level: 'access',
            label: 'error-log',
            filename: sysConst.ERROR_PATH,
            colorize: true,
            timestamp: function () {
                return moment().format('YYYY-M-D H:m:s.SSS');
            }

        })/*,
        new winston.transports.File({
            level: 'access',
            label: 'access-log',
            filename: sysConst.ACCESS_LOG,
            colorize: true,
            timestamp: function () {
                return moment().format('YYYY-M-D H:m:s.SSS');
            }

        })*/]

});

//打印 log 日志
var accessLog  = new (winston.Logger)({levels: myCustomLevels.levels,
    colors: myCustomLevels.colors,
    transports: [
        new winston.transports.File({
            level: 'access',
            logstash:false,
            filename: sysConst.ACCESS_LOG,
            json:false,
            formatter:function (data) {
                return data.level;
            },
            colorize: true,
            timestamp: function () {
                return moment().format('YYYY-M-D H:m:s.SSS');
            }

        })]
}).access;




//必须自定义 log 格式,方便后续处理
//可以通过定义多个不同的 transport 来分散不同级别的 log
accessLog('dsf', 'df');

customLevelLogger.error('dsf','df');
