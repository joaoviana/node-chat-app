const path = require('path');
const http = require('http');
//http server
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
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


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }

    socket.join(params.room);
    //socket.leave(params.room);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


    //io.emit

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords)=> {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
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
