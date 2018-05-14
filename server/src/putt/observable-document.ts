import {Observable, Subject} from "rxjs/index";
const jsondiffpatch = require('jsondiffpatch').create();


export class ObservableDocument {
  private _value:Object;
  public deltaStream: Subject<Object> = new Subject();;
  constructor(value:Object){
    this._value = value;
  }
  public get value():Object{
    return this._value;
  }
  public set value(newValue:Object){
    const delta = jsondiffpatch.diff(this._value, newValue);
    this.deltaStream.next(delta);
    this._value = newValue;
  }

}