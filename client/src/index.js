'use strict';

var document=null;
// import io from 'socket.io-client';
var serverUrl = 'http://192.168.0.3/';
var net = require('net');

var client = net.connect(6969,"192.168.0.3",
    function() { //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});
client.on('end', function() {
  console.log('disconnected from server');
});

$.ready(function (error) {
    if (error) {
        console.error(error);
        return;
    }else {
        // conn.emit();
        console.log('hahaha');
    }

});

$.end(function () {
    // ...
});
