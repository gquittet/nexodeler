import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, App, Content, IonicPage, ItemSliding, LoadingController, ModalController, NavController, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';
import { AlertLoading } from '../../app/objects/ionic/AlertLoading';
import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';






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

  private _dataSubscription: Subscription;

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

  // UI
  private loading: AlertLoading;

  constructor(public appCtrl: App, public navCtrl: NavController, private _modalCtrl: ModalController, private _toastCtrl: ToastController, private _file: File, private _robotsService: RobotsService, private _network: Network, private _alSystemService: ALSystemService, private _alertCtrl: AlertController, loadingCtrl: LoadingController, private _translate: TranslateService) {
    this.searchControl = new FormControl();
    this.loading = new AlertLoading(loadingCtrl, _translate);
    _translate.get('ERROR.ENTER_CORRECT_IP_ADDRESS').subscribe((res: string) => this._errorEnterCorrectIpAddressText = res);
    _translate.get('ERROR.ENTER_CORRECT_NAME').subscribe((res: string) => this._errorEnterCorrectNameText = res);
    _translate.get('ERROR.ENTER_CORRECT_NUMBER').subscribe((res: string) => this._errorEnterCorrectNumberText = res);
    _translate.get('ERROR.ERROR').subscribe((res: string) => this._errorErrorText = res);
    _translate.get('ERROR.NETWORK_ERROR').subscribe((res: string) => this._errorNetworkErrorText = res);
    _translate.get('ERROR.UNABLE_TO_COMMUNICATE_WITH_VALUE').subscribe((res: string) => this._errorUnableToFindValueText = res);
    _translate.get('ERROR.VERIFY_NETWORK_CONNECTION').subscribe((res: string) => this._errorVerifyNetworkConnectionText = res);
    _translate.get('NAME').subscribe((res: string) => this._nameText = res);
    _translate.get('NO').subscribe((res: string) => this._noText = res);
    _translate.get('NUMBER').subscribe((res: string) => this._numberText = res);
    _translate.get('OK').subscribe((res: string) => this._okText = res);
    _translate.get('UI.ALERT.TITLE.CONFIRM.DELETE').subscribe((res: string) => this._confirmDeleteText = res);
    _translate.get('UI.ALERT.TITLE.CONFIRM.UPDATE').subscribe((res: string) => this._confirmUpdateText = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.DELETE').subscribe((res: string) => this._questionRobotDelete = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.REBOOT').subscribe((res: string) => this._questionRobotReboot = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOTS.DELETE').subscribe((res: string) => this._questionRobotsDelete = res);
    _translate.get('UI.TOAST.ROBOTS.SELECTED_DELETE').subscribe((res: string) => this._toastRobotSelectedDeleteText = res);
    _translate.get('UI.TOAST.ROBOTS.NO_DELETE').subscribe((res: string) => this._toastRobotNoDeleteText = res);
    _translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.NAME_APPLIED_AFTER_REBOOT').subscribe((res: string) => this._labelNameAppliedAfterRebootText = res);
    _translate.get('UI.ALERT.CONTENT.LABEL.NETWORK.CONNECT_TO_NETWORK').subscribe((res: string) => this._errorNoNetwork = res);
    _translate.get('VERBS.CANCEL').subscribe((res: string) => this._cancelText = res);
    _translate.get('VERBS.DELETE').subscribe((res: string) => this._deleteText = res);
    _translate.get('VERBS.EDIT').subscribe((res: string) => this._editText = res);
    _translate.get('VERBS.REBOOT').subscribe((res: string) => this._rebootText = res);
    _translate.get('VERBS.SAVE').subscribe((res: string) => this._saveText = res);
    _translate.get('YES').subscribe((res: string) => this._yesText = res);
  }

  ionViewDidLoad(): void {
    this._file.checkFile(this._file.dataDirectory, this._robotsService.FILE_NAME).then(res => {
      if (res) {
        this._file.readAsText(this._file.dataDirectory, this._robotsService.FILE_NAME).then(data => {
          this.robots = JSON.parse(data);
          this._robotsService.next(this.robots);
        });
      }
    }, err => { });
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this._dataSubscription = this._robotsService.robots.subscribe(robots => this.robots = robots);
    this._selectedRobots = [];
  }

  addRobot(): void {
    if (this._network.type !== 'none') {
      this.navCtrl.push('AddRobotPage', { robots: this.robots });
    } else {
      this._alertCtrl.create({
        title: this._errorErrorText,
        subTitle: this._errorNoNetwork,
        buttons: [this._okText]
      }).present();
    }
  }

  delete(item: ItemSliding, robot: Robot): void {
    item.close();
    this._alertCtrl.create({
      title: this._confirmDeleteText,
      message: this._questionRobotDelete,
      buttons: [
        {
          text: this._cancelText,
          role: 'cancel'
        },
        {
          text: this._deleteText,
          handler: () => {
            let index = 0;
            this._robotsService.robots.subscribe(robots => this.robots = robots);
            this.robots.forEach(element => {
              if (element === robot) {
                this.robots.splice(index, 1);
              }
              index++;
            });
            this._robotsService.next(this.robots);
          }
        }
      ]
    }).present();
  }

  edit(item: ItemSliding, robot: Robot): void {
    item.close();
    const ipPart = robot.ip.split('.');
    this._alertCtrl.create({
      title: this._editText,
      inputs: [
        {
          name: 'name',
          placeholder: this._nameText,
          value: robot.name
        },
        {
          name: 'ipPart0',
          placeholder: this._numberText + ' 1',
          value: ipPart[0],
          type: 'number'
        },
        {
          name: 'ipPart1',
          placeholder: this._numberText + ' 2',
          value: ipPart[1],
          type: 'number'
        },
        {
          name: 'ipPart2',
          placeholder: this._numberText + ' 3',
          value: ipPart[2],
          type: 'number'
        },
        {
          name: 'ipPart3',
          placeholder: this._numberText + ' 4',
          value: ipPart[3],
          type: 'number'
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
                buttons: [this._okText]
              }).present();
              return false;
            } else if (!ip.isValid()) {
              this._alertCtrl.create({
                title: this._errorErrorText,
                subTitle: this._errorEnterCorrectIpAddressText,
                buttons: [this._okText]
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
                          buttons: [this.okText]
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
    const searchSubscription = this._robotsService.filter(this.searchTerm).subscribe(robots => this.robots = robots);
    searchSubscription.unsubscribe();
  }

  updateName(name: string, ip: IP): void {
    QiService.connect(ip);
    this._alSystemService.setName(name).then(() => {
      this._alertCtrl.create({
        title: this._confirmUpdateText,
        message: this._labelNameAppliedAfterRebootText + ' ' + this._questionRobotReboot,
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
                this._translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.REBOOT', { value: name }).subscribe(
                  (res: string) => labelRebootText = res,
                  () => { },
                  () => {
                    this._alertCtrl.create({
                      title: 'Info',
                      subTitle: labelRebootText,
                      buttons: [this._okText]
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
        buttons: [this._okText]
      }).present();
      this.loading.close();
    } else {
      ping('http://' + robot.ip).then(delta => {
        this.loading.close();
        this._modalCtrl.create('SettingsRobotPage', { ip: robot.ip }).present();
      }).catch(error => {
        this.loading.close();
        let errorUnableToFindText: string;
        self._translate.get('ERROR.UNABLE_TO_FIND_VALUE', { value: robot.name }).subscribe(
          (res: string) => errorUnableToFindText = res,
          () => { },
          () => {
            self._alertCtrl.create({
              title: self._errorNetworkErrorText,
              subTitle: errorUnableToFindText,
              buttons: [self._okText]
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
        buttons: [
          {
            text: this._noText,
            role: 'cancel',
            handler: () => {
            }
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
    this._dataSubscription.unsubscribe();
  }

  cancelSearch(): void {
    this.searchTerm = '';
    this.showSearchBar = false;
    this.searching = false;
  }
}
