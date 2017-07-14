/**
 * Created by locke on 2017/3/24.
 */
var moment = require('moment');

console.log(moment().format("YYYY-MM-DD"));
console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
console.log(moment().add(365, 'd').format("YYYY-MM-DD HH:mm:ss"));

console.log(moment().format());
console.log(moment(moment().format()).format('YYYY-MM-DD HH:mm:ss'));

console.log(moment('12:23:12','H:m:s'));
console.log(moment('9:3:2','H:m:s'));

console.log(moment('5.1 12:23:12','M.D H:m:s'));
console.log(moment.duration(212323,'ms').humanize());
console.log(moment.duration(23,'ms').humanize());