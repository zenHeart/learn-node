const {Server} = require('net');

const server = new Server();

server.listen({
    port:0,
    host:'localhost',
},function () {
    console.log(server.address());

});


