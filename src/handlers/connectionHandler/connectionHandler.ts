import type ShareDB from 'sharedb';
import { IncomingMessage } from 'http';
import { WebSocket } from 'ws';

import { parseCookie } from '../../common';
import { WebSocketJSONStream } from './WebSocketJSONStream';

const userMap = new Map();

export const connectionHandler =
  (backend: ShareDB) => (webSocket: WebSocket, req: IncomingMessage) => {
    if (req.headers.cookie) {
      const cookieObject = parseCookie(req.headers.cookie);
      if ('uid' in cookieObject) {
        userMap.set((cookieObject as any).uid, webSocket);
      }
    }
    const stream = new WebSocketJSONStream(webSocket);
    backend.listen(stream);
  };
