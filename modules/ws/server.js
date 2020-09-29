const WebSocket = require ('ws');
const PORT = process.env.PORT || 8000;

const wss = new WebSocket.Server (
  {
    port: PORT,
  },
  function () {
    console.log (`listen on ${PORT}`);
  }
);

wss.on ('connection', function (ws) {
  ws.on ('message', function (msg) {
    console.log('received', msg);
    ws.send(msg);
  });
});
