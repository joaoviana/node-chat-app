//load when we load the html

// <!--method available initiates the request-->
var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'janet@gmail.com',
  //   text: 'HI! this is joao'
  // });

  socket.emit('createMessage', {
    from: 'Joao',
    text: 'that is great thank you'
  })
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });



socket.on('newMessage', function(message) {
  console.log('New message', message);
});
