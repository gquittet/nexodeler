import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController, Loading } from 'ionic-angular';
import { ALBehaviorManager } from '../../app/services/naoqi/albehaviormanager.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AlertCombobox } from '../../components/objects/alert/AlertCombobox';
import { TranslateService } from '@ngx-translate/core';
import { RobotsService } from '../../app/services/robots/robots.service';
import { File } from '@ionic-native/file';
import { Robot } from '../../app/objects/Robot';
import { QiService } from '../../app/services/naoqi/qi.service';
import { IP } from '../../app/objects/IP';

import * as Rx from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

declare var pingRobot: any;

@IonicPage()
@Component({
  selector: 'page-list-choregraphies',
  templateUrl: 'list-choregraphies.html',
})
export class ListChoregraphiesPage {

  private robotsAlertCombobox: AlertCombobox;

  searchControl: FormControl;
  searchTerm: string = '';
  searching: boolean;

  private robots: Robot[];
  private dataSubscription: Subscription;

  private cancelText: string;
  private connectText: string;
  private choregraphyFinishedText: string;
  private errorBehaviorStartText: string;
  private errorNoRobotFoundText: string;
  private errorText: string;
  private informationText: string;
  private okText: string;
  private pleaseWaitText: string;
  private robotsText: string;

  private loading: Loading;

  choregraphies: string[];
  searchResults: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, translate: TranslateService, private file: File, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private robotsService: RobotsService, private alBehaviorManager: ALBehaviorManager) {
    this.searchControl = new FormControl();
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('ERROR.ERROR_BEHAVIOR_START').subscribe((res: string) => this.errorBehaviorStartText = res);
    translate.get('ERROR.NO_ROBOT_FOUND').subscribe((res: string) => this.errorNoRobotFoundText = res);
    translate.get('UI.ALERT.TITLE.INFORMATION.INFORMATION').subscribe((res: string) => this.informationText = res);
    translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.CHOREGRAPHY_FINISHED').subscribe((res: string) => this.choregraphyFinishedText = res);
    translate.get('PLEASE_WAIT').subscribe((res: string) => this.pleaseWaitText = res);
    translate.get("VERBS.CANCEL").subscribe((res: string) => this.cancelText = res);
    translate.get("VERBS.CONNECT").subscribe((res: string) => this.connectText = res);
    translate.get("OK").subscribe((res: string) => this.okText = res);
    translate.get("ROBOTS").subscribe((res: string) => this.robotsText = res);
  }

  ionViewDidLoad(): void {
    this.loading = this.loadingCtrl.create({
      content: this.pleaseWaitText
    });
    this.loading.present();
    this.file.checkFile(this.file.dataDirectory, this.robotsService.FILE_NAME).then(res => {
      if (res) {
        this.file.readAsText(this.file.dataDirectory, this.robotsService.FILE_NAME).then(data => {
          this.robots = JSON.parse(data);
          this.robotsService.next(this.robots);
        });
      }
    }, err => { });
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this.dataSubscription = this.robotsService.robots.subscribe((robots: Robot[]) => this.robots = robots);
    this.robotsAlertCombobox = new AlertCombobox(this.alertCtrl);
    this.showRobotsAlertCombobox();
  }

  private showRobotsAlertCombobox(): void {
    const robotsAlertCombobox = this.robotsAlertCombobox.create(this.robotsText);
    const promises = [];
    this.robots.forEach((robot: Robot) => {
      promises.push(pingRobot(robot));
    });
    let index = 1;
    let pass = 0;
    promises.forEach((promise) => {
      promise.then(robot => {
        pass++;
        robotsAlertCombobox.addInput({
          type: 'radio',
          label: robot.name + ' (' + robot.ip + ')',
          value: robot.ip,
          checked: false
        });
        if (++index === promises.length) {
          this.loading.dismiss();
          this.robotsAlertCombobox.present();
        }
      }).catch(err => {
        console.log('[ERROR][PING][ROBOTS] Unable to find the robot.')
        if (++index === promises.length) {
          this.loading.dismiss();
          if (pass === 0) {
            this.alertCtrl.create({
              title: this.errorText,
              subTitle: this.errorNoRobotFoundText,
              buttons: [this.okText]
            }).present();
            this.navCtrl.remove(this.viewCtrl.index, 1);
          } else
            this.robotsAlertCombobox.present();
        }
      });
    });
    robotsAlertCombobox.addButton({
      text: this.cancelText,
      handler: () => {
        this.robotsAlertCombobox.close();
        this.navCtrl.remove(this.viewCtrl.index, 1);
      }
    });
    robotsAlertCombobox.addButton({
      text: this.connectText,
      handler: data => {
        this.robotsAlertCombobox.close();
        QiService.connect(new IP(data.split('.')));
        this.dataSubscription.unsubscribe();
        this.loading = this.loadingCtrl.create({
          content: this.pleaseWaitText
        });
        this.loading.present();
        this.alBehaviorManager.getInstalledBehaviors().then(installedBehaviors => {
          this.choregraphies = installedBehaviors;
          this.searchResults = this.choregraphies;
          this.loading.dismiss();
        });
        this.robotsAlertCombobox.setResult(data);
      }
    });
  }

  startBehavior(name: string) {
    this.loading = this.loadingCtrl.create({
      content: this.pleaseWaitText
    });
    this.loading.present();
    this.alBehaviorManager.startBehavior(name).then(result => {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: this.informationText,
        subTitle: this.choregraphyFinishedText,
        buttons: [this.okText]
      }).present();
      console.log("[INFO][NAOQI][ALBehaviorManager] startBehavior(): finished.");
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorBehaviorStartText,
        buttons: [this.okText]
      }).present();
      console.error("error")
    });
  }

  private filterItems(): void {
    this.searchResults = this.choregraphies.filter((choregraphy: string) => choregraphy.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
  }

  stopAll(): void {
    this.alBehaviorManager.stopAllBehaviors();
  }

  ionViewWillLeave(): void {
    QiService.disconnect();
  }
}
