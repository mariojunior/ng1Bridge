import {Injectable} from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser'

//trick to get angular global reference on js.
declare var angular:any;

@Injectable()
export class Ng1Bridge {
  constructor()
  {
    this._dom = new BrowserDomAdapter();
    this._body = this._dom.query("body");
    this._injector = angular.element(this._body).injector();
    this._globalScope = angular.element(this._body).scope();
  }
  
  get injector():any {
    return this._injector;
  }

  getService(name:string):any {
    return (name === null || name !== '') ? this._injector.get(name) : null; //todo: should throw an Excpetion. Name is required.
  }

  get globalScope():any {
    return this._globalScope;
  }

}