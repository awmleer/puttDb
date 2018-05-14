import * as express from "express";import {DbManager} from "../../src/server/db-manager";import * as http from 'http';import {PuttServer} from "../../src/server/putt-server";const app = express();const httpServer = new http.Server(app);const jsondiffpatch = require('jsondiffpatch').create();const HOST = '0.0.0.0';const PORT = 3000;let dbManager = new DbManager();dbManager.connect().then(() => {  let puttServer = new PuttServer(httpServer, dbManager);});app.get('/', function (req, res) {  res.send('Hello World!');});httpServer.listen(PORT, HOST, function () {  console.log('Example app listening on port 3000!');});