const WebSocket = require('ws');
var port = process.env.PORT || 5000

const wss = new WebSocket.Server({port:port});

wss.broadcast = function (data){
  wss.clients.forEach(function each(client){
    if (client.readyState === 1){
      client.send(data);
    }
  })
}

wss.on('connection', function connection(ws){
  ws.on('message', function incoming(message){
    console.log('Received: %s', message);
    wss.broadcast(message);
  });

  console.log('Connection established!');
});
