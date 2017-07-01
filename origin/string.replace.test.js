/**
 *
 * Created by lockepc on 2017/6/20.
 */
var data = [];
var format = /%a|%D|%c|%d|%e|%f|%g/g;
var formatString = '%b%c%d%e-%f%g%a'.replace(format, function (match) {
    switch (match) {
        case '%c' :
            data.push('clientIp');
            break;
        case '%d' :
            data.push('respTime');
            break;
        case '%l' :
            data.push('c');
            break;
        case '%d' :
            data.push('d');
            break;
        case '%e' :
            data.push('e');
            break;
        case '%f' :
            data.push('f');
            break;
        default:return;
    }
    return data;
});

console.log(data);