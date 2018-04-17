import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ViewController, AlertController, LoadingController, IonicPage, NavParams } from 'ionic-angular';

import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { TranslateService } from '@ngx-translate/core';

declare var ping: any;

@IonicPage()
@Component({
  selector: 'page-add-robot',
  templateUrl: 'add-robot.html'
})
export class AddRobotPage {

  addForm: FormGroup;
  robots: Robot[];

  private errorText: string;
  private errorUnableToGetRobotName: string;
  private errorVerifyNetworkConnection: string;
  private pleaseWaitText: string;
  private okText: string;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private robotsService: RobotsService, private alSystemService: ALSystemService, translate: TranslateService) {
    this.addForm = this.fb.group({
      'number1': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number2': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number3': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number4': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])]
    });
    translate.get('PLEASE_WAIT').subscribe((res: string) => this.pleaseWaitText = res);
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('ERROR.UNABLE_TO_GET_ROBOT_NAME').subscribe((res: string) => this.errorUnableToGetRobotName = res);
    translate.get('ERROR.VERIFY_NETWORK_CONNECTION').subscribe((res: string) => this.errorVerifyNetworkConnection = res);
    translate.get('OK').subscribe((res: string) => this.okText = res);
  }

  ionViewWillEnter(): void {
    this.robots = this.navParams.get('robots');
  }

  save(): void {
    const ip = new IP([this.addForm.controls['number1'].value, this.addForm.controls['number2'].value, this.addForm.controls['number3'].value, this.addForm.controls['number4'].value]);
    const loading = this.loadingCtrl.create({
      content: this.pleaseWaitText
    });
    loading.present();
    ping('http://' + ip.toString()).then(delta => {
      const timer = setTimeout(() => {
        loading.dismiss();
        this.alertCtrl.create({
          title: this.errorText,
          subTitle: this.errorUnableToGetRobotName,
          buttons: [this.okText]
        }).present();
      }, 5000);
      QiService.connect(ip);
      this.alSystemService.getName().then(robotName => {
        const robot = new Robot(robotName, ip.toString());
        this.robots.push(robot);
        this.robotsService.update(this.robots);
        clearTimeout(timer);
        loading.dismiss();
        this.goBack();
      }, error => {
        this.alertCtrl.create({
          title: this.errorText,
          subTitle: this.errorUnableToGetRobotName,
          buttons: [this.okText]
        }).present();
      });
    }).catch(err => {
      loading.dismiss();
      this.alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorVerifyNetworkConnection,
        buttons: [this.okText]
      }).present();
    });
  }

  goBack(): void {
    this.navCtrl.remove(this.viewCtrl.index, 1);
    QiService.disconnect();
  }
}