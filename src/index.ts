import express, { json } from 'express';
import http from 'http';
import path from 'path';

import { parseRoute } from './routers';

const app = express();

app.use(json());

console.log(path.resolve(__dirname, '../dist/client'))

app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.use(parseRoute);

const server = http.createServer(app);

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
