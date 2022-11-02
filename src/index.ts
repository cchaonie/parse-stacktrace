import express from 'express';
import { WebSocketServer } from 'ws';
import ShareDB from 'sharedb';
import http from 'http';
import path from 'path';
import WebSocketJSONStream from './utils';

const app = express();

app.use(express.static(path.resolve(process.cwd(), 'dist/client')));

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const backend = new ShareDB();

// const userMapWs = new Map();

webSocketServer.on('connection', webSocket => {
  // webSocket.on('message', data => {
  //   try {
  //     const messageObj = JSON.parse(data.toString());
  //     if (
  //       messageObj.type === 'identity' &&
  //       userMapWs.get(messageObj?.visitorId)
  //     ) {
  //       userMapWs.set(messageObj.visitorId, webSocket);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
