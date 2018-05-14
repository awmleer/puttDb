import {BehaviorSubject, Subscription} from "rxjs/index";
import * as SocketIO from "socket.io";
import {Server} from "http";
import {DbManager} from "./db-manager";
import {Socket} from "socket.io";


export class PuttServer {
  private io;
  private documentSubjects:{
    [id:string]: BehaviorSubject<Object>
  } = {};

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
        let documentId = data.id;
        let subject = this.documentSubjects[documentId];
        if(!subject){
          let doc = await dbManager.findOneById(documentId);
          subject = new BehaviorSubject<Object>(doc);
          this.documentSubjects[documentId] = subject;
        }
        let subscription:Subscription = subject.subscribe({
          next: (v) => {
            // socket.emit();
            // TODO notify the client
          }
        });
        subscriptions.push(subscription);
        console.log(data);
        BehaviorSubject.create();
        callback(subject.value);

      });

    });
  }


}