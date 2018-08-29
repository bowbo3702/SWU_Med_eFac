import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Toast, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform} from 'ionic-angular';
//
import { UserAccount } from '../../models/UserAccount';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
//page
import { SetPinNewPage } from '../set-pin-new/set-pin-new';
@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {
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
    ,public platform:Platform) {
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
        //this.presentToast(this.platform.platforms());
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
                  console.log("res2.sResult : "+ res2.sResult);
                  console.log("this.usrProvider.getUserInfoByUserName res2 : " + res2);
              });
             }
            });
             
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
  Submit():void
  {
    if(this.sPIN.length == 5 ){
      let PIN ="";
      this.storage.get('PIN').then((val) => {
        //check pin .
        if(this.sPIN == val){
            console.log("Submit LockScreen:"+ this.UserAccountData);
            // go to set pin
            this.navCtrl.push(SetPinNewPage).then(() => {
              let index = 1;
              this.navCtrl.remove(this.navCtrl.getPrevious().index);
            });
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
}
