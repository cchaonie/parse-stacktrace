import ReconnectingWebSocket from 'reconnecting-websocket';
import { Connection } from 'sharedb/lib/client';

const socket = new ReconnectingWebSocket('ws://localhost:8080');
const connection = new Connection(socket);

const doc = connection.get('doc-collection', 'doc-id');

doc.subscribe(error => {
  if (error) return console.error(error);

  // If doc.type is undefined, the document has not been created, so let's create it
  if (!doc.type) {
    doc.create({ counter: 0 }, error => {
      if (error) console.error(error);
    });
  }
});

doc.on('op', op => {
  console.log('count', doc.data.counter);
});
