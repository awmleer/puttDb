import {PuttClient} from '../../src/client/putt-client';
import {ObservableDocument, ObservableDocumentChange} from "../../src/common/observable-document";

require('source-map-support').install();

const putt = new PuttClient('http://localhost:3000');
putt.connect().then(() => {
  putt.subscribe('5af42dee0dcefe76670de405').then((od: ObservableDocument) => {
    // od.value['a'] = 2;
    console.log(od._value);
  });
});