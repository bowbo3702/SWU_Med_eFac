import { Component } from '@angular/core';
import { NavController, AlertController ,NavParams} from 'ionic-angular';

import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ChangePinPage } from '../change-pin/change-pin';
import {AppInfoPage} from '../app-info/app-info';

import { UserloginProvider } from '../../providers/userlogin/userlogin';//import service เข้ามาใช้งาน
import {ApiProvider} from '../../providers/api/api';
import { UserAccount } from '../../models/useraccount';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  url:string;
  Code:string;
  Fullname:String;
  Classno:String; 
  Email:string;
  ImagePath:string;
  UserAccountData:UserAccount;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App
  ,public apiProv :ApiProvider,public usrProvider :UserloginProvider
  ,public alertCtrl:AlertController) {
      this.url = this.apiProv.getAMS_Url();
  }

  ionViewDidLoad() {
    this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
      this.UserAccountData = usr;
      this.SetData();
    });
  }
  SetData(){
    this.Code=this.UserAccountData.sUserCode;
    this.Fullname=this.UserAccountData.sFullName;
    this.Classno=this.UserAccountData.sClassNo;
    this.Email=this.UserAccountData.sEmail;
    this.ImagePath= ( this.UserAccountData.sSysFileNameImage==""?"asset/imgs/avatar-default.png": this.url + this.UserAccountData.sSysFileNameImage);
  }
  logout(){
    let confirm = this.alertCtrl.create({
      title: 'ต้องการออกจากระบบใช่หรือไม่?',
      message: '',
      buttons: [{ text: 'ไม่', handler: () => { } },
      {
        text: 'ใช่',
        handler: () => {
          this.usrProvider.logout().then(res => {
            this.navCtrl.setRoot(LoginPage);
          });
        }
      }
      ]
    });
    confirm.present();
  }
  changePIN(){
    this.navCtrl.push(ChangePinPage);
  }
  GotoAppInfo(){ 
    this.navCtrl.push(AppInfoPage);
  }
}
