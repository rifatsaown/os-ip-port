import http from 'http'; // Changed from express to http
import os from 'os';

const PORT = 3000;

const server = http.createServer((req, res) => { // Create server
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello, World!</h1>'); // Simple response
});

server.listen(PORT, () => {
  console.log(`Server is running on:`);
  const networkInterfaces = os.networkInterfaces();
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName]?.forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`➜  Network: http://${iface.address}:${PORT}/`);
      }
    });
  });

  console.log(`➜  Local:   http://localhost:${PORT}/`);
});