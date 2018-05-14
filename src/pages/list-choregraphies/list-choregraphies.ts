import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content, IonicPage, LoadingController, NavController, NavParams, ViewController, VirtualScroll } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import { Behavior } from '../../app/objects/Behavior';
import { AlertLoading } from '../../app/objects/ionic/AlertLoading';
import { RobotsChooser } from '../../app/objects/ionic/RobotsChooser';
import { ALBehaviorManager } from '../../app/services/naoqi/albehaviormanager.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';


@IonicPage()
@Component({
  selector: 'page-list-choregraphies',
  templateUrl: 'list-choregraphies.html',
})
export class ListChoregraphiesPage {


  // Object
  private isConnectedToWireless: Subscription;
  choregraphies: Behavior[];
  searchResults: Behavior[];


  // String UI
  private choregraphyStartingText: string;
  private errorNetworkDisconnectedText: string;
  private errorBehaviorStartText: string;
  private errorText: string;
  private informationText: string;
  private okText: string;

  // UI
  searchControl: FormControl;
  searchTerm: string = '';
  searching: boolean;
  private robotsChooser: RobotsChooser;
  @ViewChild('content') content: Content;
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;
  private loading: AlertLoading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private translate: TranslateService, network: Network, private file: File, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private robotsService: RobotsService, private alBehaviorManager: ALBehaviorManager) {
    this.loading = new AlertLoading(loadingCtrl, translate);
    this.searchControl = new FormControl();
    this.choregraphies = [];
    this.searchResults = [];
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('ERROR.NETWORK_DISCONNECTED').subscribe((res: string) => this.errorNetworkDisconnectedText = res);
    translate.get('ERROR.ERROR_BEHAVIOR_START').subscribe((res: string) => this.errorBehaviorStartText = res);
    translate.get('UI.ALERT.TITLE.INFORMATION.INFORMATION').subscribe((res: string) => this.informationText = res);
    translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.CHOREGRAPHY_STARTING').subscribe((res: string) => this.choregraphyStartingText = res);
    translate.get("OK").subscribe((res: string) => this.okText = res);
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
    this.robotsChooser = new RobotsChooser(this.navCtrl, this.viewCtrl, this.translate, this.alertCtrl, this.robotsService, this.loadingCtrl, this.file);
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this.robotsChooser.exitOnCancel = true;
    this.robotsChooser.show(this, this.loadBehaviors);
  }

  loadBehaviors(): void {
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
    }, error => {
      console.error(error);
    });
  }

  startBehavior(behavior: Behavior) {
    this.loading.show();
    this.alBehaviorManager.startBehavior(behavior.path).then(result => {
      this.loading.close();
      const alert = this.alertCtrl.create({
        title: this.informationText,
        subTitle: this.choregraphyStartingText,
        buttons: [this.okText]
      })
      alert.present();
      console.log("[INFO][NAOQI][ALBehaviorManager] startBehavior(): activity started.");
      setTimeout(() => alert.dismiss(), 2000);
    }).catch(err => {
      this.loading.close();
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
    console.log("[INFO][NAOQI][ALBehaviorManager] Stop all the activities.");
    this.alBehaviorManager.stopAllBehaviors();
  }

  ionViewWillLeave(): void {
    this.isConnectedToWireless.unsubscribe();
    QiService.disconnect();
  }
}
