import * as socketClient from 'socket.io-client'
import Socket = SocketIOClient.Socket;
import {ObservableDocument, ObservableDocumentChange} from "../common/observable-document";
const jsondiffpatch = require('jsondiffpatch').create();


export class PuttClient {
  socket:Socket;
  endpoint;
  private observableDocumentMap:Map<string,ObservableDocument> = new Map<string,ObservableDocument>();

  constructor(endpoint:string){
    this.endpoint = endpoint;
  }

  connect():Promise<void>{
    this.socket = socketClient.connect(this.endpoint);
    this.socket.on('update', (data) => {
      console.log(data);
      const od = this.observableDocumentMap.get(data.documentId);
      od.applyChange(data.change, false, this.socket);
    });
    this.socket.on('event', function(data){});
    this.socket.on('disconnect', function(){});
    return new Promise(resolve => {
      this.socket.on('connect', () => {
        console.log('connect');
        resolve();
      });
    });
  }

  reconnect(){
    if (this.socket) {
      this.disconnect();
    }
    this.connect();
  }

  disconnect(){
    this.socket.disconnect();
    console.log('socket closed');
  }

  subscribe(id:string):Promise<ObservableDocument>{
    return new Promise(resolve => {
      this.socket.emit('subscribe', {
        documentId: id
      }, (data) => {
        console.log(data);
        const od = new ObservableDocument(data);
        od.changeSubject.subscribe((change:ObservableDocumentChange) => {
          if(change.from == this.socket) return;
          this.socket.emit('update', {
            documentId: od.id,
            change: change
          });
        });
        this.observableDocumentMap.set(id, od);
        resolve(od);
      });
    });
  }

  unsubscribe(id:string):Promise<void>{
    return new Promise(resolve => {
      this.socket.emit('unsubscribe', {
        documentId: '5af42dee0dcefe76670de405'
      }, (data) => {
        console.log(data);
        const od = this.observableDocumentMap.get(id);
        od.changeSubject.complete();
        this.observableDocumentMap.delete(id);
        resolve();
      });
    });
  }

  public getDocument(id:string):ObservableDocument{
    return this.observableDocumentMap.get(id);
  }


}
