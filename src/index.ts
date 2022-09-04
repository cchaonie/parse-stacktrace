import express from 'express';
import { WebSocketServer } from 'ws';
import ShareDB from 'sharedb';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';
import http from 'http';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(process.cwd(), 'dist/client')));

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const backend = new ShareDB();
webSocketServer.on('connection', webSocket => {
  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
