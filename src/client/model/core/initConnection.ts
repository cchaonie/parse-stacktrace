import ReconnectingWebSocket from 'reconnecting-websocket';
import { Connection } from 'sharedb/lib/client';

export const initConnection = () => {
  const socket = new ReconnectingWebSocket('ws://localhost:8080');
  return new Connection(socket);
};
