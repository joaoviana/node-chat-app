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

  //instead of listenting to event, u are creating the event
  //specify any email specs
  // socket.emit('newEmail', {
  //   from: 'jaoovinaa@gmail.com',
  //   text: 'How are you?',
  //   createdAt: 123
  // });

  socket.emit('newMessage', {
    from: 'janetjackson@gmail.com',
    text:'okok, see you then',
    createdAt: 123123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
});

//it calls exact same method as http.createServer
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
