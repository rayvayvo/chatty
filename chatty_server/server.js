const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const PORT = 3001;
const WebSocket = require('ws');


// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let currentContents = '';
let users = {};


wss.on('connection', (ws) => {
    console.log('Client connected');
    console.log("users online: " + wss.clients.size);

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

  function handleIncoming (incoming) {

    // var message = JSON.parse(incoming)
    console.log("message recieved: " + incoming);


  wss.clients.forEach(function each(client) {
          client.send(incoming);

  ws.on('close', () => console.log('Client disconnected'));
    });
  }
})





