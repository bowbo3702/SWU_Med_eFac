import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ActionSheetController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
////import models
import { MeettingData } from '../../models/MeettingData';
import { UserAccount } from '../../models/UserAccount';
////import providers
import { OmmMeetingListProvider } from '../../providers/omm-meeting-list/omm-meeting-list';
import { MeetingDetailPage } from '../meeting-detail/meeting-detail';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
@Component({
  selector: 'page-meeting-list',
  templateUrl: 'meeting-list.html',
})
export class MeetingListPage {
  //Declare param
  nTotalRows: number = 0;//amout all row in db
  nStart: number = 0;//amout Start row display
  nTop: number = 20;//amout Start row display 
  lstMeeting: MeettingData[];
  sub: Subscription;
  sKeyword: string;
  sSearch_ReqDate: string;
  sSearch_CounterService: string;
  sSearch_TrackingNumber: string;
  sSearch_Status: string;
  sUserID: string;
  errorMessage: string;
  sUsername: string;
  sPersonnel_ID: string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private MeetingProv: OmmMeetingListProvider, public actionSheetCtrl: ActionSheetController
    , public _PV_UserAcc: UserloginProvider
  ) { }
  ionViewDidLoad() {
    console.log('meetingpage ionViewDidLoad')
    this._PV_UserAcc.getUserNameFromStorage().then((res: string) => {
      if (res != null && res != undefined && res != "") {
        this.sUsername = res;
        this._PV_UserAcc.getUserInfoByUserName(this.sUsername).then((res2: UserAccount) => {
          this.sPersonnel_ID = res2.sUserCode;
          console.log("USERCODE" + this.sPersonnel_ID);
          this.BindMeeting();
        });
      }
    });

  }
  BindMeeting(isScroll?: boolean) {
    // let _UserID = (this.usrdata == null) ? '' : this.usrdata.userid;
    // let _RoleID = (this.usrdata == null) ? '' : this.usrdata.role;
    console.log("BindMeeting : " + this.sPersonnel_ID);
    this.sub = this.MeetingProv.getData_Metting('meetting_list', this.sKeyword, this.sPersonnel_ID, [this.sSearch_ReqDate, this.sSearch_CounterService, this.sSearch_TrackingNumber, this.sSearch_Status], this.nStart, this.nTop).subscribe(
      (res) => {

        if (isScroll && this.lstMeeting.length > 0)
          this.lstMeeting = this.lstMeeting.concat(res);
        else
          this.lstMeeting = res;

        //console.log(this.lstMeeting)
        this.nStart = this.lstMeeting.length;
        this.nTotalRows = this.lstMeeting.length;
      },
      (error) => { this.errorMessage = <any>error }
    );

  }

  doInfinite(infiniteScroll) {

    this.nStart = this.nStart + this.nTop;

    return new Promise((resolve) => {

      setTimeout(() => {
        this.BindMeeting(true);
        resolve();
      }, 500);
    });
  }

  openNavDetailsPage(sTitle, item) {
    this.navCtrl.push(MeetingDetailPage, { sTitle: sTitle, DataDetail: item });
  }
}
