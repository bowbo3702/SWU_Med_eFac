import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ConfirmpinPage } from '../confirmpin/confirmpin';
import { UserAccount } from '../../models/UserAccount';

@Component({
  selector: 'page-setpin',
  templateUrl: 'setpin.html',
})
export class SetpinPage {
  UserAccountData: UserAccount;
  sPIN: string;
  sPIN1: string;
  sPIN2: string;
  sPIN3: string;
  sPIN4: string;
  sPIN5: string;
  sPIN6: string;
  isShowBtnBackSpace: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public popup: AlertController) {
    this.UserAccountData = this.navParams.get("UserAccountData");
    console.log('UserAccountData:' + this.UserAccountData);
    this.sPIN = "";
    this.sPIN1 = "";
    this.sPIN2 = "";
    this.sPIN3 = "";
    this.sPIN4 = "";
    this.sPIN5 = "";
    this.sPIN6 = "";
    this.isShowBtnBackSpace = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SetpinPage');
  }
  SavePIN(): void {
    if (this.sPIN.length == 5) {
      this.navCtrl.setRoot(ConfirmpinPage, { UserAccountData: this.UserAccountData, Pin: this.sPIN }, { animate: false });
    }
    else {
      //แจ้งเตือนกรณี pin length != 5
      let alert = this.popup.create({ title: "กรุณากรอก รหัสผ่าน 5 หลัก", buttons: ['ตกลง'] });
      alert.present();
    }
  }
  AddNumber(sNumber: string): void {
    let nIndex = this.sPIN.length;
    if (nIndex <= 4) {
      if (nIndex == 0) {
        this.sPIN1 = sNumber;
        this.sPIN2 = "";
        this.sPIN3 = "";
        this.sPIN4 = "";
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 1) {
        this.sPIN2 = sNumber;
        this.sPIN3 = "";
        this.sPIN4 = "";
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 2) {
        this.sPIN3 = sNumber;
        this.sPIN4 = "";
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 3) {
        this.sPIN4 = sNumber;
        this.sPIN5 = "";
        this.sPIN6 = "";
      }
      else if (nIndex == 4) {
        this.sPIN5 = sNumber;
        this.sPIN6 = "";
      }
      if(nIndex <= 4)
      {
        this.sPIN = this.sPIN + sNumber;
      }
      
    }
    else {

    }
    this.isShowBtnBackSpace = (this.sPIN.length > 0);
    console.log('isShowBtnBackSpace:' + this.isShowBtnBackSpace);
    console.log('pin:' + this.sPIN);
  }

  DelNumber(): void {
    let nLength = this.sPIN.length;
    console.log('length:' + nLength);
    let nIndex = this.sPIN.length - 1;
    console.log('index:' + nIndex);
    if (nLength > 0) {
      let sPINOld = this.sPIN;
      this.sPIN = sPINOld.substring(0, nLength - 1);
      if (nIndex == 0) {
        this.sPIN1 = "";
      }
      else if (nIndex == 1) {
        this.sPIN2 = "";
      }
      else if (nIndex == 2) {
        this.sPIN3 = "";
      }
      else if (nIndex == 3) {
        this.sPIN4 = "";
      }
      else if (nIndex == 4) {
        this.sPIN5 = "";
      }
    }
    console.log('pin:' + this.sPIN);
    this.isShowBtnBackSpace = (this.sPIN.length > 0);
    console.log('isShowBtnBackSpace:' + this.isShowBtnBackSpace);
  }
}
