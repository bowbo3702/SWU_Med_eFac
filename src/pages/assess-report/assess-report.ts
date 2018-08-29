import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import {AssessmentProvider} from '../../providers/assessment/assessment';
import {UserloginProvider} from '../../providers/userlogin/userlogin';
import {UserAccount} from '../../models/UserAccount';
import { Subscription } from 'rxjs/Subscription'; //import Subscription เพื่อ unsubscribe() ข้อมูลจาก Server

@Component({
  selector: 'page-assess-report',
  templateUrl: 'assess-report.html',
})
export class AssessReportPage {
  @ViewChild('barAssess') barAssess: ElementRef;

  barChart1: any;
  ClassNo: any;
  TermNo: any;
  sUserCode: any;
  sub: Subscription;
  errorMessage: string;
  UserAccountData:UserAccount;

   constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private assessProv: AssessmentProvider,
        private usrProvider:UserloginProvider,
        private screenOrientation: ScreenOrientation
   ){
          // detect orientation changes
          this.screenOrientation.onChange().subscribe(() => {
            this.BindData();
        });
    }
  ionViewWillLeave() {
      this.sub.unsubscribe();
  }
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Loading...' });
        loading.present();//เริ่มแสดง Loading
    this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
      this.UserAccountData = usr;
      this.sUserCode = '54107010042';//usr.sUserID;
      this.ClassNo =3;
      this.TermNo =2;
      
      this.BindData();
      loading.dismiss();
    });
  }
  BindData() {
    let loading = this.loadingCtrl.create({ content: 'Loading...' });
    loading.present();//เริ่มแสดง Loading
    (new Promise(resolve => {

      this.LoadGraphAssess();
      resolve();

  }).then(data => { loading.dismiss(); }).catch(err => { loading.dismiss(); }));
  }
  LoadGraphAssess(){
    this.sub = this.assessProv.getBilledQtyPeriod(this.sUserCode, this.ClassNo, this.TermNo).subscribe(res => {
    let backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(163, 255, 94, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 99, 132, 0.2)'];


  let borderColor = [
      'rgba(255,99,132,1)',
      'rgba(77, 165, 10,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)',
      'rgba(255,99,132,1)'];
      if (this.barChart1) this.barChart1.chart.destroy();
      this.barChart1 = this.generateBarChart(this.barAssess, res.lstLabels, res.lstDataSet, backgroundColor, borderColor);
  }, err => this.errorMessage = <any>err);
  }
  generateBarChart(barCanvas, labels, dataset, backgroundColor, borderColor) {
    console.log(labels);   console.log(dataset);
    let data =[];
    let idx=0;
    (dataset).forEach(element => {
      let item ={
        label: element.label,
        data: element.lstData,
        backgroundColor: backgroundColor[idx],
        borderColor: borderColor[idx],
        borderWidth: 1
        }
        data.push(item);
        idx++;
    });
    console.log(data);
    return new Chart(barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        let numberWithCommas = (x) => {
                            var parts = x.toString().split(".");
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            return parts.join(".");
                        };

                        var allData = data.datasets[tooltipItem.datasetIndex].data;
                        var tooltipLabel = data.labels[tooltipItem.index];
                        var tooltipData = allData[tooltipItem.index];
                        return tooltipLabel + ': ' +
                            (tooltipData >= 1000 ? numberWithCommas(tooltipData.toFixed(2)) : tooltipData.toFixed(2));
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                          if (Math.floor(label) === label) {
                            return label;
                          }
                        },
                        callback: function (value, index, values) {
                            let numberWithCommas = (x) => {
                                var parts = x.toString().split(".");
                                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                return parts.join(".");
                            };

                            if (parseInt(value) >= 1000) {
                                return numberWithCommas(value);
                            } else if (value < 1) {
                                return value.toFixed(1);;
                            } else {
                                return value;
                            }
                        }
                    }
                }]
            }
        }
    });
}
}
