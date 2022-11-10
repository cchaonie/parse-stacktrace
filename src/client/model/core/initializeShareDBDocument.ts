import ReconnectingWebSocket from 'reconnecting-websocket';
import { Doc } from 'sharedb';
import { Connection } from 'sharedb/lib/client';
import { getFingerprint } from '../fingerprint/getFingerprint';
import initialContent from './initialContent';

export const initializeShareDBDocument = () =>
  getFingerprint().then(({ visitorId }) => {
    fetch('/login', {
      method: 'POST',
    })
      .then(res => {
        if (res.ok) {
          console.log(`Visitor: ${visitorId} log in successfully`);
        }
      })
      .catch(e => console.error(e));

    return new Promise<Doc>((resolve, reject) => {
      const socket = new ReconnectingWebSocket('ws://localhost:8080');
      const connection = new Connection(socket);

      const doc = connection.get(visitorId, 'doc-id');

      doc.subscribe(error => {
        if (error) reject(error);

        if (!doc.type) {
          doc.create(initialContent, error => {
            if (error) reject(error);
            resolve(doc);
          });
        } else {
          resolve(doc);
        }
      });
    });
  });
