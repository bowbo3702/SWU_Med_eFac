import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { ApiProvider } from '../api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//เอาไว้หน่วงเซิฟเวอร์
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { UserAccount } from '../../models/UserAccount';

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class UserloginProvider {
  useraccount :UserAccount
  constructor(public http: Http,public apiProv: ApiProvider    
    , public platform: Platform
    , public sqlite: SQLite
    , public storage: Storage) {
    
  }
  getUserNameFromStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("username").then((value: UserAccount) => resolve(value), (reason) => reject(false));
      });
    });
  }
  getUserInfoByUserName(sUserName: string): Promise<any> {
    console.log("getUserInfoByUserName :" + sUserName)
    let sApiFileName = 'std_login.ashx?mode=get_info_by_user_name&username=' + sUserName + '';
    return new Promise((resolve, reject) => {
      this.apiProv.getApiEndpoint(sApiFileName).subscribe(res => {
        let useraccount: UserAccount;
        if (res != undefined && res.sUserName != null) {
          useraccount = res;
          console.log("getUserInfoByUserName res :" + res)
        }
        else {
          useraccount = res;
          console.log("useraccount sResult :Failed");
          console.log(res);
          useraccount.sResult = "Failed";
        }
        resolve(useraccount);
      }, (error) => reject(false))
    });
  }
  getUserAccountFromLocalStorage(): Promise<UserAccount> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("useraccount").then((value: UserAccount) => {
          let lstUsr = value;
          this.storage.get("PIN").then((pin_val: string) => { lstUsr.sPIN = pin_val; });

          resolve(lstUsr)
        }, (reason) => reject(false));
      });
    });
  }
  // login(sUserName: string, sPassword: string): Observable<UserAccount>{
  //  return this.apiProv.getApiEndpoint('std_login.ashx?mode=login&username='+sUserName+'&password='+sPassword+'');
  // }
   //create table login local
   CreateTableLogin(): void {
    if (this.platform.ready()) {
      // ถ้า platform พร้อมใช้งาน
      this.platform.ready().then(() => {
        // สร้างฐานข้อมูลชื่อว่า data.db
        this.sqlite.create({
          name: "data.db", location: "default"
        })
          .then((db: SQLiteObject) => {
            //หากยังไม่มีตาราง login ก็ให้สร้างตารางใหม่ หากมีแล้วก็ไม่ต้องสร้าง
            db.executeSql("CREATE TABLE IF NOT EXIST T_LOGIN (id INTEGER PRIMAY KEY AUTOINCREMENT, sUserName VARCHAR(20) ,sUserCode VARCHAR(11) ,sPin VARCHAR(10))",[])
              .then((data) => { }, (error) => { });
          }, (error) => { });
      });
    }
  }
  //check username and password
  chkUsernamePassword(sUserName: string, sPassword: string): Observable<UserAccount> {
    let sApiFileName = 'std_login.ashx?mode=login&username=' + sUserName + '&password=' + sPassword + '';
    return this.apiProv.getApiEndpoint(sApiFileName);
  }
  //Login
  login(sUserName: string, sPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chkUsernamePassword(sUserName, sPassword).subscribe(res => {
        let useraccount: UserAccount;
        let isSuccess = res != undefined ;//&& res.sResult != null
        console.log("prv  " + res.sResult);
        if (isSuccess) {
          useraccount = res;
        }
        else {
          useraccount.sResult = "Failed";
          useraccount.sMsg1 = "Login not success.";
        }
        resolve(useraccount);
      }, (error) => reject(error));
    });
  }
  isLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("username").then((value: string) => resolve(value != undefined && value != null), (reason) => reject(false));
      });
    });
  }
  isLogged(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        console.log(this.storage.get("IsLogined"))
        this.storage.get("IsLogined").then((value: boolean) => resolve(value != undefined && value != null && value == true), (reason) => reject(false));
      });
    });
  }
  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("useraccount").then((value: UserAccount) => {
          //ลบออกจากฐานข้อมูล
          if (this.platform.ready()) {
            this.sqlite.create({
              name: "data.db", location: "default"
            }).then((db: SQLiteObject) => {
              db.executeSql("DELETE FROM T_LOGIN WHERE sUserName=?", [value.sUserName])
                .then((data) => { }, (error) => { });
            });
          }
          this.storage.remove('useraccount');
            this.storage.remove('username'); 
            this.storage.remove('PIN');
             // set is flog logined
           this.storage.set('IsLogined', false);
           resolve(resolve);
        }, () => reject(false));
      });
    });
  }
}
