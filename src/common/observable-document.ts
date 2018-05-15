import {Observable, Subject} from "rxjs/index";
const jsondiffpatch = require('jsondiffpatch').create();

export class ObservableDocument {
  private _value:Object;
  public deltaStream: Subject<Object> = new Subject();
  public _valueProxy;
  private static proxyHandler:ProxyHandler<Object> = {
    get: (target:Object, p: PropertyKey, receiver: any):any => {
      console.log('Get');
      console.log(target);
      console.log(p);
      console.log(typeof p);
      console.log(target.hasOwnProperty(p));
      // console.log(receiver);
      if(p==='toJSON'){
        console.log('json!');
        console.log(target['toJSON']);
        return target;
        // return JSON.stringify(target);
      }
      if((typeof p === 'number' || typeof p === 'string') && target.hasOwnProperty(p)){
        if(Array.isArray(target[p])||target[p] instanceof Object){
          return new Proxy(target[p], ObservableDocument.proxyHandler);
        }else{
          return target[p];
        }
      }
      return target;
    },
    set: (target: Object, p: PropertyKey, value: any, receiver: any):boolean => {
      target[p] = value;
      console.log('Set');
      console.log(target);
      //TODO emit event
      return true;
    }
  };

  constructor(value:Object){
    this.value = value;
  }
  public get value():Object{
    return this._valueProxy;
  }
  public set value(newValue:Object){
    // const delta = jsondiffpatch.diff(this._value, newValue);
    // this.deltaStream.next(delta);
    this._value = newValue;

    this._valueProxy = new Proxy(this._value, ObservableDocument.proxyHandler);
  }

}