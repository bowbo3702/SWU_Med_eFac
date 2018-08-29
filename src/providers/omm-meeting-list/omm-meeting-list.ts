import { Injectable } from '@angular/core';
import { Http } from '@angular/http';// import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
//import provider
import { ApiProvider } from '../api/api';
//import models
import { MeettingData, Person_Meeting } from '../../models/MeettingData';

@Injectable()
export class OmmMeetingListProvider {

  constructor(public http: Http, public apiProvider: ApiProvider) {
  }

  getData_Metting(sDataType, sKeyword, sUserCode, jsData, nStartRow, nTopRow): Observable<MeettingData[]> {
    //meetting_list
    let sFile_Handler = 'MeettingData.ashx?sMode=' + sDataType + '&nStart=' + nStartRow + '&nTopRow=' + nTopRow + '&sKeyword=' + sKeyword + '&sUserCode=' + sUserCode;
    //console.log(sFile_Handler);
    return this.apiProvider.getApiEndpoint(sFile_Handler);
  }

  getData_Person(sDataType, sKeyword, nStartRow, nTopRow): Observable<Person_Meeting[]> {
    //meetting_list
    let sFile_Handler = 'MeettingData.ashx?sMode=' + sDataType + '&nStart=' + nStartRow + '&nTopRow=' + nTopRow + '&sKeyword=' + sKeyword;
    //console.log(sFile_Handler)
    return this.apiProvider.getApiEndpoint(sFile_Handler);
  }
  saveMeeting(sApiFileName):any{
    return this.apiProvider.getApiEndpoint(sApiFileName);
  }
  //Login
  Save(sApiFileName): Promise<any> {
    return new Promise((resolve, reject) => {
      this.saveMeeting(sApiFileName).subscribe(res => {
        let isSuccess = res != undefined ;//&& res.sResult != null
        resolve(isSuccess);
      }, (error) => reject(error));
    });
  }
}
