import {PuttClient} from '../../src/client/putt-client';
import {ObservableDocument, ObservableDocumentChange} from "../../src/common/observable-document";
import * as readline from 'readline';
import {async} from "rxjs/internal/scheduler/async";

require('source-map-support').install();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please input the document id you would like to subscribe:', async (documentId) => {
  rl.close();
  const putt = new PuttClient('http://120.27.121.63:3000');
  // const putt = new PuttClient('http://localhost:3000');
  await putt.connect();
  const od:ObservableDocument = await putt.subscribe(documentId);
  console.log(od._value);
  od.value['temperature'] = 20;
  od.value['count']['x'] += 1;
  od.changeSubject.subscribe(() => {
    //do something to update LCD
  });
  console.log(od._value);
});







// let od = new ObservableDocument({
//   temperature: 1,
//   count: {
//     a: 0,
//     b: 0
//   }
// });
//
// console.log(od.value);
//
// let subscription = od.changeSubject.subscribe((change:ObservableDocumentChange)=>{
//   console.log(change);
// });
//
// od.value['count']['b'] = 2;
// console.log(od.value);



