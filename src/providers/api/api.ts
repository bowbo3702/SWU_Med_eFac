import { Http ,Response} from '@angular/http';
import { Injectable } from '@angular/core';
import {Platform} from 'ionic-angular';

import {  Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiProvider {
  apiUrl: string;
  OMM_Url: string;
  LOG_Url: string;
  ASS_Url: string;
  AMS_Url: string;
  isCordova: boolean = false;
  isiOS: boolean = false;
  isAndroid: boolean = false;
  constructor(public http: Http,private platform:Platform) {
    // this.apiUrl = "http://med-swu.com/ams/Mobile/Ashx/";
    // this.AMS_Url = "http://med-swu.com/ams/";
    // this.OMM_Url = "http://med-swu.com/ams/";
    // this.LOG_Url = "http://med-swu.com/ams/";
    // this.ASS_Url = "http://med-swu.com/ams/";

    this.apiUrl = "http://www.softthai.com/Med_ams/Mobile/Ashx/";
    this.AMS_Url = "http://www.softthai.com/Med_ams/";
    this.OMM_Url = "http://www.softthai.com/Med_ams/";
    this.LOG_Url = "http://www.softthai.com/Med_ams/";
    this.ASS_Url = "http://www.softthai.com/Med_ams/";

    // this.apiUrl = "http://192.168.0.14/med_ams/Mobile/Ashx/";
    // this.AMS_Url = "http://192.168.0.14/med_ams/";
    // this.OMM_Url = "http://192.168.0.14/med_ams/";
    // this.LOG_Url = "http://192.168.0.14/med_ams/";
    // this.ASS_Url = "http://192.168.0.14/med_ams/";

    this.isCordova = this.platform.is('cordova');
    this.isiOS = this.platform.is('ios');
    this.isAndroid = this.platform.is('android');
    
   }
   //get api url
    getApiUrl(): string { return this.apiUrl; }
    getAMS_Url(): string { return this.AMS_Url; }
    getOMM_Url(): string { return this.OMM_Url; }
    getLOG_Url(): string { return this.LOG_Url; }
    getASS_Url(): string { return this.ASS_Url; }

  getApiEndpoint(sFile_Handler: string): Observable<any>{
    return this.http.get(this.apiUrl + sFile_Handler)
    .map((res: Response)=> <any>res.json())
    .catch(this.handleError);
  }
  post(){

  }
  public convertStrDateToDate(value): Date {
    return value == null ? null : new Date(parseInt(value.match(/\d+/)[0]));
  }
  handleError(error: any){
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server')
  }
}
