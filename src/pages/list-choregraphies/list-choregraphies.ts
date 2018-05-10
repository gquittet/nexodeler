import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content, IonicPage, Loading, LoadingController, NavController, NavParams, ViewController, VirtualScroll } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import { AlertRadioButton } from '../../app/objects/AlertRadioButton';
import { Behavior } from '../../app/objects/Behavior';
import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';
import { ALBehaviorManager } from '../../app/services/naoqi/albehaviormanager.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';


declare var pingRobot: any;

@IonicPage()
@Component({
  selector: 'page-list-choregraphies',
  templateUrl: 'list-choregraphies.html',
})
export class ListChoregraphiesPage {

  private robotsAlertCombobox: AlertRadioButton;
  private loading: Loading;

  searchControl: FormControl;
  searchTerm: string = '';
  searching: boolean;
  @ViewChild('content') content: Content;
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;

  private robots: Robot[];
  private dataSubscription: Subscription;

  private cancelText: string;
  private connectText: string;
  private choregraphyStartingText: string;
  private errorAddAtLeastOneRobotText: string;
  private errorNetworkDisconnectedText: string;
  private errorBehaviorStartText: string;
  private errorNoRobotFoundText: string;
  private errorText: string;
  private informationText: string;
  private okText: string;
  private pleaseWaitText: string;
  private robotsText: string;

  private isConnectedToWireless: Subscription;

