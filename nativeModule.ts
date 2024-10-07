import { exec } from 'child_process';
import os from 'os';

const restart = () => {
  if (os.platform() === 'win32') {
    exec('shutdown /r /t 0');
  } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
    exec('sudo shutdown -r now');
  } else {
    throw new Error('Unsupported operating system');
  }
};

const shutdown = () => {
  if (os.platform() === 'win32') {
    exec('shutdown /s /t 0');
  } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
    exec('sudo shutdown -h now');
  } else {
    throw new Error('Unsupported operating system');
  }
};

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName of Object.keys(interfaces)) {
    const iface = interfaces[interfaceName]?.find(
      (iface) => iface.family === 'IPv4'
    );
    if (iface) {
      return iface.address;
    }
  }
};

const getCPUUsage = () => {
  const cpus = os.cpus();
  const total = cpus.reduce(
    (acc, cpu) =>
      acc +
      cpu.times.user +
      cpu.times.nice +
      cpu.times.sys +
      cpu.times.irq +
      cpu.times.idle,
    0
  );
  const usage = cpus.reduce(
    (acc, cpu) =>
      acc +
      cpu.times.user +
      cpu.times.nice +
      cpu.times.sys +
      cpu.times.irq +
      cpu.times.idle,
    0
  );
  return usage / total;
};

const getMemoryUsage = () => {
  const total = os.totalmem();
  const free = os.freemem();
  return (total - free) / total * 100;
};

console.log(getMemoryUsage());

export { getCPUUsage, getIPAddress, getMemoryUsage, restart, shutdown };
