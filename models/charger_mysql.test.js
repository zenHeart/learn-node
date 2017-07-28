var chargerSql = require('../../tool/db');
var sysConst = require('../../config/sys.conf');
var assert = require('assert');
var crypto = require('crypto');
var crc = require('crc');


var url = 'https://www.np111m11j1s1.com/pa1ckag1e/';

var binContent = 'demo';
var testData = {
    owner1:{
        data:{
            notify_url:url,
            owner_sn:createMd5
            (url),
            description:'test'
        }
    },
    checkIdExist:{
        ownerId1:[20],
        ownerId2:[2]
    },
    saveVersion:{
        data:{
            [sysConst.COLUMN.DESCRP]: 'test',
            [sysConst.COLUMN.VERSION_SN]: createMd5(binContent),
            [sysConst.COLUMN.CHECKSUM]: crc.crc16(binContent),
            [sysConst.COLUMN.SIZE]: binContent.length
        }
    },
    getDeviceInfo:{
        successId:3,
        failId:290},
    checkDevice:{
        mac1:"121212121212"
    }

}

function createMd5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

chargerSql.checkDevice(testData.checkDevice.mac1,function (e,result) {
    if(e) console.log(e);
    else {
        console.log('success: ',result);
    }

});
// chargerSql.getDeviceInfo(testData.getDeviceInfo.failId,function (e,result) {
//     if(e) console.log(e);
//     else {
//         console.log('successId: ',result);
//     }
//
// })

/*chargerSql.saveVersionInfo(testData.saveVersion.data,function (e,result) {
    if(e) console.log(e);
    else {
        console.log('ownerId1: ',result);
    }

})*/
/*
chargerSql.checkIdExist(testData.checkIdExist.ownerId1,function (e,result) {
        if(e) console.log(e);
    else {
        console.log('ownerId1: ',result);
    }

})

chargerSql.checkIdExist(testData.checkIdExist.ownerId2,function (e,result) {
        if(e) console.log(e);
    else {
        console.log('ownerId2: ',result[0]['count(*)']);
    }

})

*/


// chargerSql.saveOwnerInfo(testData.owner1.data,function (e,result) {
//     if(e) console.log(e);
//     else {
//         console.log(result);
//     }
//
// });

// chargerSql.createManagerId({
//     description: 'tesdjdddffkdslljkft',
//     notify_url: 'dudsdddrl'
// }, function (err, result) {
//     if (err) {
//        console.log(err)
//     }
//     else {
//        console.log(result)
//     }
// });

// chargerSql.deleteManagerId(5, function (err, result,fildes) {
//     if (err) {
//        console.log(err)
//     }
//     else {
//        console.log(result,fildes)
//     }
// });

// chargerSql.correctManagerId(10, {
//     description: '描述电费信息',
//     notify_url: '测试 url'
// },function (err, result,fildes) {
//     if (err) {
//        console.log(err)
//     }
//     else {
//        console.log(result,fildes)
//     }
// });


// describe('chargerSql', function (done) {
//     describe('createManagerId()', function () {
//         it('should insert fail!', function (done) {
//             chargerSql.createManagerId({
//                 description: 'tesdjddffkdslljkft',
//                 notify_urq: 'url'
//             }, function (err, result) {
//                 if (err) {
//                     expect(err).to.be.an('object');
//                     done();
//                 }
//                 else {
//                     done(new Error('fail'));
//                 }
//
//             });
//         });
//
//         it('should insert success!', function () {
//             chargerSql.createManagerId({
//                 description: 'tesdjddffkdslljkft',
//                 notify_url: 'url'
//             }, function (err, result) {
//                 if (err) {
//                     done(err);
//                 }
//                 else {
//                     expect(result).to.be.an('array');
//                     done();
//                 }
//
//             });
//         });
//     });
// });


