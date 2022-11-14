import ReconnectingWebSocket from 'reconnecting-websocket';
import { Connection } from 'sharedb/lib/client';

let connection = null;

export const getShareDBConnection = () => {
  if (connection) return connection;
  const socket = new ReconnectingWebSocket('ws://localhost:8080');
  connection = new Connection(socket);
  return connection;
};
