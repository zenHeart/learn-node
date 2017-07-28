/**
 * Created by locke on 2017/2/27.
 */
//var q = require(q);

function squelSync(data,callback) {
    setTimeout(function () {
        if( typeof data != 'number') {
              callback(new Error('must number!'));
        }
        else{
            callback(null,data*data);
        }
    },100)
}

squelSync(1,function (err,result) {
    if(err) {
        throw err;
    }
   console.log(result);
});
