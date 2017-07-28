/**
 * Created by lockepc on 2017/4/20.
 */
var schedule = require('node-schedule');

var j = schedule.scheduleJob({hour:8,minute:56,second:1}, function(){
    console.log('The answer to life, the universe, and everything!');
});

var f = schedule.scheduleJob('0 3 9 * * *', function(){
    console.log('The answer to life, the universe, and everything!');
});