import os from 'os';
import { exec , spawn} from 'child_process';

const restart = () => {
    if (os.platform() === 'win32') {
        exec('shutdown /r /t 0');
    } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
        exec('sudo shutdown -r now');
    } else {
        throw new Error('Unsupported operating system');
    }
}

const shutdown = () => {
    if (os.platform() === 'win32') {
        exec('shutdown /s /t 0');
    } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
        exec('sudo shutdown -h now');
    } else {
        throw new Error('Unsupported operating system');
    }
}

export {
    restart,
    shutdown
}
