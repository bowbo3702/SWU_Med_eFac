import { Component } from '@angular/core';
import { NavController,NavParams, ModalController, AlertController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as moment from 'moment';
import 'moment/locale/th';
//import { FileOpener } from '@ionic-native/file-opener';

import { Schedule,ScheduleEvent,ST_Schedule_Calendar_Topic,ST_Schedule_Calendar_Personnel,Schedule_Detail } from '../../models/Schedule';
import { ScheduleProvider} from '../../providers/schedule/schedule';
import { UserloginProvider } from '../../providers/userlogin/userlogin';//import service เข้ามาใช้งาน
import { ApiProvider} from '../../providers/api/api';
import { UserAccount } from '../../models/useraccount';
@Component({
  selector: 'page-schedule-detail',
  templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {
  //event : ScheduleEvent; 
  apiURL:string;
  event : any; 
  sDate:string;
  sTime:string;
  sCourseName:string;
  sLocation:string;
  sGroupName:string;
  sLearnType:string;
  sClassNo:string;
  scheduleDetail:Schedule_Detail;
  arrPerson=[];
  arrPersonReplace=[];
  lstScheduleTopic:ST_Schedule_Calendar_Topic[];  
  isFuture:boolean =false;
  isHasGroup:boolean =false;
  isCanSwap:boolean =false; 
  isPreClinic:boolean =false;
  isHasPersonReplace:boolean =false;
  UserAccountData:UserAccount;
  sRef_ID: string;
  cUserType: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private loadingCtrl: LoadingController
    ,private scheduleProv:ScheduleProvider
    ,private apiProv:ApiProvider
    ,private usrProvider: UserloginProvider
    , private iBrowser: InAppBrowser
    , public platform: Platform
    //,private fileOpener: FileOpener
  ) {
   this.event = this.navParams.get("schedule");
   this.apiURL = this.apiProv.getAMS_Url();
   this.platform.ready().then(() => { 
    this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
      this.UserAccountData = usr;
      this.cUserType = usr.cUserType;
      this.sRef_ID = usr.sUserCode;
      this.SetData();
    });
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduleDetailPage');
  }
  SetData(){
    let timeStart = moment(this.event.startTime).format('HH:mm น.');
    let timeEnd = moment(this.event.endTime).format('HH:mm น.');

    this.sDate = moment(this.event.startTime).format('LLLL').split("เวลา")[0];
    this.sTime = timeStart + ' - '+ timeEnd;
    this.sCourseName = this.event.sCourseCode + ':' + this.event.sCourseName;
    this.sLearnType = this.event.sLernType+"";
  
    // 'มหาวิทยาลัยศรีนครินทรวิโรฒ องครักษ์';
    console.log(  this.sLocation);
    let loading = this.loadingCtrl.create({ content: 'Loading...' });
    loading.present();//เริ่มแสดง Loading
     console.log('this.event.sScheduleID');console.log(this.event.sScheduleID);
     //this.sRef_ID //5904060004
    this.scheduleProv.GetScheduleDetail(this.event.sScheduleID,this.cUserType,this.sRef_ID).subscribe(
      (res) => {
        console.log('GetScheduleDetail');
        console.log(res);
        this.scheduleDetail=res;
        this.sLocation =this.scheduleDetail.Schedule.sHospitalName + "" != "" ? this.event.sHospitalName + "": (this.event.sUniversity+"" !=""? ""+this.event.sUniversity + ""+ (this.event.sBuilding + ""!=""?" ,ตึก "+this.event.sBuilding + ""+( this.event.sClassRoom +""!=""? " ห้อง "+this.event.sClassRoom:""):""):"");
   
        this.isCanSwap = this.cUserType =="P" &&  this.scheduleDetail.Schedule.cCanSwap == "Y";
        console.log(this.scheduleDetail.Schedule.cCanSwap);
        console.log('cUserType'+this.cUserType);
        this.isPreClinic = this.event.sScheduleType =="PC";
        this.isHasGroup = this.event.sScheduleType =="C" ||  this.event.sLearnType =="PBL";
        this.sClassNo= this.scheduleDetail.Schedule.nClass +"";
        this.lstScheduleTopic = this.scheduleDetail.lstScheduleTopic;
        console.log('lstScheduleTopic');
        console.log(this.lstScheduleTopic);
        this.arrPerson = this.scheduleDetail.lstSchedulePerson;
        this.arrPersonReplace=this.scheduleDetail.lstSchedulePersonReplace;
        this.isHasPersonReplace = this.arrPersonReplace.length > 0;
         console.log('arrPerson');
         console.log(this.arrPerson);
        loading.dismiss();//ให้ Loading หายไป
      },
      (error) => {
        console.log(error);
        loading.dismiss();//ให้ Loading หายไป
      });
  }
  open(cType,sLink,nScheduleTopicFileID){
      if(cType=="L"){
        console.log(sLink);
        this.openUrl(sLink);
      }
      else
      {
      
       this.openFile(this.apiURL +'openfile.aspx?str='+nScheduleTopicFileID);
     
      }
  }
  openUrl(_url) {
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(_url, '_system', 'clearsessioncache=yes,clearcache=yes');
    });
  }
  openFile(_url) {
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(_url, '_system', 'clearsessioncache=yes,clearcache=yes');
    });
  }
  getMIMEtype(extn){
    let ext=extn.toLowerCase();
    let MIMETypes={
      'txt' :'text/plain',
      'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc' : 'application/msword',
      'pdf' : 'application/pdf',
      'jpg' : 'image/jpeg',
      'bmp' : 'image/bmp',
      'png' : 'image/png',
      'xls' : 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf' : 'application/rtf',
      'ppt' : 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }
  Swap()
  {
    console.log('LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_S' +  '_' + this.event.sScheduleID);
    this.openUrl(this.apiProv.getAMS_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_S' +  '_' + this.event.sScheduleID);
    // this.scheduleProv.SwapSchedule(this.event.sScheduleID,this.sRef_ID).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //   }
    // );
  }
}
