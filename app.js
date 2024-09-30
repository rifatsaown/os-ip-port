const WebSocket = require('ws');

// Create a websocket server that will listen to the port 9000
const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', (ws, req) => {
  console.log(`New connection from ${req.socket.remoteAddress}`);
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server!');
});
wss.on('listening', () => {
  console.log('WebSocket server is listening on port 9000');
});
wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});
// Keep the Node.js process running
process.on('SIGINT', () => {
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});
