const nodeDbHandle = require('./mysql_connect');
const util = require('util');

const TABLE = {
        DEVICE: 'device_info', //设备信息表
        OWNER: 'admin_user',  //设备拥有者信息表
        VERSION: 'device_version' //版本信息表
    },
//定义字段常量
    COLUMN = {
        PRIMARY_ID:'id',//所有表的主键 id
        DEVICE_ID: 'device_id',  //引用设备信息表示的外键
        OWNER_ID: 'owner_id',    //引用设备拥有者信息的外键
        VERSION_ID: 'version_id', //引用版本信息的外键
        DEVICE_SN: 'device_sn',   //设备序列号
        OWNER_SN: 'owner_sn',     //设备拥有者序列号
        VERSION_NUMBER: 'version_number',     //设备版本号
        VERSION_SN: 'version_sn',     //设备拥有者序列号
        CREATE_TIME: 'create_time', //创建时间
        EXPIRE_TIME: 'expire_time', //过期时间
        STOP_TIME: 'stop_time', //停止时间
        ACTIVE_TIME: 'active_time', //激活时间
        MAC: 'mac', //设备 mac
        METER_NUMBER: 'meter_number', //电表编号
        AVAILABLE: 'available', //设备使能位，表示该设备是否可用
        ENABLE_BIT: 'available',  //设备使能位
        DESCRP: 'description', //描述信息
        NOTIFY_URL: 'notify_url', //上报的 url 地址
        SIZE: 'size', //文件尺寸单位 B
        CHECKSUM: 'checksum' //crc 16 的文件校验码，
    };




function checkDevice(mac,callback) {

    /*提取注册设备需要保留的信息*/
    /*todo 此处的查询语句过于复杂,后续需要修改该查询语句*/
    //     var getDeviceInfoSql = util.format('SELECT device_id,d1.owner_id,version_sn,notify_url,mac,meter_number,available,expire_time ' +
    //         'FROM info_device AS d1,info_version AS  v1,info_owner AS o1 ' +
    //         'WHERE d1.mac = \'%s\' AND v1.version_id = d1.version_id AND o1.owner_id = d1.owner_id', mac);
    // //todo 设备合法性验证过于复杂需要简化
    var getDeviceInfoSql = `SELECT d1.${COLUMN.PRIMARY_ID} AS ${COLUMN.DEVICE_ID},
                                   d1.${COLUMN.OWNER_ID},${COLUMN.VERSION_SN},${COLUMN.NOTIFY_URL},${COLUMN.MAC},${COLUMN.METER_NUMBER},${COLUMN.AVAILABLE},${COLUMN.EXPIRE_TIME}
                            FROM ${TABLE.DEVICE} AS d1,${TABLE.VERSION} AS v1,${TABLE.OWNER} AS o1
                            WHERE d1.${COLUMN.MAC} = '${mac}' AND v1.${COLUMN.PRIMARY_ID} = d1.${COLUMN.VERSION_ID}
                            AND o1.${COLUMN.PRIMARY_ID} = d1.${COLUMN.OWNER_ID}`;
    // console.log('check sql: ',getDeviceInfoSql);

    nodeDbHandle.query(getDeviceInfoSql, function (error, results, fields) {
        if (error) {
            callback(error);
        }

        if (!results.length) {
            //todo 不要再 log 中传中文,后续需要把状态全部重写为状态码
            callback(new Error('device unauthorized,please register first'));
        } else {
            callback(null, results[0]);
        }

    });

}

checkDevice('121212121212',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
});
checkDevice('121212121112',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
})

checkDevice('121212121212',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
});
checkDevice('121212121112',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
})

checkDevice('121212121212',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
});
checkDevice('121212121112',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
})

checkDevice('121212121212',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
});
checkDevice('121212121112',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
})

checkDevice('121212121212',function (err,result) {
    if(err) {
        console.log(err);
    } else {
        console.log('result:',result);
    }
});
checkDevice('121212121112',function (err,result) {
    if(err) {
        console.log(err.message);
    } else {
        console.log('result:',result);
    }
})

