'use strict';

import io from 'socket.io-client';
var serverUrl = 'http://192.168.0.3/';
const socket = io(serverUrl);

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
