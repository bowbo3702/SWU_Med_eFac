import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';

import {UserloginProvider} from '../../providers/userlogin/userlogin';
import {UserAccount} from '../../models/UserAccount';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
user :UserAccount
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    ,public usrProv: UserloginProvider
    ,public alert:AlertController ) {
  }

  ionViewDidLoad() {
    //this.usrProv.getUserAccount().subscribe(res => {this.user = res; console.log(res);this.presentAlert(this.user.sFirstName);});
  }
  presentAlert(sMsg) {
    let alert = this.alert.create({
      title: 'Success',
      subTitle: sMsg,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
