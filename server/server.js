const path = require('path');
const http = require('http');
//http server
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
//creating server with http
var server = http.createServer(app);
//ready to accept new connections
var io = socketIO(server);

//config static midware
app.use(express.static(publicPath));

//registers an event listener
//listens for a new connection, and do something after that
//persistent technology, client an server both keep the communication channel open, as long as they want to
//when connection drops, client is gonna start to reconnect
io.on('connection' , (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat App',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    //socket.emit sends event to a single connection. io.emit send s to all connections
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    //to broadcast, we need to specify the individual socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
});

//broadcasting is the term for emiting an event to evrybody but one specific user

//it calls exact same method as http.createServer
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
