import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, App, Content, IonicPage, ItemSliding, LoadingController, ModalController, NavController, Platform, ToastController } from 'ionic-angular';
import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';
import { Theme } from '../../app/objects/Theme';
import { AlertLoading } from '../../app/objects/ionic/AlertLoading';
import { AppStateService } from '../../app/services/appstate/appstate.service';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { SettingsService } from '../../app/services/settings/settings.service';

declare var ping: any;

@IonicPage()
@Component({
  selector: 'page-list-robots',
  templateUrl: 'list-robots.html',
  animations: [
    trigger('easeInOutLeft', [
      transition(':enter', [
        style({ transform: 'translate3d(100%, 0, 0)', opacity: 0 }),
        animate('300ms ease-in', keyframes([
          style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0, offset: 0 }),
          style({ transform: 'translate3d(15px, 0, 0)', opacity: 0.3, offset: 0.3 }),
          style({ transform: 'translate3d(0, 0, 0)', opacity: 1, offset: 1 })
        ])),
      ]),
      transition(':leave', [
        style({ opacity: 0 })
      ])
    ]),
    trigger('easeInOutRightToLeft', [
      transition(':enter', [
        style({ transform: 'translate3d(100%, 0, 0)', opacity: 0 }),
        animate('300ms ease-in', keyframes([
          style({ transform: 'translate3d(100%, 0, 0)', opacity: 0, offset: 0 }),
          style({ transform: 'translate3d(-15px, 0, 0)', opacity: 0.3, offset: 0.3 }),
          style({ transform: 'translate3d(0, 0, 0)', opacity: 1, offset: 1 })
        ])),
      ]),
      transition(':leave', [
        style({ transform: 'translate3d(0, 0, 0)', opacity: 1 }),
        animate('300ms ease-out', keyframes([
          style({ transform: 'translate3d(0, 0, 0)', opacity: 1, offset: 0 }),
          style({ transform: 'translate3d(-15px, 0, 0)', opacity: 0.7, offset: 0.7 }),
          style({ transform: 'translate3d(100%, 0, 0)', opacity: 0, offset: 1 })
        ])),
      ])
    ])
  ]
})
export class ListRobotsPage {

  robots: Robot[];
  private _selectedRobots: Robot[];
  isSelection: boolean = false;
  searchControl: FormControl;
  searchTerm: string = '';
  showSearchBar: boolean = false;
  searching: boolean;
  @ViewChild(Content) content: Content;

  // String UI
  private _cancelText: string;
  private _confirmDeleteText: string;
  private _confirmUpdateText: string;
  private _deleteText: string;
  private _editText: string;
  private _errorEnterCorrectIpAddressText: string;
  private _errorEnterCorrectNameText: string;
  private _errorEnterCorrectNumberText: string;
  private _errorErrorText: string;
  private _errorNoNetwork: string;
  private _errorNetworkErrorText: string;
  private _errorUnableToFindValueText: string;
  private _errorVerifyNetworkConnectionText: string;
  private _labelNameAppliedAfterRebootText: string;
  private _nameText: string;
  private _noText: string;
  private _numberText: string;
  private _okText: string;
  private _questionRobotDelete: string;
  private _questionRobotReboot: string;
  private _questionRobotsDelete: string;
  private _toastRobotSelectedDeleteText: string;
  private _toastRobotNoDeleteText: string;
  private _rebootText: string;
  private _saveText: string;
  private _yesText: string;

  // Theme
  private _takeWhile: boolean = true;

  // UI
  private loading: AlertLoading;
  // Theme
  private _theme: Theme;

