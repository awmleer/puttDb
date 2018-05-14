export class DbManager{
  db;
  collection;
  constructor(){
    let mongodb = require('mongodb');
    let MongoClient = require('mongodb').MongoClient;
    let assert = require('assert');

    MongoClient.connect('mongodb://localhost:27017', (err, client)=>{
      assert.equal(null, err);
      console.log("Connected successfully to server");
      this.db = client.db('putt');
      this.collection = db.collection('test');
      // collection.find(mongodb.ObjectID('5af42dee0dcefe76670de405')).toArray((err, docs) => {
      //   console.log(docs);
      // });
    });
  }

  connect(){
    return new Promise()
  }
}