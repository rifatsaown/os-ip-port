import express, { type Application, type Request, type Response } from 'express';
import os from 'os';

const app:Application = express();
const PORT:number = Number(process.env.PORT) || 3000;

app.get('/', (_:Request, res:Response) => {
  res.send('Hello World');
});

app.get('/api/v1/health', (_:Request, res:Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
  });
});

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
