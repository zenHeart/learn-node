/**
 * Created by locke on 2017/3/24.
 */
var fs = require('fs');
var path = require('path');
var outputPath = 'output/' ;

fs.renameSync(path.resolve('demo'),path.resolve('.'))
// fs.renameSync(path.resolve('demo'),'.')
// fs.renameSync('demo','ha')