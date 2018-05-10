const socket = require('socket.io-client')('http://localhost:3000');
const jsondiffpatch = require('jsondiffpatch').create();

socket.on('connect', function(){
  console.log('connect');
  socket.emit('subscribe', {
    documentId: '5af42dee0dcefe76670de405'
  }, (data) => {
    console.log(data);
  });
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

