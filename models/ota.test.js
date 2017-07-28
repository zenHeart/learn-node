/**
 * Created by lockepc on 2017/6/27.
 */
var fs = require('fs');
var async = require('async');
const crc = require('crc');

var filename = process.cwd() + '/../../ota/2bcd6c4bb4a460421a01f89b33e3f25d';

var chargerLog = require('../../tool/log');


function readBlock(filename, offset,size,cb) {
    async.waterfall([
            function (cb) {
                cb(null, filename);
            }, getFd,
            getBuffer],
        function (err, result) {
            if (err) {
                cb(err);
            }
            else {
                cb(err, result)
            }
        }
    );

    function getFd(filename, cb) {
        fs.open(filename, 'r', function (err, fd) {
            if (err) {
                cb(err);
            } else {
                cb(null, fd);
            }
        })
    }


    function getBuffer(fd,cb) {
        //important[locke] 这个地方的 buffer 应用会不会溢出
        var buffer = new Buffer(size);

        fs.read(fd, buffer, 0, size, offset, function (err, num) {
            if (err) {
                return cb(err);
            }

            if (size > num) {
                chargerLog.warn('read file size over origin file', {
                    start: offset,
                    length: size,
                    realLength: num
                });
                buffer = buffer.slice(0, num);
            }

            var checkSum = crc.crc16(buffer);
            chargerLog.debug('read file block success', {
                start: offset,
                end: offset + num,
                size: num,
                d:fd,
                checkSum: checkSum.toString(16)
            });
            cb(null,[checkSum, buffer]);
        });
    }
}

function readBlockStream(filename, offset,size,cb) {
    const rr = fs.createReadStream(filename);
    chunk = rr.read(size);
   cb(null,chunk);

}
const NS_PER_SEC = 1e9;
const time1 = process.hrtime();

readBlockStream(filename, 0, 2048,function (err, result) {
    if (err) {
        chargerLog.error(err.message);
    } else {
        const diff = process.hrtime(time1);
        console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
        console.log(result);
    }
} );

const time2 = process.hrtime();

readBlock(filename, 0, 2048, function (err, result) {
    if (err) {
        chargerLog.error(err.message);
    } else {
        const diff = process.hrtime(time2);
        console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
        console.log(result);
    }
});

