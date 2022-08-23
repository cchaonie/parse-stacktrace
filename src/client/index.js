var ReconnectingWebSocket = require('reconnecting-websocket');
var Connection = require('sharedb/lib/client').Connection;

var socket = new ReconnectingWebSocket('ws://localhost:8080');
var connection = new Connection(socket);

var doc = connection.get('doc-collection', 'doc-id');

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

window.increment = () => {
  // Increment the counter by 1
  doc.submitOp([{ p: ['counter'], na: 1 }]);
};
