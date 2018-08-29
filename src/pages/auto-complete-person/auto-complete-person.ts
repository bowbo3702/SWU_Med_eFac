import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
////import models
import { MeettingData, Person_Meeting } from '../../models/MeettingData';

//import provider
import { OmmMeetingListProvider } from '../../providers/omm-meeting-list/omm-meeting-list';
import { MeetingDetailPage } from '../meeting-detail/meeting-detail';
/**
 * Generated class for the AutoCompletePersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-auto-complete-person',
  templateUrl: 'auto-complete-person.html',
})
export class AutoCompletePersonPage {
  //Declare param
  nTotalRows: number = 0;//amout all row in db
  nStart: number = 0;//amout Start row display
  nTop: number = 20;//amout Start row display 
  lstPerson: Person_Meeting[];
  sub: Subscription;
  errorMessage: string;
  sKeyword:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private MeetingProv: OmmMeetingListProvider
  ,public viewCtrl: ViewController) {
    this.BindAutoComplete();
  }

  BindAutoComplete(isScroll?: boolean) {
    // let _UserID = (this.usrdata == null) ? '' : this.usrdata.userid;
    // let _RoleID = (this.usrdata == null) ? '' : this.usrdata.role;
    //this.lstPerson = [];
    this.sub = this.MeetingProv.getData_Person('AutoCompletePerson', this.sKeyword, this.nStart, this.nTop).subscribe(
      (res) => {

        if (isScroll && this.lstPerson.length > 0)
          this.lstPerson = this.lstPerson.concat(res);
        else
          this.lstPerson = res;

        //console.log(this.lstMeeting)
        this.nStart = this.lstPerson.length;
        this.nTotalRows = this.lstPerson.length;
      },
      (error) => { this.errorMessage = <any>error }
    );
  }

  doInfinite(infiniteScroll) {

    this.nStart = this.nStart + this.nTop;
    //console.log("doInfinite");
    return new Promise((resolve) => {

      setTimeout(() => {
        this.BindAutoComplete(true);
        resolve();
      }, 500);
    });
  }

  onSearchInput(ev: any) {
      this.lstPerson = [];
      // set val to th value of the searchbar
      let val = ev.target.value;;
      this.nStart = 0;
      this.sKeyword = '';

      //if the value is an empty string don't filter th items
      if (val && val.trim() != '') {
        this.sKeyword = val;
      }
      //console.log(val);
      this.BindAutoComplete();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AutoCompletePersonPage');
    //this.viewCtrl.dismiss();
  }

  Close_Modal()
  {
    let data = { 'sDelegateID': '' ,'sDelegateName': '' };
    this.viewCtrl.dismiss(data)
  }

  SetDelegateID(sDelegateID,sDelegateName)
  {
    let data = { 'sDelegateID': sDelegateID ,'sDelegateName': sDelegateName };
    this.viewCtrl.dismiss(data);
  }
  
}
