import express from 'express';
import { WebSocketServer } from 'ws';
import ShareDB from 'sharedb';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import { cookieMiddleware } from './middleware';
import { connectionHandler } from './handler';

const app = express();

app.use(express.static(path.resolve(process.cwd(), 'dist/client')));

app.post('/login', (_, res) => {
  res.end('OK');
});

app.use(cookieParser());

app.use(cookieMiddleware);

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const backend = new ShareDB();

webSocketServer.on('connection', connectionHandler(backend));

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
