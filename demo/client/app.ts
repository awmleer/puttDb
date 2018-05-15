import {PuttClient} from '../../src/client/putt-client';
import {ObservableDocument, ObservableDocumentChange} from "../../src/common/observable-document";

require('source-map-support').install();

// const putt = new PuttClient('http://localhost:3000');

let od = new ObservableDocument({
  temperature: 1,
  count: {
    a: 0,
    b: 0
  }
});

// console.log(od);

// console.log(JSON.stringify(od.value));
console.log(od.value);

let subscription = od.changeSubject.subscribe((change:ObservableDocumentChange)=>{
  console.log(change);
});

od.value['count']['b'] = 2;
console.log(od.value);
//
// let x = od.value;
// x['a'] = {
//   b: 2
// };
//
// console.log(od.value);



