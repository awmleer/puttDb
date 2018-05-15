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
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('update', (data) => {
      console.log(data);
      const od = this.observableDocumentMap.get(data.documentId);

    });
    this.socket.on('event', function(data){});
    this.socket.on('disconnect', function(){});
    this.connect();
  }

  connect(){
    this.socket = socketClient(this.endpoint);
  }

  subscribe(id:string):Promise<void>{
    return new Promise(resolve => {
      this.socket.emit('subscribe', {
        documentId: '5af42dee0dcefe76670de405'
      }, (data) => {
        console.log(data);
        const od = new ObservableDocument(data);
        od.changeSubject.subscribe((change:ObservableDocumentChange)=>{
          od.applyChange(change);
        });
        this.observableDocumentMap.set(id, od);
        resolve();
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
