import express from 'express';
import os from 'os';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
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
