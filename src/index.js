var express = require('express');
var WebSocket = require('ws');
var ShareDB = require('sharedb');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');
var http = require('http');
var path = require('path');

var app = express();

app.use(express.static(path.resolve(process.cwd(), 'dist')));

var server = http.createServer(app);
var webSocketServer = new WebSocket.Server({ server });

var backend = new ShareDB();
webSocketServer.on('connection', webSocket => {
  var stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

server.listen(8080);
