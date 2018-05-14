import * as socketClient from 'socket.io-client'
import Socket = SocketIOClient.Socket;
const jsondiffpatch = require('jsondiffpatch').create();


export class PuttClient {
  socket:Socket;
  endpoint;

  constructor(endpoint:string){
    this.endpoint = endpoint;
    this.socket.on('connect', () => {
      console.log('connect');
      this.socket.emit('subscribe', {
        documentId: '5af42dee0dcefe76670de405'
      }, (data) => {
        console.log(data);
      });
    });
    this.socket.on('event', function(data){});
    this.socket.on('disconnect', function(){});
    this.connect();
  }

  connect(){
    this.socket = socketClient(this.endpoint);
  }



}
