import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Subscription } from 'rxjs/Subscription'; //import Subscription เพื่อ unsubscribe() ข้อมูลจาก Server

@Component({
  selector: 'page-app-info',
  templateUrl: 'app-info.html',
})
export class AppInfoPage {
  appName: string;
  packageName: string;
  versionNumber: string;

  isNewUpdate: boolean;
  newVersionNumber: string;
  newfeature: string;
  link: string;

  sub: Subscription;
  errorMessage: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private appVersion: AppVersion,
    private iab: InAppBrowser) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AppInfoPage');
   this.platform.ready().then(() => {
      //app name
      this.appVersion.getAppName().then((value) => { this.appName = value; }).catch(reason => { this.appName = reason; });
      //bundle identifier
      this.appVersion.getPackageName().then((value) => { this.packageName = value; }).catch(reason => { this.packageName = reason; });
      //app version
      this.appVersion.getVersionNumber().then((value) => {
        this.versionNumber = value;

        // if (this.platform.is('ios')) getNewVersion(value, 'ios');
        // else if (this.platform.is('android')) getNewVersion(value, 'android');

      }).catch(reason => { this.versionNumber = reason; });
    });
  }
  ionViewWillLeave() {
    if (this.sub != undefined)
      this.sub.unsubscribe();
  }

}
