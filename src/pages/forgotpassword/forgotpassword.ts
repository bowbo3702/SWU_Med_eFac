import { Component } from '@angular/core';
import { NavController, NavParams , ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
//page
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  sEmailSWU: string;
  formForgot: FormGroup;
  txtEmail: FormControl;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private formBdr: FormBuilder
    , public toast: ToastController
    , public popup: AlertController) {
    //ตรวจสอบความถูกต้องของฟอร์ม เช่น required, minLength
     this.txtEmail = this.formBdr.control('',[ Validators.required,Validators.email]);
     this.formForgot = this.formBdr.group({ 'txtEmail': this.txtEmail});
  }
  ionViewDidLoad() {
  }
  BackToLogin(){
    this.navCtrl.pop();
  }
  SendEmail(){
    //รับข้อมูลจากฟอร์ม
    let sEmail = this.formForgot.controls['txtEmail'].value;
    if(sEmail!="")
    {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = re.test(sEmail);
      if(result)
      {
        console.log("valid.");
      }
      else{
         //แจ้งเตือนกรณีไม่กรอก
       this.presentToast("รูปแบบ E-mail ไม่ถูกต้อง");
      }
    }
    else
    {
       //แจ้งเตือนกรณีไม่กรอก
       this.presentToast("กรุณากรอก E-mail");
    }
    
  }
  //show toast
  presentToast(sMsg) {
    let toast = this.toast.create({
      message: sMsg,
      duration: 3000,
      position: 'buttom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }
}
