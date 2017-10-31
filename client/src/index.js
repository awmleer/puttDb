'use strict';

var document=null;
// import io from 'socket.io-client';
var serverUrl = 'http://192.168.0.3/';
var socket = require('socket.io-client')(serverUrl);

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
