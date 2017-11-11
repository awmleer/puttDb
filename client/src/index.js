'use strict';

var document=null;
var serverUrl = 'http://192.168.0.3/';
var net = require('net');

var testData;

var connection = net.connect(3001,"192.168.0.3", function(){ //'connect' listener
    console.log('connected to server!');
    // connection.write('world!\r\n');
    sendToServer('requestInit',null);
});

connection.on('data', function(data) {
    console.log('--------------');
    console.log('Got data');
    console.log(data.toString());
    var obj = JSON.parse(data.toString());
    if(obj.meta=='init'){
        testData=obj.payload;
        console.log('--------------');
        console.log('testData inited');
        console.log(testData);
    }else if(obj.meta=='change'){
        // jsondiffpatch.
    }
});

// connection.end();

connection.on('end', function() {
    console.log('disconnected from server');
});

function sendToServer(meta, payload){
    connection.write(JSON.stringify({
        meta: meta,
        payload: payload
    }));
}

$.ready(function (error) {
    if (error) {
        console.error(error);
        return;
    }

});

$.end(function () {
    // ...
});
