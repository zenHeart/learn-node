/**
 * Created by locke on 2017/3/29.
 */
/************调试 socket.io*/
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);



server.listen(11110, function () {
    console.log('dfdfdf');
});


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/socket.io.test.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
