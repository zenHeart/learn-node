/**
 * Created by locke on 2017/3/24.
 */
var fs = require('fs');
var outputPath = 'output/' ;
var moment = require('moment');
var timePre = moment().format('YYYY-MM-DD');


console.log(fs.readdirSync('../../src/device/interface'));

/*

rmDir = function(dirPath) {
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
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
};


/!*
fsTest.stat('test.bin',function (err,data) {
    if(err) {
        console.log(err);
    }else{
        console.log(data);
    }
});


var files = fsTest.readdirSync(outputPath);
console.log(files);
*!/
var dirName  = outputPath+timePre;
if(fs.existsSync(dirName)) {
    rmDir(dirName);
}
fs.mkdirSync(dirName,(err,folder) => {
    if(err) console.log(err.message);
    console.log(folder);
});*/
