import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ScanbarcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scanbarcode',
  templateUrl: 'scanbarcode.html',
})
export class ScanbarcodePage {
  QR_DATA: string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public platform: Platform
    , private iBrowser: InAppBrowser
    , private barcodeScanner: BarcodeScanner
  ){
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanbarcodePage');
  }
  CallScaner() {
    this.barcodeScanner.scan({
      preferFrontCamera: false
      , showFlipCameraButton: false
      , showTorchButton: false
      , torchOn: false
      , disableAnimations: false
      , disableSuccessBeep: false
      // , prompt: "Do you want to next?"
      // , orientation: "portrait" 1000
      , resultDisplayDuration: 0
    }).then(barcodeData => {

      this.QR_DATA = barcodeData.text;
      if (barcodeData.text != "") {

        if (this.QR_DATA.startsWith("http://") || this.QR_DATA.startsWith("https://")) {

          this.openUrl(barcodeData.text, '_blank');
        } else {
          this.presentToastCtrl('QR Code Content is not protocol:' + this.QR_DATA, 6000, 'buttom');
        }
      }
    });
  }
  openUrl(_url, _target) {

    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(_url, _target, 'clearsessioncache=yes,clearcache=yes');

    });
  }
  presentToastCtrl(sMsg, nDuration, sPosition) {
    let toast = this.toast.create({
      message: sMsg,
      duration: nDuration,
      position: sPosition
    });

    toast.onDidDismiss(() => {
  
    });
    toast.present();
  }
}