  constructor(private _platform: Platform, public appCtrl: App, public navCtrl: NavController, private _modalCtrl: ModalController, private _toastCtrl: ToastController, private _robotsService: RobotsService, private _network: Network, private _alSystemService: ALSystemService, private _alertCtrl: AlertController, loadingCtrl: LoadingController, private _translate: TranslateService, settingsService: SettingsService, private _appStateService: AppStateService) {
    this.searchControl = new FormControl();
    this.loading = new AlertLoading(loadingCtrl, _translate, settingsService);
    settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
    _translate.get('ERROR.ENTER_CORRECT_IP_ADDRESS').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorEnterCorrectIpAddressText = res);
    _translate.get('ERROR.ENTER_CORRECT_NAME').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorEnterCorrectNameText = res);
    _translate.get('ERROR.ENTER_CORRECT_NUMBER').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorEnterCorrectNumberText = res);
    _translate.get('ERROR.ERROR').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorErrorText = res);
    _translate.get('ERROR.NETWORK_ERROR').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorNetworkErrorText = res);
    _translate.get('ERROR.UNABLE_TO_COMMUNICATE_WITH_VALUE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorUnableToFindValueText = res);
    _translate.get('ERROR.VERIFY_NETWORK_CONNECTION').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorVerifyNetworkConnectionText = res);
    _translate.get('NAME').takeWhile(() => this._takeWhile).subscribe((res: string) => this._nameText = res);
    _translate.get('NO').takeWhile(() => this._takeWhile).subscribe((res: string) => this._noText = res);
    _translate.get('NUMBER').takeWhile(() => this._takeWhile).subscribe((res: string) => this._numberText = res);
    _translate.get('OK').takeWhile(() => this._takeWhile).subscribe((res: string) => this._okText = res);
    _translate.get('UI.ALERT.TITLE.CONFIRM.DELETE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._confirmDeleteText = res);
    _translate.get('UI.ALERT.TITLE.CONFIRM.UPDATE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._confirmUpdateText = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.DELETE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._questionRobotDelete = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.REBOOT').takeWhile(() => this._takeWhile).subscribe((res: string) => this._questionRobotReboot = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOTS.DELETE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._questionRobotsDelete = res);
    _translate.get('UI.TOAST.ROBOTS.SELECTED_DELETE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._toastRobotSelectedDeleteText = res);
    _translate.get('UI.TOAST.ROBOTS.NO_DELETE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._toastRobotNoDeleteText = res);
    _translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.NAME_APPLIED_AFTER_REBOOT').takeWhile(() => this._takeWhile).subscribe((res: string) => this._labelNameAppliedAfterRebootText = res);
    _translate.get('UI.ALERT.CONTENT.LABEL.NETWORK.CONNECT_TO_NETWORK').takeWhile(() => this._takeWhile).subscribe((res: string) => this._errorNoNetwork = res);
    _translate.get('VERBS.CANCEL').takeWhile(() => this._takeWhile).subscribe((res: string) => this._cancelText = res);
    _translate.get('VERBS.DELETE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._deleteText = res);
    _translate.get('VERBS.EDIT').takeWhile(() => this._takeWhile).subscribe((res: string) => this._editText = res);
    _translate.get('VERBS.REBOOT').takeWhile(() => this._takeWhile).subscribe((res: string) => this._rebootText = res);
    _translate.get('VERBS.SAVE').takeWhile(() => this._takeWhile).subscribe((res: string) => this._saveText = res);
    _translate.get('YES').takeWhile(() => this._takeWhile).subscribe((res: string) => this._yesText = res);
  }

  ionViewDidLoad(): void {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
    this._robotsService.robots.takeWhile(() => this._takeWhile).subscribe(robots => this.robots = robots);
  }

  ionViewDidEnter(): void {
    this._selectedRobots = [];
  }

  addRobot(): void {
    if (this._network.type !== 'none') {
      this.navCtrl.push('AddRobotPage', { robots: this.robots });
    } else {
      this._alertCtrl.create({
        title: this._errorErrorText,
        subTitle: this._errorNoNetwork,
        buttons: [this._okText],
        cssClass: this._theme.class
      }).present();
    }
  }

  delete(item: ItemSliding, robot: Robot): void {
    item.close();
    this._alertCtrl.create({
      title: this._confirmDeleteText,
      message: this._questionRobotDelete,
      cssClass: this._theme.class,
      buttons: [
        {
          text: this._cancelText,
          role: 'cancel'
        },
        {
          text: this._deleteText,
          handler: () => {
            let index = 0;
            let canLive: boolean = true;
            this._robotsService.robots.takeWhile(() => canLive).subscribe(robots => this.robots = robots);
            this.robots.forEach(element => {
              if (element === robot) {
                this.robots.splice(index, 1);
              }
              index++;
            });
            canLive = false;
            this._robotsService.next(this.robots);
          }
        }
      ]
    }).present();
  }

  edit(item: ItemSliding, robot: Robot): void {
    item.close();
    const ipPart = robot.ip.split('.');
    let idPlatformPrefix: string = '';
    if (this._platform.is('android')) {
      idPlatformPrefix = 'md';
    } else if (this._platform.is('ios')) {
      idPlatformPrefix = 'ios';
    } else if (this._platform.is('windows')) {
      idPlatformPrefix = 'wp';
    }
    this._alertCtrl.create({
      title: this._editText,
      cssClass: this._theme.class,
      inputs: [
        {
          name: 'name',
          placeholder: this._nameText,
          value: robot.name,
          id: 'alert-input-' + idPlatformPrefix + '-1-0'
        },
        {
          name: 'ipPart0',
          placeholder: this._numberText + ' 1',
          value: ipPart[0],
          type: 'number',
          id: 'alert-input-' + idPlatformPrefix + '-1-1'
        },
        {
          name: 'ipPart1',
          placeholder: this._numberText + ' 2',
          value: ipPart[1],
          type: 'number',
          id: 'alert-input-' + idPlatformPrefix + '-1-2'
        },
        {
          name: 'ipPart2',
          placeholder: this._numberText + ' 3',
          value: ipPart[2],
          type: 'number',
          id: 'alert-input-' + idPlatformPrefix + '-1-3'
        },
        {
          name: 'ipPart3',
          placeholder: this._numberText + ' 4',
          value: ipPart[3],
          type: 'number',
          id: 'alert-input-' + idPlatformPrefix + '-1-4'
        }
      ],
      buttons: [
        {
          text: this._cancelText,
          role: 'cancel'
        },
        {
          text: this._saveText,
          handler: data => {
            const ip = new IP([data.ipPart0, data.ipPart1, data.ipPart2, data.ipPart3]);
            if (!data.name || data.name.trim() === '') {
              this._alertCtrl.create({
                title: this._errorErrorText,
                subTitle: this._errorEnterCorrectNameText,
                buttons: [this._okText],
                cssClass: this._theme.class
              }).present();
              return false;
            } else if (!ip.isValid()) {
              this._alertCtrl.create({
                title: this._errorErrorText,
                subTitle: this._errorEnterCorrectIpAddressText,
                buttons: [this._okText],
                cssClass: this._theme.class
              }).present();
              return false;
            } else {
              if (robot.name != data.name.trim() || ipPart[0] != data.ipPart0 || ipPart[1] != data.ipPart1 || ipPart[2] != data.ipPart2 || ipPart[3] != data.ipPart3) {
                this._robotsService.robots.subscribe(robots => this.robots = robots);
                this.robots.forEach(element => {
                  if (element === robot) {
                    element.ip = ip.toString();
                    if (robot.name != data.name.trim()) {
                      ping('http://' + ip.toString()).then(delta => {
                        element.name = data.name.trim();
                        this.updateName(element.name, ip);
                      }).catch(function (err) {
                        this.alertCtrl.create({
                          title: this.errorErrorText,
                          subTitle: this.errorVerifyNetworkConnectionText,
                          buttons: [this.okText],
                          cssClass: this._theme.class
                        }).present();
                      });
                    }
                  }
                });
                this._robotsService.next(this.robots);
              }
            }
          }
        }
      ]
    }).present();
  }

  filterItems(): void {
    this._robotsService.filter(this.searchTerm).takeWhile(() => this._takeWhile).subscribe(robots => this.robots = robots);
  }

  updateName(name: string, ip: IP): void {
    QiService.connect(ip);
    this._alSystemService.setName(name).then(() => {
      this._alertCtrl.create({
        title: this._confirmUpdateText,
        message: this._labelNameAppliedAfterRebootText + ' ' + this._questionRobotReboot,
        cssClass: this._theme.class,
        buttons: [
          {
            text: this._noText,
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: this._rebootText,
            handler: () => {
              this._alSystemService.reboot().then(() => {
                let labelRebootText: string;
                this._translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.REBOOT', { value: name }).takeWhile(() => this._takeWhile).subscribe(
                  (res: string) => labelRebootText = res,
                  () => { },
                  () => {
                    this._alertCtrl.create({
                      title: 'Info',
                      subTitle: labelRebootText,
                      buttons: [this._okText],
                      cssClass: this._theme.class
                    }).present();
                  });
              });
            }
          }
        ]
      }).present();
      this._robotsService.next(this.robots);
    });
  }

  openMonitor(robot: Robot): void {
    this.loading.show();
    const self = this;
    if (this._network.type === 'none') {
      this._alertCtrl.create({
        title: this._errorErrorText,
        subTitle: this._errorNoNetwork,
        buttons: [this._okText],
        cssClass: this._theme.class
      }).present();
      this.loading.close();
    } else {
      ping('http://' + robot.ip).then(delta => {
        this.loading.close();
        const modal = this._modalCtrl.create('SettingsRobotPage', { ip: robot.ip }, { cssClass: this._theme.class });
        modal.onDidDismiss(() => this._appStateService.changeModalOpenedState(false));
        modal.present().then(() => this._appStateService.changeModalOpenedState(true));
      }).catch(error => {
        this.loading.close();
        let errorUnableToFindText: string;
        self._translate.get('ERROR.UNABLE_TO_FIND_VALUE', { value: robot.name }).takeWhile(() => this._takeWhile).subscribe(
          (res: string) => errorUnableToFindText = res,
          () => { },
          () => {
            self._alertCtrl.create({
              title: self._errorNetworkErrorText,
              subTitle: errorUnableToFindText,
              buttons: [self._okText],
              cssClass: this._theme.class
            }).present();
          }
        );
      });
    }

  }

  selectRobot(robot: Robot): void {
    if (this._selectedRobots.find(elem => elem === robot))
      this._selectedRobots = this._selectedRobots.filter(element => element !== robot);
    else
      this._selectedRobots.push(robot);
  }

  cancelSelection(): void {
    this._selectedRobots = [];
    // Fix bug that tap on the back button on iOS when cancel selection.
    setTimeout(() => this.isSelection = false, 50);
  }

  inputSearch(): void {
    this.content.scrollToTop();
    this.searching = true;
  }

  removeRobots(): void {
    if (this._selectedRobots.length > 0) {
      this._alertCtrl.create({
        title: this._confirmDeleteText,
        message: this._questionRobotsDelete,
        cssClass: this._theme.class,
        buttons: [
          {
            text: this._noText,
            role: 'cancel'
          },
          {
            text: this._yesText,
            handler: () => {
              this._robotsService.next(this.robots.filter(element => this._selectedRobots.indexOf(element) < 0));
              this._robotsService.robots.subscribe(robots => this.robots = robots);
              this._toastCtrl.create({
                message: this._toastRobotSelectedDeleteText,
                duration: 3000,
                position: 'bottom'
              }).present();
              this.cancelSelection();
            }
          }
        ]
      }).present();
    } else {
      this._toastCtrl.create({
        message: this._toastRobotNoDeleteText,
        duration: 3000,
        position: 'bottom'
      }).present();
      this.cancelSelection();
    }
  }

  ionViewWillLeave(): void {
    this._takeWhile = false;
  }

  cancelSearch(): void {
    this.searchTerm = '';
    this.showSearchBar = false;
    this.searching = false;
  }
}
