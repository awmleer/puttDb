import {PuttClient} from '../../src/client/putt-client';
import {ObservableDocument} from "../../src/common/observable-document";

require('source-map-support').install();

// const putt = new PuttClient('http://localhost:3000');

let od = new ObservableDocument({
  a: 1
});

// console.log(od);

// console.log(JSON.stringify(od.value));
console.log(od.value);
//
// let x = od.value;
// x['a'] = {
//   b: 2
// };
//
// console.log(od.value);



