import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content, IonicPage, LoadingController, NavController, NavParams, ViewController, VirtualScroll } from 'ionic-angular';
import { Behavior } from '../../app/objects/Behavior';
import { Theme } from '../../app/objects/Theme';
import { AlertLoading } from '../../app/objects/ionic/AlertLoading';
import { RobotsChooser } from '../../app/objects/ionic/RobotsChooser';
import { ALBehaviorManagerService } from '../../app/services/naoqi/albehaviormanager.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { SettingsService } from '../../app/services/settings/settings.service';


@IonicPage()
@Component({
  selector: 'page-list-choregraphies',
  templateUrl: 'list-choregraphies.html',
})
export class ListChoregraphiesPage {

  // Object
  choregraphies: Behavior[];
  searchResults: Behavior[];

  // String UI
  private _choregraphyStartingText: string;
  private _errorNetworkDisconnectedText: string;
  private _errorBehaviorStartText: string;
  private _errorText: string;
  private _informationText: string;
  private _okText: string;

  // Subscription
  private _takeWhile: boolean = true;

  // UI
  searchControl: FormControl;
  searchTerm: string = '';
  searching: boolean;
  private _robotsChooser: RobotsChooser;
  @ViewChild('content') content: Content;
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;
  private _loading: AlertLoading;

  private _theme: Theme;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _viewCtrl: ViewController, private _translate: TranslateService, network: Network, private _file: File, private _alertCtrl: AlertController, private _loadingCtrl: LoadingController, private _settingsService: SettingsService, private _robotsService: RobotsService, private _alBehaviorManager: ALBehaviorManagerService) {
    this._loading = new AlertLoading(_loadingCtrl, _translate, this._settingsService);
    this.searchControl = new FormControl();
    this.choregraphies = [];
    this.searchResults = [];
    _translate.get('ERROR.ERROR').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorText = res);
    _translate.get('ERROR.NETWORK_DISCONNECTED').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorNetworkDisconnectedText = res);
    _translate.get('ERROR.ERROR_BEHAVIOR_START').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorBehaviorStartText = res);
    _translate.get('UI.ALERT.TITLE.INFORMATION.INFORMATION').takeWhile(() => this._takeWhile).subscribe((res: string) => this._informationText = res);
    _translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.CHOREGRAPHY_STARTING').takeWhile(() => this._takeWhile).subscribe((res: string) => this._choregraphyStartingText = res);
    _translate.get("OK").takeWhile(() => this._takeWhile).subscribe((res: string) => this._okText = res);
    this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
    network.onDisconnect().takeWhile(() => this._takeWhile).subscribe(() => {
      console.log('[INFO][NETWORK] Network access disconnected.');
      this._alertCtrl.create({
        title: this._errorText,
        subTitle: this._errorNetworkDisconnectedText,
        cssClass: this._theme.class,
        buttons: [{
          text: this._okText,
          handler: () => {
            this.navCtrl.remove(this._viewCtrl.index, 1)
          }
        }]
      }).present();
    });
  }

  ionViewDidLoad(): void {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this._robotsChooser = new RobotsChooser(this.navCtrl, this._viewCtrl, this._translate, this._alertCtrl, this._robotsService, this._loadingCtrl, this._file, this._settingsService);
    this._robotsChooser.exitOnCancel = true;
    this._robotsChooser.show(this, this.loadBehaviors);
  }

  loadBehaviors(): void {
    let index: number = 0;
    this._alBehaviorManager.getInstalledBehaviors().then(installedBehaviors => {
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
    this._loading.show();
    this._alBehaviorManager.startBehavior(behavior.path).then(result => {
      this._loading.close();
      const alert = this._alertCtrl.create({
        title: this._informationText,
        subTitle: this._choregraphyStartingText,
        cssClass: this._theme.class,
        buttons: [this._okText]
      })
      alert.present();
      console.log("[INFO][NAOQI][ALBehaviorManager] startBehavior(): activity started.");
      setTimeout(() => alert.dismiss(), 2000);
    }).catch(err => {
      this._loading.close();
      this._alertCtrl.create({
        title: this._errorText,
        subTitle: this._errorBehaviorStartText,
        cssClass: this._theme.class,
        buttons: [{
          text: this._okText,
          handler: () => {
            this.navCtrl.remove(this._viewCtrl.index, 1)
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
        this._translate.get('NAOQI.ROBOT_POSTURES.' + choregraphy.posture.toUpperCase()).takeWhile(() => this._takeWhile).subscribe((res: string) => posture = res);
      else
        posture = choregraphy.posture;
      return this.isStringEquals(choregraphy.name, this.searchTerm) || this.isStringEquals(posture, this.searchTerm) || this.isStringEquals(choregraphy.category, this.searchTerm) || this.isStringEquals(choregraphy.path, this.searchTerm) || this.isStringEquals(choregraphy.creator, this.searchTerm);
    });
    setTimeout(() => this.virtualScroll.resize(), 500);
  }

  stopAll(): void {
    console.log("[INFO][NAOQI][ALBehaviorManager] Stop all the activities.");
    this._alBehaviorManager.stopAllBehaviors();
  }

  ionViewWillLeave(): void {
    this._takeWhile = false;
    QiService.disconnect();
  }
}
