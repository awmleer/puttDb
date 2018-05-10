const socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
  console.log('connect');
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
