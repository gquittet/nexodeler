import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';
import { Theme } from '../../app/objects/Theme';
import { AlertLoading } from '../../app/objects/ionic/AlertLoading';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { SettingsService } from '../../app/services/settings/settings.service';



declare var ping: any;

@IonicPage()
@Component({
  selector: 'page-add-robot',
  templateUrl: 'add-robot.html'
})
export class AddRobotPage {

  addForm: FormGroup;
  robots: Robot[];

  private _errorText: string;
  private _errorRobotAlreadyExit: string;
  private _errorUnableToGetRobotName: string;
  private _errorVerifyNetworkConnection: string;
  private _okText: string;

  private _loading: AlertLoading;

  // Theme
  private _theme: Theme;

  // Subscription
  private _takeWhile: boolean = true;

  constructor(private _fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private _alertCtrl: AlertController, loadingCtrl: LoadingController, private _robotsService: RobotsService, private _alSystemService: ALSystemService, translate: TranslateService, settingsService: SettingsService) {
    this.addForm = this._fb.group({
      'number1': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number2': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number3': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number4': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])]
    });
    this._loading = new AlertLoading(loadingCtrl, translate, settingsService);
    settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
    translate.get('ERROR.ERROR').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorText = res);
    translate.get('ERROR.ROBOT_ALREADY_EXIST_IN_YOUR_LIST').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorRobotAlreadyExit = res);
    translate.get('ERROR.UNABLE_TO_GET_ROBOT_NAME').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorUnableToGetRobotName = res);
    translate.get('ERROR.VERIFY_NETWORK_CONNECTION').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorVerifyNetworkConnection = res);
    translate.get('OK').takeWhile(() => this._takeWhile).subscribe((res: string) => this._okText = res);
  }

  ionViewWillEnter(): void {
    this.robots = this.navParams.get('robots');
  }

  save(): void {
    const ip = new IP([this.addForm.controls['number1'].value, this.addForm.controls['number2'].value, this.addForm.controls['number3'].value, this.addForm.controls['number4'].value]);
    this._loading.show();
    ping('http://' + ip.toString()).then(delta => {
      const timer = setTimeout(() => {
        this._loading.close();
        this._alertCtrl.create({
          title: this._errorText,
          subTitle: this._errorUnableToGetRobotName,
          cssClass: this._theme.class,
          buttons: [this._okText]
        }).present();
      }, 5000);
      QiService.connect(ip);
      this._alSystemService.getName().then(robotName => {
        const robot = new Robot(robotName, ip.toString());
        let canAddTheRobot: boolean = true;
        for (let r of this.robots) {
          if (r.name === robot.name && r.ip === robot.ip) {
            this._alertCtrl.create({
              title: this._errorText,
              subTitle: this._errorRobotAlreadyExit,
              cssClass: this._theme.class,
              buttons: [this._okText]
            }).present();
            canAddTheRobot = false;
            break;
          }
        }
        if (canAddTheRobot) {
          this.robots.push(robot);
          this._robotsService.next(this.robots);
        }
        clearTimeout(timer);
        this._loading.close();
        this.goBack();
      }).catch(error => {
        clearTimeout(timer);
        this._loading.close();
        this._alertCtrl.create({
          title: this._errorText,
          subTitle: this._errorUnableToGetRobotName,
          cssClass: this._theme.class,
          buttons: [this._okText]
        }).present();
      });
    }).catch(err => {
      this._loading.close();
      this._alertCtrl.create({
        title: this._errorText,
        subTitle: this._errorVerifyNetworkConnection,
        cssClass: this._theme.class,
        buttons: [this._okText]
      }).present();
    });
  }

  goBack(): void {
    this.navCtrl.remove(this.viewCtrl.index, 1);
  }

  ionViewWillLeave(): void {
    this._takeWhile = false;
    QiService.disconnect();
  }
}