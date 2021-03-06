import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
//Page
import { ProfilePage } from '../profile/profile';

import { UserAccount } from '../../models/UserAccount';

@Component({
  selector: 'page-confirm-pin-new',
  templateUrl: 'confirm-pin-new.html',
})
export class ConfirmPinNewPage {
  sPIN: string;
  sPINConfirm: string;
  sPIN1: string;
  sPIN2: string;
  sPIN3: string;
  sPIN4: string;
  sPIN5: string;
  sPIN6: string;
  isShowBtnBackSpace: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public popup: AlertController
    , public platform: Platform
    //,public sqlite :SQLite
    , public storage: Storage
  ) {
    console.log('platform:' + this.platform.platforms());
    console.log(this.platform);
    this.platform.ready().then(() => {
      this.sPIN = this.navParams.get("Pin");
      console.log('pin:' + this.sPIN);
      this.sPINConfirm = "";
      this.sPIN1 = "";
      this.sPIN2 = "";
      this.sPIN3 = "";
      this.sPIN4 = "";
      this.sPIN5 = "";
      this.sPIN6 = "";
      this.isShowBtnBackSpace = false;
      this.storage.get('username').then((name) => {
        console.log('username : ' + name);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmpinPage');
  }
  ConfirmPIN(): void {
    console.log('sPINConfirm:' + this.sPINConfirm);
    console.log('sPIN:' + this.sPIN);
    if (this.sPINConfirm.length == 5) {
      if (this.sPIN == this.sPINConfirm) {
        console.log('pin match');
        // set a key/value
        this.storage.set('PIN', this.sPINConfirm);
        // go to Profile page.
        this.navCtrl.push(ProfilePage).then(() => {
          this.navCtrl.remove(this.navCtrl.getPrevious().index);
          this.navCtrl.remove(this.navCtrl.getPrevious().index);
        });
      }
      else {
        //แจ้งเตือนกรณี PIN not equal
        let alert = this.popup.create({ title: "คุณกรอกรหัสผ่านไม่ตรงกัน", buttons: ['ตกลง'] });
        alert.present();
      }
    }
    else {
      //แจ้งเตือนกรณี pin length != 5
      let alert = this.popup.create({ title: "กรุณากรอกรหัสผ่าน 5 หลัก", buttons: ['ตกลง'] });
      alert.present();
    }
  }
  Cancel(): void {
    this.navCtrl.push(ProfilePage).then(() => {
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
      this.navCtrl.remove(this.navCtrl.getPrevious().index);
    });
  }
  AddNumber(sNumber: string): void {
    let nIndex = this.sPINConfirm.length;
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
        this.sPINConfirm = this.sPINConfirm + sNumber;
      }
     
    }
    else {

    }
    this.isShowBtnBackSpace = (this.sPINConfirm.length > 0);
    console.log('isShowBtnBackSpace:' + this.isShowBtnBackSpace);
    console.log('pin:' + this.sPINConfirm);
  }

  DelNumber(): void {
    let nLength = this.sPINConfirm.length;
    console.log('length:' + nLength);
    let nIndex = this.sPINConfirm.length - 1;
    console.log('index:' + nIndex);
    if (nLength > 0) {
      let sPINOld = this.sPINConfirm;
      this.sPINConfirm = sPINOld.substring(0, nLength - 1);
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
    this.isShowBtnBackSpace = (this.sPINConfirm.length > 0);
    console.log('isShowBtnBackSpace:' + this.isShowBtnBackSpace);
    console.log('pin:' + this.sPINConfirm);
  }

}
