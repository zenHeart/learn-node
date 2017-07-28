var colors = require('colors/safe');

// set single property 
var error = colors.red;
error('this is red');

// set theme 
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

//output info
//tool function define
function colorPrint(label,msg) {
    //返回剩余参数
    var resideArg = [].slice.call(arguments,2);
    resideArg.unshift(colors[label](msg));
    console.log.apply(this,resideArg);
}

// outputs red text 
colorPrint('error',"this is an error %j",[1,2,4],12);

// outputs yellow text 
colorPrint('warn',"this is a warning");
 