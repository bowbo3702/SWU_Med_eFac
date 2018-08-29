import { NgModule, ErrorHandler,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ScanbarcodePage } from '../pages/scanbarcode/scanbarcode';
import { LockscreenPage } from '../pages/lockscreen/lockscreen';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { SetpinPage } from '../pages/setpin/setpin';
import { ConfirmpinPage } from '../pages/confirmpin/confirmpin'
import {MenuPage} from '../pages/menu/menu';
import {MeetingDetailPage} from '../pages/meeting-detail/meeting-detail';
import  {MeetingListPage} from '../pages/meeting-list/meeting-list';
import { AssessReportPage} from '../pages/assess-report/assess-report';
import {SchedulePage} from '../pages/schedule/schedule';
import {ProfilePage} from '../pages/profile/profile';
import {ChangePinPage} from '../pages/change-pin/change-pin';
import {SetPinNewPage} from '../pages/set-pin-new/set-pin-new';
import {ConfirmPinNewPage} from '../pages/confirm-pin-new/confirm-pin-new';
import {AppInfoPage} from '../pages/app-info/app-info';
import {ScheduleDetailPage} from '../pages/schedule-detail/schedule-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { UserloginProvider } from '../providers/userlogin/userlogin';
import { CommonProvider } from '../providers/common/common';
import {OmmMeetingListProvider} from  '../providers/omm-meeting-list/omm-meeting-list';
import { AutoCompletePersonPage} from '../pages/auto-complete-person/auto-complete-person';
import { AssessmentProvider } from '../providers/assessment/assessment';
import { ScheduleProvider } from '../providers/schedule/schedule';
import { NotificationProvider } from '../providers/notification/notification';


//plugin
import {Network} from '@ionic-native/network';
import {SQLite} from '@ionic-native/sqlite';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Camera} from '@ionic-native/camera';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import { TouchID } from '@ionic-native/touch-id';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AppVersion } from '@ionic-native/app-version';
import { NgCalendarModule } from 'ionic2-calendar';
import { DatePicker } from '@ionic-native/date-picker';
import { Firebase } from '@ionic-native/firebase';

// import { DocumentViewer } from '@ionic-native/document-viewer';
// import { FileOpener } from '@ionic-native/file-opener';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ScanbarcodePage,
    LockscreenPage,
    ForgotpasswordPage,
    SetpinPage,
    ConfirmpinPage,
    MenuPage,
    MeetingDetailPage,
    MeetingListPage,
    AutoCompletePersonPage,
    AssessReportPage,
    SchedulePage,
    ProfilePage,
    ChangePinPage,
    SetPinNewPage,
    ConfirmPinNewPage,
    AppInfoPage,
    ScheduleDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //config storage module
    IonicStorageModule.forRoot(),
    HttpModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ScanbarcodePage,
    LockscreenPage,
    ForgotpasswordPage,
    SetpinPage,
    ConfirmpinPage,
    MenuPage,
    MeetingDetailPage,
    MeetingListPage,
    AutoCompletePersonPage,
    AssessReportPage,
    SchedulePage,
    ProfilePage,
    ChangePinPage,
    SetPinNewPage,
    ConfirmPinNewPage,
    AppInfoPage,
    ScheduleDetailPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'th-TH' },
    //Provider
    ApiProvider,
    UserloginProvider,
    CommonProvider,
    OmmMeetingListProvider,
    AssessmentProvider,
    ScheduleProvider,
    NotificationProvider,
    //Plugin
    Network,
    SQLite,
    InAppBrowser,
    Camera,
    BarcodeScanner,
    FingerprintAIO,
    TouchID,
    AndroidFingerprintAuth,
    ScreenOrientation,
    AppVersion,
    DatePicker,
    Firebase,
  //FileOpener,
  //DocumentViewer,
  ]
})
export class AppModule {}
