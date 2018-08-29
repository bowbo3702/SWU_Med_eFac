import { Component } from '@angular/core';
import { NavController,NavParams, ModalController, AlertController,LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import * as moment from 'moment';
import 'moment/locale/th';

import { Subscription } from 'rxjs/Subscription'; //import Subscription เพื่อ unsubscribe() ข้อมูลจาก Server

import { UserloginProvider } from '../../providers/userlogin/userlogin';//import service เข้ามาใช้งาน
import {ApiProvider} from '../../providers/api/api';
import { UserAccount } from '../../models/UserAccount';
import { CommonProvider } from '../../providers/common/common';

import { ScheduleDetailPage} from '../schedule-detail/schedule-detail';

import { Schedule,Schedule_Calendar,ScheduleEvent } from '../../models/Schedule';
import { ScheduleProvider} from '../../providers/schedule/schedule';
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  lstSchedule:Schedule_Calendar[];
  onMonth: number;
  onYear: number;
  showDate: Date;
  selectedDate: Date;
  isNoitem: boolean;
  sub: Subscription;
  errorMessage: string;

  sRef_ID: string;
  cUserType: string = "";

  UserAccountData:UserAccount;
  eventSource = [];
  viewTitle: string;
  calendar = {
    mode: 'week',
    locale: 'th-TH',
    autoSelect:true,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
          return date.getDate().toString();
      },
      formatMonthViewDayHeader: function(date:Date) {
          return 'testMDH';
      },
      formatMonthViewTitle: function(date:Date) {
       
          return 'testMT';
      },
      formatWeekViewDayHeader: function(date:Date) {
        //console.log(date);
          return moment(date).locale("th").format('dd')+" "+moment(date).locale("th").format('Do');
      },
      formatWeekViewTitle: function(date:Date) {
          return  moment(date).locale("th").format('MMMM YYYY');
      },
      //Week hour
      formatWeekViewHourColumn: function(date:Date) {
          return date.getHours().toString() +".00";
      },
      formatDayViewHourColumn: function(date:Date) {
          return 'testDH';
      },
      formatDayViewTitle: function(date:Date) {
          return 'testDT';
      }
    },
  };
  event :ScheduleEvent;  
  //eventSource :ScheduleEvent[];  
  // event = { 
  //   title:String,
  //   startTime: new Date(), 
  //   endTime: new Date(),
  //    allDay: false,
  //    sClassCode:String,
  //    sClassName:String ,
  //    sTeacherName:String,
  //    sType:String,
  //    sScheduleID:String,
  //    };
  //    markDisabled = (date: Date) => {
  //     var current = new Date();
  //     return date < current;
  // };

  constructor(public navCtrl: NavController
    ,public navParams: NavParams
    ,private datePicker: DatePicker
    ,private loadingCtrl: LoadingController
    ,private usrProvider: UserloginProvider
    ,private scheduleProv:ScheduleProvider
    ,private apiProv:ApiProvider
    ,public  platform:Platform
    ,public storage:Storage
    , private modalCtrl: ModalController
    , private alertCtrl: AlertController
    , public toast: ToastController) {
      let colors: string[] = ['primary', 'secondary', 'danger', 'success'];
      // this.eventSource.push({
      //   title: 'Sport Day',
      //   startTime: new Date("2018-08-19T09:00:00+07:00"),
      //   endTime: new Date("2018-08-19T12:00:00+07:00"),
      //   allDay: false,
      //   sClassCode:"Sport Day",
      //   sClassName:"Sport Day 2018",
      //   sTeacherName:"",
      //   sType:"A",
      // });
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.platform.ready().then(() => { 
      this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
        this.UserAccountData = usr;
        this.cUserType = usr.cUserType;
        this.sRef_ID = usr.sUserCode;
        this.LoadData();
      });
    });
  }
  ionViewWillEnter() {
   
  }
  ionViewWillLeave() {
   //this.sub.unsubscribe(); // unsubscribe ข้อมูลที่มาจาก server
  }
  filterDate() {
  this.platform.ready().then(() => { 
    this.datePicker.show({
      date: this.selectedDate,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      locale: 'th_TH'
      }).then(
        date => {
          this.onYear = date.getFullYear();
          this.onMonth = date.getMonth();
          this.selectedDate = date;
          this.calendar.currentDate =  this.selectedDate;
          this.presentToast(this.selectedDate);
        }, err => { this.presentToast(err); });
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    this.navCtrl.push(ScheduleDetailPage,{schedule:event,Ref_ID:this.sRef_ID});
  }
 
  onTimeSelected(ev) {
    this.selectedDate = ev.selectedTime;
  }
  LoadData(){
    let loading = this.loadingCtrl.create({ content: 'Loading...' });
    loading.present();//เริ่มแสดง Loading //59107010170
    this.scheduleProv.GetSchedule(this.sRef_ID,this.cUserType).subscribe(
      (res) => {
        console.log(res);
        this.lstSchedule = res.lstSchedule;
        console.log(  this.lstSchedule );
        res.lstSchedule.forEach(s => {
          this.eventSource.push({
              title: s.sCourseCode,
              startTime: this.apiProv.convertStrDateToDate(s.dDateTimeStart),
              endTime: this.apiProv.convertStrDateToDate(s.dDateTimeEnd),
              allDay: false,
              sCourseCode:s.sCourseCode,
              sCourseName:s.sCourseCode,
              sScheduleType:s.sScheduleType,
              sLernType:s.sLearnTypeName,
              sUniversity:s.sUniversityName,
              sBuilding:s.sBuildingName,
              sClassRoom:s.sRoomName,
              sScheduleID:s.nScheduleID + "",
              nClass : s.nClass
            });
         });
        loading.dismiss();//ให้ Loading หายไป
      },
      (error) => {
         this.errorMessage = <any>error ; 
        loading.dismiss();//ให้ Loading หายไป
      }
    );
  }
//   reloadDta(event:Date) {
//     var today = new Date();
//     today.setHours(0, 0, 0, 0);
//     event.setHours(0, 0, 0, 0);
//    let sDate = moment(event).format('LLLL').split("เวลา")[0];
//     //this.isToday = today.getTime() === event.getTime();
//     //this.getEvents(this);
//     console.log('reloadDta'); 
//     console.log(event);  console.log(sDate); 
//  }
 //show toast
 presentToast(sMsg) {
  let toast = this.toast.create({
    message: sMsg,
    duration: 8000,
    position: 'buttom'
  });
  toast.onDidDismiss(() => {
    //console.log('Dismissed toast');
  });
  toast.present();
}
}
