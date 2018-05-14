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

  private robots: Robot[];
  private selectedRobots: Robot[];
  private isSelection: boolean = false;
  searchControl: FormControl;
  searchTerm: string = '';
  showSearchBar: boolean = false;
  searching: boolean;
  @ViewChild(Content) content: Content;

  private dataSubscription: Subscription;

  // String UI
  private cancelText: string;
  private confirmDeleteText: string;
  private confirmUpdateText: string;
  private deleteText: string;
  private editText: string;
  private errorEnterCorrectIpAddressText: string;
  private errorEnterCorrectNameText: string;
  private errorEnterCorrectNumberText: string;
  private errorErrorText: string;
  private errorNoNetwork: string;
  private errorNetworkErrorText: string;
  private errorUnableToFindValueText: string;
  private errorVerifyNetworkConnectionText: string;
  private labelNameAppliedAfterRebootText: string;
  private nameText: string;
  private noText: string;
  private numberText: string;
  private okText: string;
  private questionRobotDelete: string;
  private questionRobotReboot: string;
  private questionRobotsDelete: string;
  private toastRobotSelectedDeleteText: string;
  private toastRobotNoDeleteText: string;
  private rebootText: string;
  private saveText: string;
  private yesText: string;

  // UI
  private loading: AlertLoading;

  constructor(public appCtrl: App, public navCtrl: NavController, private modalCtrl: ModalController, private toastCtrl: ToastController, private file: File, private robotsService: RobotsService, private network: Network, private alSystemService: ALSystemService, private alertCtrl: AlertController, loadingCtrl: LoadingController, private translate: TranslateService) {
    this.searchControl = new FormControl();
    this.loading = new AlertLoading(loadingCtrl, translate);
    translate.get('ERROR.ENTER_CORRECT_IP_ADDRESS').subscribe((res: string) => this.errorEnterCorrectIpAddressText = res);
    translate.get('ERROR.ENTER_CORRECT_NAME').subscribe((res: string) => this.errorEnterCorrectNameText = res);
    translate.get('ERROR.ENTER_CORRECT_NUMBER').subscribe((res: string) => this.errorEnterCorrectNumberText = res);
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorErrorText = res);
    translate.get('ERROR.NETWORK_ERROR').subscribe((res: string) => this.errorNetworkErrorText = res);
    translate.get('ERROR.UNABLE_TO_COMMUNICATE_WITH_VALUE').subscribe((res: string) => this.errorUnableToFindValueText = res);
    translate.get('ERROR.VERIFY_NETWORK_CONNECTION').subscribe((res: string) => this.errorVerifyNetworkConnectionText = res);
    translate.get('NAME').subscribe((res: string) => this.nameText = res);
    translate.get('NO').subscribe((res: string) => this.noText = res);
    translate.get('NUMBER').subscribe((res: string) => this.numberText = res);
    translate.get('OK').subscribe((res: string) => this.okText = res);
    translate.get('UI.ALERT.TITLE.CONFIRM.DELETE').subscribe((res: string) => this.confirmDeleteText = res);
    translate.get('UI.ALERT.TITLE.CONFIRM.UPDATE').subscribe((res: string) => this.confirmUpdateText = res);
    translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.DELETE').subscribe((res: string) => this.questionRobotDelete = res);
    translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.REBOOT').subscribe((res: string) => this.questionRobotReboot = res);
    translate.get('UI.ALERT.CONTENT.QUESTION.ROBOTS.DELETE').subscribe((res: string) => this.questionRobotsDelete = res);
    translate.get('UI.TOAST.ROBOTS.SELECTED_DELETE').subscribe((res: string) => this.toastRobotSelectedDeleteText = res);
    translate.get('UI.TOAST.ROBOTS.NO_DELETE').subscribe((res: string) => this.toastRobotNoDeleteText = res);
    translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.NAME_APPLIED_AFTER_REBOOT').subscribe((res: string) => this.labelNameAppliedAfterRebootText = res);
    translate.get('UI.ALERT.CONTENT.LABEL.NETWORK.CONNECT_TO_NETWORK').subscribe((res: string) => this.errorNoNetwork = res);
    translate.get('VERBS.CANCEL').subscribe((res: string) => this.cancelText = res);
    translate.get('VERBS.DELETE').subscribe((res: string) => this.deleteText = res);
    translate.get('VERBS.EDIT').subscribe((res: string) => this.editText = res);
    translate.get('VERBS.REBOOT').subscribe((res: string) => this.rebootText = res);
    translate.get('VERBS.SAVE').subscribe((res: string) => this.saveText = res);
    translate.get('YES').subscribe((res: string) => this.yesText = res);
  }

  ionViewDidLoad(): void {
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
    this.dataSubscription = this.robotsService.robots.subscribe(robots => this.robots = robots);
    this.selectedRobots = [];
  }

  addRobot(): void {
    if (this.network.type !== 'none') {
      this.navCtrl.push('AddRobotPage', { robots: this.robots });
    } else {
      this.alertCtrl.create({
        title: this.errorErrorText,
        subTitle: this.errorNoNetwork,
        buttons: [this.okText]
      }).present();
    }
  }

  delete(item: ItemSliding, robot: Robot): void {
    item.close();
    this.alertCtrl.create({
      title: this.confirmDeleteText,
      message: this.questionRobotDelete,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel'
        },
        {
          text: this.deleteText,
          handler: () => {
            let index = 0;
            this.robotsService.robots.subscribe(robots => this.robots = robots);
            this.robots.forEach(element => {
              if (element === robot) {
                this.robots.splice(index, 1);
              }
              index++;
            });
            this.robotsService.next(this.robots);
          }
        }
      ]
    }).present();
  }

  edit(item: ItemSliding, robot: Robot): void {
    item.close();
    const ipPart = robot.ip.split('.');
    this.alertCtrl.create({
      title: this.editText,
      inputs: [
        {
          name: 'name',
          placeholder: this.nameText,
          value: robot.name
        },
        {
          name: 'ipPart0',
          placeholder: this.numberText + ' 1',
          value: ipPart[0],
          type: 'number'
        },
        {
          name: 'ipPart1',
          placeholder: this.numberText + ' 2',
          value: ipPart[1],
          type: 'number'
        },
        {
          name: 'ipPart2',
          placeholder: this.numberText + ' 3',
          value: ipPart[2],
          type: 'number'
        },
        {
          name: 'ipPart3',
          placeholder: this.numberText + ' 4',
          value: ipPart[3],
          type: 'number'
        }
      ],
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel'
        },
        {
          text: this.saveText,
          handler: data => {
            const ip = new IP([data.ipPart0, data.ipPart1, data.ipPart2, data.ipPart3]);
            if (!data.name || data.name.trim() === '') {
              this.alertCtrl.create({
                title: this.errorErrorText,
                subTitle: this.errorEnterCorrectNameText,
                buttons: [this.okText]
              }).present();
              return false;
            } else if (!ip.isValid()) {
              this.alertCtrl.create({
                title: this.errorErrorText,
                subTitle: this.errorEnterCorrectIpAddressText,
                buttons: [this.okText]
              }).present();
              return false;
            } else {
              if (robot.name != data.name.trim() || ipPart[0] != data.ipPart0 || ipPart[1] != data.ipPart1 || ipPart[2] != data.ipPart2 || ipPart[3] != data.ipPart3) {
                this.robotsService.robots.subscribe(robots => this.robots = robots);
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
                this.robotsService.next(this.robots);
              }
            }
          }
        }
      ]
    }).present();
  }

  filterItems(): void {
    const searchSubscription = this.robotsService.filter(this.searchTerm).subscribe(robots => this.robots = robots);
    searchSubscription.unsubscribe();
  }

  updateName(name: string, ip: IP): void {
    QiService.connect(ip);
    this.alSystemService.setName(name).then(() => {
      this.alertCtrl.create({
        title: this.confirmUpdateText,
        message: this.labelNameAppliedAfterRebootText + ' ' + this.questionRobotReboot,
        buttons: [
          {
            text: this.noText,
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: this.rebootText,
            handler: () => {
              this.alSystemService.reboot().then(() => {
                let labelRebootText: string;
                this.translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.REBOOT', { value: name }).subscribe(
                  (res: string) => labelRebootText = res,
                  () => { },
                  () => {
                    this.alertCtrl.create({
                      title: 'Info',
                      subTitle: labelRebootText,
                      buttons: [this.okText]
                    }).present();
                  });
              });
            }
          }
        ]
      }).present();
      this.robotsService.next(this.robots);
    });
  }

  openMonitor(robot: Robot): void {
    this.loading.show();
    const self = this;
    if (this.network.type === 'none') {
      this.alertCtrl.create({
        title: this.errorErrorText,
        subTitle: this.errorNoNetwork,
        buttons: [this.okText]
      }).present();
      this.loading.close();
    } else {
      ping('http://' + robot.ip).then(delta => {
        this.loading.close();
        this.modalCtrl.create('SettingsRobotPage', { ip: robot.ip }).present();
      }).catch(error => {
        this.loading.close();
        let errorUnableToFindText: string;
        self.translate.get('ERROR.UNABLE_TO_FIND_VALUE', { value: robot.name }).subscribe(
          (res: string) => errorUnableToFindText = res,
          () => { },
          () => {
            self.alertCtrl.create({
              title: self.errorNetworkErrorText,
              subTitle: errorUnableToFindText,
              buttons: [self.okText]
            }).present();
          }
        );
      });
    }

  }

  selectRobot(robot: Robot): void {
    if (this.selectedRobots.find(elem => elem === robot))
      this.selectedRobots = this.selectedRobots.filter(element => element !== robot);
    else
      this.selectedRobots.push(robot);
  }

  cancelSelection(): void {
    this.selectedRobots = [];
    // Fix bug that tap on the back button on iOS when cancel selection.
    setTimeout(() => this.isSelection = false, 50);
  }

  inputSearch(): void {
    this.content.scrollToTop();
    this.searching = true;
  }

  removeRobots(): void {
    if (this.selectedRobots.length > 0) {
      this.alertCtrl.create({
        title: this.confirmDeleteText,
        message: this.questionRobotsDelete,
        buttons: [
          {
            text: this.noText,
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: this.yesText,
            handler: () => {
              this.robotsService.next(this.robots.filter(element => this.selectedRobots.indexOf(element) < 0));
              this.robotsService.robots.subscribe(robots => this.robots = robots);
              this.toastCtrl.create({
                message: this.toastRobotSelectedDeleteText,
                duration: 3000,
                position: 'bottom'
              }).present();
              this.cancelSelection();
            }
          }
        ]
      }).present();
    } else {
      this.toastCtrl.create({
        message: this.toastRobotNoDeleteText,
        duration: 3000,
        position: 'bottom'
      }).present();
      this.cancelSelection();
    }
  }

  ionViewWillLeave(): void {
    this.dataSubscription.unsubscribe();
  }

  cancelSearch(): void {
    this.searchTerm = '';
    this.showSearchBar = false;
    this.searching = false;
  }
}
