// Import modules In RAW NODE.JS
import http from 'http'; // http module
import os from 'os'; // os module

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Create server
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello, World!</h1>'); // Simple response
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on:`); // Log server is running
  console.log(`➜  Local:   http://localhost:${PORT}/`); // Log local interface

  const networkInterfaces = os.networkInterfaces(); // Get network interfaces

  Object.keys(networkInterfaces).forEach((interfaceName) => {
    // Loop through network interfaces
    networkInterfaces[interfaceName]?.forEach((iface) => {
      // Loop through each interface
      if (iface.family === 'IPv4' && !iface.internal) {
        // Check if interface is IPv4 and not internal
        console.log(`➜  Network: http://${iface.address}:${PORT}/`); // Log network interface
      }
    });
  });
});
