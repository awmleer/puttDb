import {Observable, Subject} from "rxjs/index";
const jsondiffpatch = require('jsondiffpatch').create();

export class ObservableDocument {
  private _value:Object;
  public deltaStream: Subject<Object> = new Subject();
  public _valueProxy;

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
    const proxyHandler:ProxyHandler<Object> = {
      get: (target:Object, p: PropertyKey, receiver: any):any => {
        console.log('Get');
        console.log(p);
        return new Proxy(target[p], proxyHandler);
      },
      set: (target: Object, p: PropertyKey, value: any, receiver: any):boolean => {
        target[p] = value;
        console.log('Set');
        console.log(target);
        //TODO emit event
        return true;
      }
    };
    this._valueProxy = new Proxy(this._value, proxyHandler);
  }

}