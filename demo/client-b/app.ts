import {PuttClient} from '../../src/client/putt-client';
import {ObservableDocument, ObservableDocumentChange} from "../../src/common/observable-document";
import * as readline from "readline";

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
});

