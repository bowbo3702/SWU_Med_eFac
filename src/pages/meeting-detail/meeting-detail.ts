import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController, PopoverController, ModalController } from 'ionic-angular';
import { UserAccount } from '../../models/UserAccount';

//import provider
import { ApiProvider } from '../../providers/api/api';
import { OmmMeetingListProvider } from '../../providers/omm-meeting-list/omm-meeting-list';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AutoCompletePersonPage } from '../auto-complete-person/auto-complete-person';

/**
 * Generated class for the MeetingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-meeting-detail',
  templateUrl: 'meeting-detail.html',
})
export class MeetingDetailPage {
  Title: string;
  item: any;
  sDelegateID: string;
  sUsername: string;
  sPersonnel_ID: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController
    , public actionSheetCtrl: ActionSheetController, public apiProvider: ApiProvider
    , public popoverCtrl: PopoverController, public toastCtrl: ToastController, public ModalCtrl: ModalController
   , public ommProv: OmmMeetingListProvider  , public _PV_UserAcc: UserloginProvider) {
    this.item = navParams.get("DataDetail");
    this.Title = navParams.get("sTitle");
    console.log( 'this.item' );
    console.log( this.item );
  }

  ionViewDidLoad() {
    this._PV_UserAcc.getUserNameFromStorage().then((res: string) => {
      console.log(" this.usrProvider.getUserNameFromStorage() res : " + res);
      if (res != null && res != undefined && res != "") {
        this.sUsername = res;
        console.log(" this.sUsername = res:" + this.sUsername);
        this._PV_UserAcc.getUserInfoByUserName(this.sUsername).then((res2: UserAccount) => {
          this.sPersonnel_ID = res2.sUserCode;
        });
      }
    });
  }

  presentActionSheet(nMeetingDetailID, nMeetingID) {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select Item',
      buttons: [
        {
          text: 'เข้าร่วม',
          role: 'destructive',
          handler: () => {
            //console.log(nMeetingDetailID+nMeetingID);
            this.presentConfirm(nMeetingDetailID, nMeetingID);
            //return false;
          }
        }, {
          text: 'ส่งผู้แทนเข้าร่วม',
          handler: () => {
            //console.log('Archive clicked');
            this.presentPopover(nMeetingDetailID, nMeetingID);
           // return false;
          }
        }, {
          text: 'ไม่เข้าร่วม',
          handler: () => {
            this.presentPrompt(nMeetingDetailID, nMeetingID);
            //return false;
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentConfirm(nMeetingDetailID, nMeetingID) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน',
      message: 'คุณต้องการตอบรับการประชุม?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'บันทึก',
          handler: () => {

            //let sPersonnel_ID = "5905300041";
            let sFile_Handler = 'MeettingData.ashx?sMode=SaveData&cStatus=Y&nMeetingDetailID=' + nMeetingDetailID + '&nMeetingID=' + nMeetingID + '&sPersonnel_ID=' + this.sPersonnel_ID;
            console.log(sFile_Handler);
            // this.apiProvider.getApiEndpoint(sFile_Handler);
            this.ommProv.Save(sFile_Handler).then((res: any) => {
              console.log(res);
              this.item.forEach(element => {
               if(element.nMeetingDetailID == nMeetingDetailID || element.nMeetingID == nMeetingID){
                element.cStatus = "Y";
                element.sStatus = "ยืนยันการตอบรับ";
               }
              });
              this.navCtrl.push(MeetingDetailPage, { sTitle: this.Title, DataDetail: this.item }).then(() => {
                this.navCtrl.remove(this.navCtrl.getPrevious().index);
              });;
            });
          }
        }
      ]
    });
    alert.present();
  }

  presentPrompt(nMeetingDetailID, nMeetingID) {
    let alert = this.alertCtrl.create({
      title: 'หมายเหตุ',
      inputs: [
        {
          name: 'MSG_DESC',
          placeholder: 'ระบุ'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {
            //console.log(data);
          }
        },
        {
          text: 'ตกลง',
          handler: data => {
            //console.log(data["MSG_DESC"]);

            if (data["MSG_DESC"]) {
              //let sPersonnel_ID = "5905300041";
              let sFile_Handler = 'MeettingData.ashx?sMode=SaveData&cStatus=C&nMeetingDetailID=' + nMeetingDetailID + '&nMeetingID=' + nMeetingID + '&sPersonnel_ID=' + this.sPersonnel_ID + '&sDescription=' + data["MSG_DESC"];
              //console.log(sFile_Handler);
               this.apiProvider.getApiEndpoint(sFile_Handler);
            } else {
              // invalid login
              this.presentToast('ระบุหมายเหตุ');
              return false;
            }


          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    // toast.onDidDismiss(() => {
    //   //console.log('Dismissed toast');
    // });

    toast.present();
  }

  presentPopover(nMeetingDetailID, nMeetingID) {
    let popover = this.ModalCtrl.create(AutoCompletePersonPage);
    popover.present({
      //ev: myEvent

    });
    popover.onDidDismiss(
      data => {
        //console.log(data);
        if (data["sDelegateID"]) {
          this.CFpresentConfirm(nMeetingDetailID, nMeetingID, data["sDelegateID"], data["sDelegateName"]);
        }
      }
    )
  }

  CFpresentConfirm(nMeetingDetailID, nMeetingID, sDelegateID, sDelegateName) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน',
      message: 'คุณต้องการส่งผู้แทนเข้าร่วมคือ <br> ' + sDelegateName + '?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'บันทึก',
          handler: () => {

            //let sPersonnel_ID = "5905300041";
            let sFile_Handler = 'MeettingData.ashx?sMode=SaveData&cStatus=D&nMeetingDetailID=' + nMeetingDetailID + '&nMeetingID=' + nMeetingID + '&sPersonnel_ID=' + this.sPersonnel_ID + '&sDelegateID=' + sDelegateID;
            //console.log(sFile_Handler);
           // this.apiProvider.getApiEndpoint(sFile_Handler);
           
          }
        }
      ]
    });
    alert.present();
  }

}
