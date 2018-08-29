import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';
//--------------------------------- Import Pages --------------------------------------------
import { MeetingListPage } from '../meeting-list/meeting-list';
import { HomePage } from '../home/home';
import { AssessReportPage} from '../assess-report/assess-report';
import { TabsPage } from '../tabs/tabs';
import { ScanbarcodePage } from '../scanbarcode/scanbarcode';
import { SchedulePage} from '../schedule/schedule';
//--------------------------------- Providers --------------------------------------------------
import { ApiProvider } from '../../providers/api/api';
import { UserloginProvider } from '../../providers/userlogin/userlogin';

//--------------------------------- Models ---------------------------------------------------
import { UserAccount } from '../../models/UserAccount';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  UserAccountData: UserAccount;
  isLogin: boolean;
  url:string;
  Code:string;
  Fullname:String;
  ImagePath:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public platform: Platform
    , public api: ApiProvider
    , public usrProvider: UserloginProvider
    , private iBrowser: InAppBrowser
  ) {
    this.ImagePath="asset/imgs/avatar-default.png";
    this.url = this.api.getAMS_Url();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.usrProvider.isLogged().then((val: boolean) => {
      this.isLogin = val;

      if (this.isLogin) {
        this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
          this.UserAccountData = usr;
          this.setProfile();
        });

      }
    });
  }
  setProfile(){
    this.Code=this.UserAccountData.sUserCode;
    this.Fullname=this.UserAccountData.sFullName;
    console.log( this.UserAccountData.sSysFileNameImage);
    this.ImagePath= ( this.UserAccountData.sSysFileNameImage == "" ? "asset/imgs/avatar-default.png": this.url + this.UserAccountData.sSysFileNameImage);
  }
  GotoPage(mode) {
    switch (mode) {
      case "SCHEDULE":
        this.navCtrl.push(SchedulePage);
        break;
      case "OMM":
        this.navCtrl.push(MeetingListPage);
        break;
      case "HOME":
        //this.navCtrl.push(MyprofilePage);
        break;
      case "LOGBOOK":
        //web softthai
        ///LogBook_Bypass.aspx?str=sUserCode&L 
        this.openUrl(this.api.getLOG_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_L', '_blank');
        break;
      case "ASSESSMENT":
        ///LogBook_Bypass.aspx?str=sUserCode&A
        this.openUrl(this.api.getASS_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_A', '_blank');
        break;
      case "QR":
        this.navCtrl.push(ScanbarcodePage);
        break;
      case "SETTING":
         //this.navCtrl.push(AssessReportPage);
        break;  
        case "REPORT":
         this.navCtrl.push(AssessReportPage);
        break;
      default:
        break;
    }
  }
  openUrl(_url, _target) {
    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(_url, _target, 'clearsessioncache=yes,clearcache=yes');
    });
  }
}
