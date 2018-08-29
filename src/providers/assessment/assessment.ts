import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Assessment,GraphInfoData} from '../../models/Assessment';
import { ApiProvider } from '../api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//เอาไว้หน่วงเซิฟเวอร์
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
@Injectable()
export class AssessmentProvider {

  constructor(public http: Http,public apiProv: ApiProvider) {
    console.log('Hello AssessmentProvider Provider');
  }
  getBilledQtyPeriod(sUserID, sClassNo, sTermNo): Observable<Assessment> {
    let sFile_Handler = 'assessment.ashx?mode=assessment_student&usercode='+sUserID+'&classno='+sClassNo+'&termno='+sTermNo+'';
    return this.apiProv.getApiEndpoint(sFile_Handler);
  }
}
