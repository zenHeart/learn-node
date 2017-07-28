/**
 * Created by lockepc on 2017/6/22.
 */
var sessionManage = require('../../tool/session_manage');
var sysConst = require('../../config/sys.conf');

var sessionId = sessionManage.create();
sessionManage.on('destroy',function (data) {
    console.log(data);
});

sessionManage.destroy(sessionId,{status:20,respData:'hdf'});


