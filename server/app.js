const express = require('express');const app = express();const net = require('net');const HOST = '0.0.0.0';const PORT = 3001;let mongodb = require('mongodb');let MongoClient = require('mongodb').MongoClient  , assert = require('assert');let db;let collection;// Use connect method to connect to the ServerMongoClient.connect('mongodb://localhost:27017/putt', (err, newDb)=>{  assert.equal(null, err);  console.log("Connected correctly to mongodb server");  db=newDb;  collection=db.collection('putt');// db.close();});// Create a server instance, and chain the listen function to it// The function passed to net.createServer() becomes the event handler for the 'connection' event// The sock object the callback function receives UNIQUE for each connectionconst server = net.createServer(function(connection) {  // We have a connection - a socket object is assigned to the connection automatically  console.log('CONNECTED: ' + connection.remoteAddress +':'+ connection.remotePort);  // Add a 'data' event handler to this instance of socket  connection.on('data', function(data) {    // console.log('DATA ' + connection.remoteAddress + ': ' + data);    // Write the data back to the socket, the client will receive it as data from the server    // connection.write('You said "' + data + '"');    console.log('--------------');    console.log('Got data');    console.log(data.toString());    let obj = JSON.parse(data.toString());    if (obj['meta']==='requestInit') {      collection.findOne({        _id:mongodb.ObjectID("5a043060f6dff313c0fd10d7")      }).then((document) => {        console.log('--------------');        console.log('Queried from database');        console.log(document);        connection.write(JSON.stringify({          meta: 'init',          payload: document        }));        console.log('--------------');        console.log('Data sent to client');        console.log({          meta: 'init',          payload: JSON.stringify(document)        });      });    }  });  // Add a 'close' event handler to this instance of socket  connection.on('close', function(hadError) {    if (hadError) {      console.log('Closed due to a transimission error');    }    console.log('CLOSED: ' + connection.remoteAddress +' '+ connection.remotePort);  });});server.on('error',(err)=>{  throw err;});server.listen(PORT, HOST);app.get('/', function (req, res) {  res.send('Hello World!');});app.listen(3000, '0.0.0.0', function () {  console.log('Example app listening on port 3000!');});