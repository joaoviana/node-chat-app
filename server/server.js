const path = require('path');
const http = require('http');
//http server
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
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
