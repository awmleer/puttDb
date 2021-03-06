import {Observable, Subject} from "rxjs/index";
const jsondiffpatch = require('jsondiffpatch').create();

export interface ObservableDocumentChange {
  path: (string|number)[];
  value: any;
  from?: any;
}

export class ObservableDocument {
  public _value:Object;
  public changeSubject: Subject<Object> = new Subject();

  private readonly _id: string;
  public get id():string{
    return this._id;
  }

  constructor(value:Object){
    this.value = value;
    this._id = value['_id'];
  }

  private getProxyHandler(path):ProxyHandler<Object>{
    return {
      get: (target:Object, p: PropertyKey, receiver: any):any => {
        // console.log('Get');
        // console.log(target);
        // console.log(p);
        // console.log(typeof p);
        // console.log(target.hasOwnProperty(p));
        // console.log(receiver);
        if((typeof p === 'number' || typeof p === 'string') && target.hasOwnProperty(p)){
          if(Array.isArray(target[p])||target[p] instanceof Object){
            return new Proxy(target[p], this.getProxyHandler(path.concat([p])));
          }else{
            return target[p];
          }
        }else{
          return target;
        }
      },
      set: (target: Object, p: PropertyKey, value: any, receiver: any):boolean => {
        target[p] = value;
        this.changeSubject.next({
          path: path.concat([p]),
          value: value
        });
        // console.log('Set');
        // console.log(target);
        //TODO emit event
        return true;
      }
    };
  }

  public get value():Object{
    return new Proxy(this._value, this.getProxyHandler([]));
  }
  public set value(newValue:Object){
    this._value = newValue;
  }

  public get json():string{
    return JSON.stringify(this._value);
  }

  public applyChange(change:ObservableDocumentChange, slient:boolean=true, from:any=null){
    let obj = this._value;
    let i;
    for (i = 0; i < change.path.length-1; i++) {
      // if(obj[change.path[i]] == null){
      //   obj[change.path[i]] = {};
      // }
      obj = obj[change.path[i]];
    }
    obj[change.path[i]] = change.value;
    change.from = from;
    if(!slient){
      this.changeSubject.next(change);
    }
    console.log('od updated');
    console.log(this._value);
  }

}