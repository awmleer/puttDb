'use strict';

var  io = require('socket.io-client');
var serverUrl = 'http://192.168.0.3/';
var conn = io.connect(serverUrl);

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
