import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });



wss.on('connection', function connection(ws) {
  console.log('Se a conectado '+ wss.clients.size);
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('Te has conectado al servidor juju');
});