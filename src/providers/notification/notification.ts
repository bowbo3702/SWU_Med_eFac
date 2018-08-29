// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserloginProvider } from '../userlogin/userlogin';
import { ApiProvider } from '../api/api';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';
@Injectable()
export class NotificationProvider {

  constructor(private firebase: Firebase
    ,private storage :Storage
    ,private api: ApiProvider
    ,private userlogin: UserloginProvider
     ) {
    
  }
  Initialize_Push_Notification() {
    this.firebase.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      }
      else {
        if (this.api.isiOS) {
          this.firebase.grantPermission()
            .then((res: any) => { console.log('grantPermission: ' + res) })
            .catch(e => console.log('grantPermission-failed: ' + e));
        }
        else {
          console.log('We do not have permission to send push notifications');
        }
      }
    });

    this.firebase.getToken().then((token: string) => {
      console.log('Token: ', token);
      this.setToken(token);
    });

    if (this.api.isAndroid) {
      this.firebase.onNotificationOpen().subscribe((data: any) => {
        console.log('Received data message: ', data);
        //this.api.getToast(data.body, 'top', 5000).present();
      });
    }

    if (this.api.isiOS) {
      this.firebase.onNotificationOpen().pipe(tap(data => {
        console.log('Tap received data message: ', data);
        //this.api.getToast(data.body, 'top', 5000).present();
      })).subscribe();
    }
  }
  setToken(deviceToken) {
    this.storage.ready().then(() => {
      this.storage.set('Token', deviceToken);
      console.log('Set Token: ', deviceToken);
    });
  }
  // getNotifications(usercode?: string): Observable<any> {
  //   let param = {
  //     mode: 'getnoti',
  //     usercode: usercode || this.userlogin.userInfo.userCode
  //   };
  //   return this.api.post('notification.ashx', param);
  // }

  // readNotification(NotiId: string | number): Observable<any> {
  //   let param = {
  //     mode: 'readnoti',
  //     NotiId: NotiId
  //   };
  //   return this.api.post('notification.ashx', param);
  // }
}