  choregraphies: Behavior[];
  searchResults: Behavior[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private translate: TranslateService, network: Network, private file: File, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private robotsService: RobotsService, private alBehaviorManager: ALBehaviorManager) {
    this.searchControl = new FormControl();
    this.choregraphies = [];
    this.searchResults = [];
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('ERROR.NETWORK_DISCONNECTED').subscribe((res: string) => this.errorNetworkDisconnectedText = res);
    translate.get('ERROR.ADD_AT_LEAST_A_ROBOT').subscribe((res: string) => this.errorAddAtLeastOneRobotText = res);
    translate.get('ERROR.ERROR_BEHAVIOR_START').subscribe((res: string) => this.errorBehaviorStartText = res);
    translate.get('ERROR.NO_ROBOT_FOUND').subscribe((res: string) => this.errorNoRobotFoundText = res);
    translate.get('UI.ALERT.TITLE.INFORMATION.INFORMATION').subscribe((res: string) => this.informationText = res);
    translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.CHOREGRAPHY_STARTING').subscribe((res: string) => this.choregraphyStartingText = res);
    translate.get('PLEASE_WAIT').subscribe((res: string) => this.pleaseWaitText = res);
    translate.get("VERBS.CANCEL").subscribe((res: string) => this.cancelText = res);
    translate.get("VERBS.CONNECT").subscribe((res: string) => this.connectText = res);
    translate.get("OK").subscribe((res: string) => this.okText = res);
    translate.get("ROBOTS").subscribe((res: string) => this.robotsText = res);
    this.isConnectedToWireless = network.onDisconnect().subscribe(() => {
      console.log('[INFO][NETWORK] Network access disconnected.');
      this.alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorNetworkDisconnectedText,
        buttons: [{
          text: this.okText,
          handler: () => {
            this.navCtrl.remove(this.viewCtrl.index, 1)
          }
        }]
      }).present();
    });
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
    this.robotsAlertCombobox = new AlertRadioButton(this.alertCtrl);
    this.showRobotsAlertCombobox();
  }

  private showRobotsAlertCombobox(): void {
    const robotsAlertCombobox = this.robotsAlertCombobox.create(this.robotsText);
    const promises = [];
    if (this.robots.length > 0) {
      this.robots.forEach((robot: Robot) => {
        promises.push(pingRobot(robot));
      });
    } else {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorAddAtLeastOneRobotText,
        buttons: [{
          text: this.okText,
          handler: () => {
            this.navCtrl.remove(this.viewCtrl.index, 1)
          }
        }]
      }).present();
    }
    this.dataSubscription.unsubscribe();
    let index = 0;
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
        if (++index === promises.length) {
          this.loading.dismiss();
          if (pass === 0) {
            console.log('[ERROR][PING][ROBOTS] Unable to find the robot.');
            this.alertCtrl.create({
              title: this.errorText,
              subTitle: this.errorNoRobotFoundText,
              enableBackdropDismiss: false,
              buttons: [{
                text: this.okText,
                handler: () => {
                  this.navCtrl.remove(this.viewCtrl.index, 1)
                }
              }]
            }).present();
          } else {
            this.robotsAlertCombobox.present();
          }
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
        if (data) {
          this.robotsAlertCombobox.close();
          this.loading = this.loadingCtrl.create({
            content: this.pleaseWaitText
          });
          this.loading.present();
          QiService.connect(new IP(data.split('.')));
          let index: number = 0;
          this.alBehaviorManager.getInstalledBehaviors().then(installedBehaviors => {
            installedBehaviors.forEach(element => {
              const pathSplit: string = element.split('/');
              if (pathSplit.length > 3) {
                const author = pathSplit[0];
                if (author.split('-')[0].toUpperCase() === 'HEH') {
                  const name: string = pathSplit[pathSplit.length - 1].replace(/-|_/gi, ' ');
                  const nameUppercase: string = name.charAt(0).toUpperCase() + name.slice(1);
                  const posture = pathSplit[1].replace(/-|_/gi, ' ');
                  const postureUppercase = posture.charAt(0).toUpperCase() + posture.slice(1);
                  const category = pathSplit[2].replace(/-|_/gi, ' ');
                  const categoryUppercase = category.charAt(0).toUpperCase() + category.slice(1);
                  this.choregraphies.push(<Behavior>{ id: index, name: nameUppercase, posture: postureUppercase, category: categoryUppercase, creator: 'HEH', path: element });
                  index++;
                } else {
                  const name: string = pathSplit[pathSplit.length - 1].replace(/-|_/gi, ' ');
                  const nameUppercase: string = name.charAt(0).toUpperCase() + name.slice(1);
                  const posture = pathSplit[1].replace(/-|_/gi, ' ');
                  const postureUppercase = posture.charAt(0).toUpperCase() + posture.slice(1);
                  const category = pathSplit[2].replace(/-|_/gi, ' ');
                  const categoryUppercase = category.charAt(0).toUpperCase() + category.slice(1);
                  if (postureUppercase !== 'SitOnPod') {
                    this.choregraphies.push(<Behavior>{ id: index, name: nameUppercase, posture: postureUppercase, category: categoryUppercase, creator: 'Aldebaran', path: element });
                    index++;
                  }
                }
              }
            });
            this.searchResults = this.choregraphies;
            this.loading.dismiss();
          }, error => {
            console.error(error);
            this.loading.dismiss();
          });
          this.robotsAlertCombobox.setResult(data);
        }
      }
    });
  }

  startBehavior(behavior: Behavior) {
    this.loading = this.loadingCtrl.create({
      content: this.pleaseWaitText
    });
    this.loading.present();
    this.alBehaviorManager.startBehavior(behavior.path).then(result => {
      this.loading.dismiss();
      const alert = this.alertCtrl.create({
        title: this.informationText,
        subTitle: this.choregraphyStartingText,
        buttons: [this.okText]
      })
      alert.present();
      console.log("[INFO][NAOQI][ALBehaviorManager] startBehavior(): activity started.");
      setTimeout(() => alert.dismiss(), 2000);
    }).catch(err => {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorBehaviorStartText,
        buttons: [{
          text: this.okText,
          handler: () => {
            this.navCtrl.remove(this.viewCtrl.index, 1)
          }
        }]
      }).present();
      console.error("error")
    });
  }

  identify(index, behavior: Behavior): number {
    return behavior.id;
  }

  getPosture(record, recordIndex, records): string {
    if (record.creator === 'HEH') {
      if (recordIndex === 0) {
        return record.posture;
      } else if (records[recordIndex - 1].posture !== record.posture) {
        return record.posture;
      }
    } else {
      const posture: string = 'NAOQI.ROBOT_POSTURES.' + record.posture.toUpperCase();
      if (recordIndex === 0) {
        return posture;
      } else if (records[recordIndex - 1].posture !== record.posture) {
        return posture;
      }
    }
    return null;
  }

  inputSearch(): void {
    this.searching = true;
  }

  private isStringEquals(text0: string, text1: string): boolean {
    return text0.toLowerCase().indexOf(text1.toLowerCase()) > -1;
  }

  private filterItems(): void {
    let posture: string;
    this.searchResults = this.choregraphies.filter((choregraphy: Behavior) => {
      if (choregraphy.creator === 'Aldebaran')
        this.translate.get('NAOQI.ROBOT_POSTURES.' + choregraphy.posture.toUpperCase()).subscribe((res: string) => posture = res);
      else
        posture = choregraphy.posture;
      return this.isStringEquals(choregraphy.name, this.searchTerm) || this.isStringEquals(posture, this.searchTerm) || this.isStringEquals(choregraphy.category, this.searchTerm) || this.isStringEquals(choregraphy.path, this.searchTerm) || this.isStringEquals(choregraphy.creator, this.searchTerm);
    });
    setTimeout(() => this.virtualScroll.resize(), 500);
  }

  stopAll(): void {
    this.alBehaviorManager.stopAllBehaviors();
  }

  ionViewWillLeave(): void {
    this.isConnectedToWireless.unsubscribe();
    QiService.disconnect();
  }
}
