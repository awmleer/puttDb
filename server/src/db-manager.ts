// let MongoClient = require('mongodb').MongoClient;

import * as assert from "assert";
import {MongoClient} from "mongodb";

export class DbManager{
  db;
  collection;
  constructor(){
  }

  connect():Promise<void>{
    return new Promise((resolve, reject) => {
      MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
        assert.equal(null, err);
        console.log("Connected successfully to server");
        this.db = client.db('putt');
        this.collection = this.db.collection('test');
        // collection.find(mongodb.ObjectID('5af42dee0dcefe76670de405')).toArray((err, docs) => {
        //   console.log(docs);
        // });
        resolve();
      });
    });
  }
}