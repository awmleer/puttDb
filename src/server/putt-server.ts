import {BehaviorSubject, from, Subscription} from "rxjs/index";
import * as SocketIO from "socket.io";
import {Server} from "http";
import {DbManager} from "./db-manager";
import {Socket} from "socket.io";
import {ObservableDocument, ObservableDocumentChange} from "../common/observable-document";



export class PuttServer {
  private io;
  private observableDocumentMap:Map<string,ObservableDocument> = new Map<string,ObservableDocument>();

  constructor(httpServer: Server, private dbManager:DbManager){
    this.io = SocketIO(httpServer);
    this.io.on('connection', (socket:Socket) => {
      console.log('a user connected');
      let subscriptions:Subscription[] = [];

      socket.on('disconnect', () => {
        console.log('user disconnected');
        for(let subscription of subscriptions){
          subscription.unsubscribe();
        }
      });

      socket.on('subscribe', async (data, callback) => {
        const documentId = data.documentId;
        let od = this.observableDocumentMap.get(documentId);
        if(!od){
          let doc = await dbManager.findOneById(documentId);
          console.log(doc);
          od = new ObservableDocument(doc);
          this.observableDocumentMap.set(documentId, od);
        }
        const subscription:Subscription = od.changeSubject.subscribe({
          next: (change:ObservableDocumentChange) => {
            if(change.from == socket) return;
            socket.emit('update', {
              documentId: od.id,
              change: change
            });
          }
        });
        subscriptions.push(subscription);
        BehaviorSubject.create();
        callback(od._value);
      });

      socket.on('unsubscribe', (data, callback) => {
        const od = this.observableDocumentMap.get(data.documentId);
        od.changeSubject.complete();
        this.observableDocumentMap.delete(data.documentId);
      });

      socket.on('update', (data, callback) => {
        const od = this.observableDocumentMap.get(data.documentId);
        od.applyChange(data.change, false, socket);
        // socket.broadcast.emit('update', data);
      });

    });
  }


}