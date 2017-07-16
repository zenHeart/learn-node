var async = require('async');
function asyncSquare(arg1, callback) {
    setTimeout(function () {
        if (typeof arg1 !== 'number') {
            callback(new Error('input must number!'));
        } else {
            callback(null, arg1 * arg1);
        }
    }, 10);
}

function asyncDiv(arg1,arg2,callback) {
    setTimeout(function () {
        if(arg2 >= 100) {
            callback(new Error('input overflow!'));
        }
        else  {
            callback(null,arg2/arg1);
        }
    },20);
}

function step1(arg1, callback) {
    asyncSquare(arg1, function (err, result) {
        if (err) {
            console.log('任务 1 执行失败');
            callback(err);

        } else {
            try {
                console.log('任务 1 执行成功');
                callback(null, arg1,result);
            } catch(e) {
                console.log('捕获任务 2 的失败!');
                callback(e);
            }

        }
    });
}

function step2(arg1,arg2,callback) {
    asyncDiv(arg1,arg2,function (err,result) {
        if(err) {
            console.log('任务 2 执行失败!');
            callback(err);
        }  else {
            console.log('任务 2 执行成功!');
            throw new Error('df');
            callback(null,result);
        }

    });
}
//todo 测试重读调用回调的原因
function processResult(err,result) {
    if(err) {
        console.log({errMsg:err.message});
    } else {
        console.log({result:result})
    }
}

async.waterfall([
    function (callback) {
        callback(null,9)
    },
    step1,
    step2,
],processResult);

/*

function step1(arg1, callback) {
    asyncSquare(arg1, function (err, result) {
        if (err) {
            console.log('任务 1 执行失败');
            callback(err);

        } else {
            console.log('任务 1 执行成功');
            callback(null, arg1,result);
        }
    });
}

function step2(arg1,arg2,callback) {
    asyncDiv(arg1,arg2,function (err,result) {
       if(err) {
           console.log('任务 2 执行失败!');
           callback(err);
       }  else {
           console.log('任务 2 执行成功!');
           callback(null,result);
       }

    });
}

function processResult(err,result) {
    if(err) {
        console.log({errMsg:err.message});
    } else {
        console.log({result:result})
    }
}

async.waterfall([
    function (callback) {
        callback(null,9)
    },
    step1,
    step2,
],processResult);*/

// *
//  * Created by locke on 2017/2/28.

/*function asyncSquare(number, callback) {
    if (typeof number != 'number') {
        callback(new Error('input must number!'),12);
    }
    else {
        callback(null, number * number);
    }
}

function asyncDevide2(number, callback) {
    if (typeof number != 'number') {
        callback(new Error('input must number!'));
    }
    else {
        callback(null, number / 2);
    }
}

async.waterfall([
    function (callback) {
        callback(null, 'a');
    },
    asyncSquare,
    asyncDevide2
], function (err, result) {
    if (err) {
        console.log(err);
        console.log(result);
    }
    else {

    console.log(result);
    }

});*/

// async.waterfall([
//     async.apply(asyncSquare, 12),
//     asyncDevide2
// ], function (err, result) {
//     if (err) console.log(err);
//     console.log(result);
//
// });?