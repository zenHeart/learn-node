var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('message', (payload,fn) => {
    fn('receive!');
    socket.send(payload, (...args) => {
      console.log('client repond', args)
    });
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});