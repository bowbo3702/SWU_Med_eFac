import { Http, Response } from '@angular/http'; 
import { Injectable } from '@angular/core';

import { ApiProvider } from '../api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//เอาไว้หน่วงเซิฟเวอร์
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { Schedule,Schedule_Calendar,ScheduleEvent,Schedule_Detail,ST_Schedule_Calendar_Topic,ST_Schedule_Calendar_Topic_File } from '../../models/Schedule';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class ScheduleProvider {
schedule:Schedule[];
  constructor(public http: Http,public apiProv: ApiProvider    
    , public platform: Platform
    , public sqlite: SQLite
    , public storage: Storage) {
    
  }
  GetSchedule(sUserID: string,sUserType:string): Observable<Schedule> {
    console.log("getUserInfoByUserName :" + sUserID)
    let sApiFileName = '';
    if(sUserType=="P")
    {
      sApiFileName = 'schedule.ashx?mode=Get_ScheduleByPersonnel&ref_ID=' + sUserID + '';
    }
    else{
      sApiFileName = 'schedule.ashx?mode=Get_ScheduleByStudent&ref_ID=' + sUserID + '';
    }
 
    return this.apiProv.getApiEndpoint(sApiFileName);
  }
  GetScheduleDetail(scheduleID: string,sUserType:string,ref_ID:string): Observable<Schedule_Detail> {
    let sApiFileName = '';
    if(sUserType == "P")
    {
      sApiFileName = 'schedule.ashx?mode=Get_Schedule_Detail_Person&scheduleID=' + scheduleID + '&ref_ID=' + ref_ID + '';
    }
    else{
      sApiFileName = 'schedule.ashx?mode=Get_Schedule_Detail_Student&scheduleID=' + scheduleID + '&ref_ID=' + ref_ID + '';
    }
    console.log(sApiFileName);
    return this.apiProv.getApiEndpoint(sApiFileName);
  }
  SwapSchedule(scheduleID: string,ref_ID:string){
    let sApiFileName = 'schedule.ashx?mode=swap_schedule&scheduleID=' + scheduleID + '&ref_ID=' + ref_ID + '';
    return this.apiProv.getApiEndpoint(sApiFileName);
  }
}
