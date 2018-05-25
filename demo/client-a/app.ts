import {PuttClient} from '../../src/client/putt-client';
import {ObservableDocument, ObservableDocumentChange} from "../../src/common/observable-document";
import * as readline from 'readline';
import {async} from "rxjs/internal/scheduler/async";
import {readDht} from "./modules/dht"
import {Ut} from "./modules/common"

require('source-map-support').install();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  
  rl.question('Please input the document id you would like to subscribe:', async (documentId) => {
    rl.close();
    const putt = new PuttClient('http://120.27.121.63:3000');
    // const putt = new PuttClient('http://localhost:3000');
    await putt.connect();
    const od:ObservableDocument = await putt.subscribe(documentId);
    // console.log(od._value);
    od.changeSubject.subscribe(() => {
      //do something to update LCD
      // console.log('hello');  
    });
    // console.log(od._value);
    while(true) {
      readDht(od, sendDat);
      await Ut.sleep(1000);
    }
  });

})()

function sendDat(res, od) {
  if (res['state'] == 1) {
  //readDht(od, sendDat);
  // return;
    od.value['temperature'] = 25+Math.round(Math.random()*3);
    // od.value['count']['x'] += 1;
    return;
  }

  console.log('temperature:', res['temperature'], '*C');
  console.log('humidity', res['humidity'], '%');
  console.log();
  od.value['temperature'] = res['temperature'];
  // od.value['count']['x'] += 1;
}













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



