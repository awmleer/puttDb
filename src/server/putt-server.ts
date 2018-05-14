import {BehaviorSubject, Subscription} from "rxjs/index";
import * as SocketIO from "socket.io";
import {Server} from "http";
import {DbManager} from "./db-manager";
import {Socket} from "socket.io";
import {ObservableDocument} from "../common/observable-document";



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
        const documentId = data.id;
        let od = this.observableDocumentMap.get(documentId);
        if(!od){
          let doc = await dbManager.findOneById(documentId);
          od = new ObservableDocument(doc);
          this.observableDocumentMap.set(documentId, od);
        }
        const subscription:Subscription = od.deltaStream.subscribe({
          next: (delta) => {
            socket.emit('documentUpdated', {
              delta: delta
            });
          }
        });
        subscriptions.push(subscription);
        console.log(data);
        BehaviorSubject.create();
        callback(od.value);
      });

    });
  }


}