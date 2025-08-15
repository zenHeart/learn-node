import net from 'node:net';
// Create a TCP server
const server = net.createServer(socket => {
  socket.write('Hello from server!\n');
  socket.on('data', data => {
    console.log(`Client says: ${data.toString()}`);
  });
  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});
// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});