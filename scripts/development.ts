import { watch } from 'rollup';
import { spawn } from 'child_process';
import options from '../rollup.config';
import path from 'path';

const ROOT_DIR = process.cwd();

const [serverOptions, clientOptions] = options;

const runWatch = (option, callback) => {
  const watcher = watch(option);
  watcher.on('event', event => {
    if (event.code === 'START') {
      console.log('Detecting changes');
    }
    if (event.code === 'BUNDLE_START') {
      console.log('Detecting changes');
    }
    if (event.code === 'BUNDLE_END') {
      event.result.close();
      callback();
    }
    if (event.code === 'ERROR') {
      throw event.error;
    }
  });
};

let devServer = null;

runWatch(serverOptions, () => {
  if (devServer) {
    devServer.kill();
  }

  devServer = spawn('node', [path.resolve(ROOT_DIR, 'dist/index.js')]);

  console.log(`[SERVER] building success`);

  devServer.stdout.on('data', data => console.log(data.toString().trim()));

  devServer.stderr.on('data', data => {
    console.error(data.toString().trim());
  });

  devServer.on('error', err => {
    console.error(err, 'Failed to start child process.');
  });
});

runWatch(clientOptions, () => console.log(`[CLIENT] building success`));
