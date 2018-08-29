import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import page
import { HomePage } from '../home/home';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import {SetpinPage} from '../setpin/setpin';
import {LockscreenPage} from '../lockscreen/lockscreen';
//import provider
import { UserloginProvider } from '../../providers/userlogin/userlogin';

//models
import { UserAccount } from '../../models/UserAccount';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  sUsername: string;
  sUsername1: string;
  sPassword: string;
  formLogin: FormGroup;
  txtUsername: FormControl;
  txtPassword: FormControl;
  UserData: UserAccount;
  isLogin: boolean;
  isLogout:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private formBdr: FormBuilder
    , public toast: ToastController
    , public alert: AlertController
    , public loading: LoadingController
    , public usrProv: UserloginProvider
    , public platform: Platform
    , public storage: Storage
  ){
     //ตรวจสอบความถูกต้องของฟอร์ม เช่น required, minLength
     this.txtUsername = this.formBdr.control('', Validators.required);
     this.txtPassword = this.formBdr.control('', Validators.compose([Validators.required, Validators.minLength(8)]));
     this.formLogin = this.formBdr.group({ 'txtUsername': this.txtUsername, 'txtPassword': this.txtPassword });
     //Create Table Login
     this.usrProv.CreateTableLogin();
     this.isLogout = this.navParams.get("mode") + "" =="logout";
     console.log('constructor LoginPage');
     console.log(this.isLogout);
     if(this.isLogout){
      this.usrProv.logout().then(res => {
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter')
    if(!this.isLogout)
    {
      //เมื่อเข้าหน้า login ให้ตรวจสอบก่อนว่าเคย login แล้วยัง หากเคยให้ไปยังหน้า Lock screen
      this.usrProv.isLogin().then((res: boolean) => {
        this.isLogin = res;
        console.log('page-login isLogin:' + this.isLogin);
        if (this.isLogin) {
          this.usrProv.isLogged().then((val: boolean) => {
            console.log('isLogin check local stroge')
            console.log(val);
            if (val) {
              this.storage.set("IsLogined", true);
              this.navCtrl.setRoot(LockscreenPage);
              return false;
            } else { return false; }
          });
        }
        else { return false; }
      });
    }
  }
  ForgotPassword(){
    this.navCtrl.push(ForgotpasswordPage, { }, { animate: false });
  }

 Login()
  {
      //รับข้อมูลจากฟอร์ม
      this.storage.ready().then(() => { 
      let sUsername = this.formLogin.controls['txtUsername'].value;
      let sPassword = this.formLogin.controls['txtPassword'].value;
      console.log("sUsername " + sUsername);
      console.log("sPassword " + sPassword);
      if (sUsername != undefined && sUsername != "" && sPassword != ""&& sPassword != undefined) {
        this.usrProv.login(sUsername, sPassword).then((res: UserAccount) => {
          this.UserData=res;
          if (res != undefined && res.sResult != null) {
            //login success
            console.log("res " + res.sFirstName);
            if (res.sResult == "Success") {
              this.storage.set("IsLogined", true);
              this.storage.get('PIN').then((sPinCode: string) => {
                console.log('login storage.get PIN :' + sPinCode);
              });
                //go to Set PIN
                this.navCtrl.setRoot(SetpinPage, { UserAccountData: res});
            }
            else {
              //แจ้งเตือนกรณี login not success
              let alert = this.alert.create({ title: res.sMsg1, buttons: ['ตกลง'] });
              alert.present();
            }
          }
          else {
            this.presentToast("ไม่พบผู้ใช้");
          }
        }).catch(error => {
          this.presentToast("Login error." + "=>" + error);
        });
      }
      else {
        if (sUsername == undefined||sUsername == "" )
        {
          //แจ้งเตือนกรณีไม่กรอก username 
          this.presentToast("กรุณากรอกชื่อผู้ใช้");
        }
        else{
          //แจ้งเตือนกรณีไม่กรอก  password
          this.presentToast("กรุณากรอกรหัสผ่าน");
        }
      }
    }).catch((err)=>{
        console.log(err);
      });
}
    //show toast
    presentToast(sMsg) {
      let toast = this.toast.create({
        message: sMsg,
        duration: 8000,
        position: 'buttom'
      });
      toast.onDidDismiss(() => {
        //console.log('Dismissed toast');
      });
      toast.present();
    }
}
