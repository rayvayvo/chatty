const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const PORT = 3001;
const WebSocket = require('ws');


const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

let currentContents = '';
let users = {};

//handle client connects
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log("users online: " + wss.clients.size);

  //notify chatroom that a user has joined
  wss.clients.forEach(function connected(client) {
    let connectAlert = {
      key:uuid(),
      messages: "a new user has joined the channel",
      username: "Server Alert: ",
      type: "incomingNotification",
      active: wss.clients.size,
    }

    client.send(JSON.stringify(connectAlert));
  })

  ws.on('message', handleIncoming)

  //function handles incoming messages to chatroom
  function handleIncoming (incoming) {
    wss.clients.forEach(function each(client) {
      client.send(incoming);
    })
  }

  //handle client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');

    //notify chatroom that a user has left
    wss.clients.forEach(function disconnected(client) {
      let disconnectAlert = {
        key:uuid(),
        messages: "a user has left the channel",
        username: "Server Alert: ",
        type: "incomingNotification",
        active: wss.clients.size,
      }

      client.send(JSON.stringify(disconnectAlert));
    })
  })
})





