import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Toast, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform} from 'ionic-angular';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { App } from 'ionic-angular';
//
import { UserAccount } from '../../models/UserAccount';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
//page
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-lockscreen',
  templateUrl: 'lockscreen.html', 
})
export class LockscreenPage {
  UserAccountData:UserAccount;
  sUsername:string;
  sPIN :string;
  sPIN1 :string;
  sPIN2 :string;
  sPIN3 :string;
  sPIN4 :string;
  sPIN5 :string;
  sPIN6 :string;
  isShowBtnBackSpace:boolean;
  isTouchIdAvailable:boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public storage:Storage
    ,public alert:AlertController
    ,public toast:ToastController
    ,public usrProvider:UserloginProvider
    ,public platform:Platform
    ,public touchId :TouchID
    ,private androidFingerprintAuth: AndroidFingerprintAuth
    ,public app: App
    //,private fingerAIO :FingerprintAIO
  ) {
        this.sPIN ="";
        this.sPIN1 ="";
        this.sPIN2 ="";
        this.sPIN3 ="";
        this.sPIN4 ="";
        this.sPIN5 ="";
        this.sPIN6 ="";
        this.sUsername="";
        this.isShowBtnBackSpace=false;
        this.isTouchIdAvailable=false;
        this.platform.ready().then(() => { 
          this.usrProvider.getUserNameFromStorage().then((res:string)=>{
            console.log(" this.usrProvider.getUserNameFromStorage() res : "+res);
            if(res != null && res != undefined &&res != ""){
              this.sUsername = res;
              console.log(" this.sUsername = res:"+ this.sUsername);
              this.usrProvider.getUserInfoByUserName(this.sUsername).then((res2: UserAccount) => {
                    this.UserAccountData = res2;
                    if (res2 != undefined && res2.sResult=="Success") 
                    {
                      this.storage.ready().then(() => { this.storage.set('useraccount', res2); });
                    }
                    console.log("this.usrProvider.getUserInfoByUserName res2 : ");
                    console.log(res2);
                });
               }
              });
                if(this.platform.is("ios")){
                  if(this.CheckTuchID()){
                    this.isTouchIdAvailable=true;
                    this.CallTuchID();
                  }
                }
                else if(this.platform.is("android")){
                  if(this.CheckFingerAndroid()){
                    let alert = this.alert.create({ title: "FingerAndroid is isAvailable ture", buttons: ['ตกลง'] });
                    alert.present();
                    this.CallFingerPrintAndroid();
                  }
                }
                else 
                {
                  if(this.CheckFingerAndroid()){
                    let alert = this.alert.create({ title: "FingerAndroid is isAvailable ture", buttons: ['ตกลง'] });
                    alert.present();
                    this.CallFingerPrintAndroid();
                  }
                }
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockscreenPage');
  }
  AddNumber(sNumber:string):void
  {
    let sBullet="•";
    let nIndex = this.sPIN.length;
    if(nIndex <= 4){
        if(nIndex==0){
          this.sPIN1 = sBullet; 
          this.sPIN2 ="";
          this.sPIN3 ="";
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==1){
          this.sPIN2 =sBullet;
          this.sPIN3 ="";
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==2){
          this.sPIN3 =sBullet;
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==3){
          this.sPIN4 =sBullet;
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==4){
          this.sPIN5 =sBullet;
          this.sPIN6 ="";
        }
        if(nIndex <= 4)
        {
          this.sPIN = this.sPIN + sNumber;
        }
    }
   else{

   }
   this.isShowBtnBackSpace = (this.sPIN.length>0);
   console.log('isShowBtnBackSpace:'+ this.isShowBtnBackSpace);
   console.log('pin:'+ this.sPIN);
  }

  DelNumber():void{
    let nLength = this.sPIN.length;
    console.log('length:'+ nLength);
    let nIndex = this.sPIN.length-1;
    console.log('index:'+ nIndex);
    if(nLength > 0){
      let sPINOld=this.sPIN;
      this.sPIN = sPINOld.substring(0,nLength-1);
      if(nIndex == 0){
        this.sPIN1 ="";
      }
      else if(nIndex == 1){
        this.sPIN2 ="";
      }
      else if(nIndex == 2){
        this.sPIN3 ="";
      }
      else if(nIndex == 3){
        this.sPIN4 ="";
      }
      else if(nIndex == 4){
        this.sPIN5 ="";
      }
    }
    console.log('pin:'+ this.sPIN);
    this.isShowBtnBackSpace = (this.sPIN.length>0);
    console.log('isShowBtnBackSpace:'+ this.isShowBtnBackSpace);
  }
  LoginByPIN():void
  {
    if(this.sPIN.length == 5 ){
      let PIN ="";
      this.storage.get('PIN').then((val) => {
        //check pin .
        if(this.sPIN == val){
            console.log("Submit LockScreen:"+ this.UserAccountData);
            // go to Home page.
            this.navCtrl.setRoot(TabsPage);
            //this.navCtrl.push(HomePage,{UserAccountData:this.UserAccountData},{animate:false});
        }
        else
        {
          //Alert when PIN is wrong
          let alert = this.alert.create({ title: "รหัสผ่านไม่ถูกต้อง", buttons: ['ตกลง'] });
          alert.present();
        }
      });
    }
    else
    {
       //Alert when PIN length != 5
       let alert = this.alert.create({ title: "รหัสผ่านไม่ถูกต้อง", buttons: ['ตกลง'] });
       alert.present();
    }
  }
  presentToast(sMsg) {
    let toast = this.toast.create({
      message: sMsg,
      duration: 3000,
      position: 'buttom'
    });
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
    toast.present();
  }
  //----------------- Finger iOS --------------------
  CheckTuchID():boolean
  {
    let result = false;
      this.touchId.isAvailable()
    .then(
      res => {console.log('TouchID is available!');result=true;},
      err => {console.error('TouchID is not available', err);result =false;}
    );
    return result
  }
  CallTuchID(){
    this.touchId.isAvailable()
    .then(
      res => {
        // console.log('TouchID is available!')
        // this.presentToastCtrl('TouchID is available!', 4000, 'top'); 
        this.touchId.verifyFingerprint('Scan your TouchID ')
          .then(
            res => {
              // console.log('Ok', res);
              // this.presentToast('OK:' + res);
              this.navCtrl.setRoot(TabsPage);
            },
            err => {
              console.error('Error:', err);
              this.presentToast('Error:' + err);
            }
          )
          .catch((error: any) => {
            this.presentToast(error);
            console.log('err: ', error);
          });

      },
      err => {
        console.error('TouchID is not available', err)
        this.presentToast('TouchID is not available ' + err);
      }
    )
    .catch((error: any) => {
      this.presentToast('err: '+ error);
    });

  }
  // Finger android
  CheckFingerAndroid():boolean
  {
    let result = false;
    this.androidFingerprintAuth.isAvailable().then((res)=> {
      // it is available
      result = res.isAvailable;
      //this.presentToast(result);
    }).catch(error =>  this.presentToast(error));
   return result;
  }
  

  CallFingerPrintAndroid(){
   let encryptConfig = {
      clientId: "swu_med_efac_key",
      username: "swu_med_efac",
      password: "12345678",
      disableBackup:true,
      locale:"th_TH"
  };
    this.androidFingerprintAuth.isAvailable().then((result)=> {
     if(result.isAvailable){
      // it is available
      this.androidFingerprintAuth.encrypt(encryptConfig,).then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
               this.navCtrl.setRoot(TabsPage);
           }else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));
  }
  Reset(){
    let alert = this.alert.create({
      title: 'ยืนยัน',
      message: 'การ Reset คุณจะต้อง Login ใหม่ กรุณายืนยันการดำเนินการ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.navCtrl.setRoot(LoginPage,{'mode':'logout'});
          }
        }
      ]
    });
    alert.present();
  }
}
