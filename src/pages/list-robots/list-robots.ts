import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { App, NavController, AlertController, LoadingController, ItemSliding, IonicPage, ToastController } from 'ionic-angular';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';

import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { File } from '@ionic-native/file';
import { RobotsService } from '../../app/services/robots/robots.service';

import 'rxjs/add/operator/debounceTime';

declare var ping: any;

@IonicPage()
@Component({
  selector: 'page-list-robots',
  templateUrl: 'list-robots.html',
  animations: [
    trigger('easeInOutLeftToRight', [
      transition(':enter', [
        style({ transform: 'translate3d(100%, 0, 0)', opacity: 0 }),
        animate('300ms ease-in', keyframes([
          style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0, offset: 0 }),
          style({ transform: 'translate3d(15px, 0, 0)', opacity: 0.3, offset: 0.3 }),
          style({ transform: 'translate3d(0, 0, 0)', opacity: 1, offset: 1 })
        ])),
      ]),
      transition(':leave', [
        style({ transform: 'translate3d(0, 0, 0)', opacity: 1 }),
        animate('300ms ease-out', keyframes([
          style({ transform: 'translate3d(0, 0, 0)', opacity: 1, offset: 0 }),
          style({ transform: 'translate3d(15px, 0, 0)', opacity: 0.7, offset: 0.7 }),
          style({ transform: 'translate3d(-100%, 0, 0)', opacity: 0, offset: 1 })
        ])),
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

  private name = 'Robots';
  private robots: Robot[];
  private selectedRobots: Robot[];
  private isSelection: boolean = false;
  private searchControl: FormControl;
  private searchTerm: string = '';
  private searching: boolean;

  constructor(public appCtrl: App, public navCtrl: NavController, private toastCtrl: ToastController, private file: File, private robotsService: RobotsService, private alSystemService: ALSystemService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad(): void {
    this.file.checkFile(this.file.dataDirectory, 'robots.json').then(res => {
      if (res) {
        this.file.readAsText(this.file.dataDirectory, 'robots.json').then(data => {
          this.robots = JSON.parse(data);
          this.robotsService.update(this.robots);
        });
      }
    }, err => { });
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this.robotsService.robots.subscribe(robots => this.robots = robots);
    this.selectedRobots = [];
  }

  addRobot(): void {
    this.navCtrl.push('AddRobotPage');
  }

  sendPing(item: ItemSliding, robot: Robot): void {
    item.close();
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    ping('http://' + robot.ip).then(delta => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Ping result',
        subTitle: 'Ping ' + robot.name + ' success.',
        buttons: ['OK']
      }).present();
    }).catch(function (err) {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Ping result',
        subTitle: 'Ping ' + robot.name + ' failed.',
        buttons: ['OK']
      }).present();
    });
  }

  delete(item: ItemSliding, robot: Robot): void {
    item.close();
    this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this robot?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            let index = 0;
            this.robotsService.robots.subscribe(robots => this.robots = robots);
            this.robots.forEach(element => {
              if (element === robot) {
                this.robots.splice(index, 1);
              }
              index++;
            });
            this.robotsService.update(this.robots);
          }
        }
      ]
    }).present();
  }

  edit(item: ItemSliding, robot: Robot): void {
    item.close();
    const ipPart = robot.ip.split('.');
    this.alertCtrl.create({
      title: 'Edit - ' + robot.name,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: robot.name
        },
        {
          name: 'ipPart0',
          placeholder: 'Number 1',
          value: ipPart[0],
          type: 'number'
        },
        {
          name: 'ipPart1',
          placeholder: 'Number 2',
          value: ipPart[1],
          type: 'number'
        },
        {
          name: 'ipPart2',
          placeholder: 'Number 3',
          value: ipPart[2],
          type: 'number'
        },
        {
          name: 'ipPart3',
          placeholder: 'Number 4',
          value: ipPart[3],
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            const ip = new IP([data.ipPart0, data.ipPart1, data.ipPart2, data.ipPart3]);
            if (!data.name || data.name.trim() === '') {
              this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Enter a correct name.',
                buttons: ['OK']
              }).present();
              return false;
            } else if (!ip.isValid()) {
              this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Enter correct numbers.',
                buttons: ['OK']
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
                          title: 'Error',
                          subTitle: 'Verify your network connection!',
                          buttons: ['OK']
                        }).present();
                      });
                    }
                  }
                });
                this.robotsService.update(this.robots);
              }
            }
          }
        }
      ]
    }).present();
  }

  onSearch(): void {
    this.searching = true;
  }

  filterItems(): void {
    this.robotsService.filter(this.searchTerm).subscribe(robots => this.robots = robots);
  }

  updateName(name: string, ip: IP): void {
    this.alSystemService.setIP(ip);
    this.alSystemService.setName(name).then(() => {
      this.alertCtrl.create({
        title: 'Update confirmation',
        message: 'The name will be apply after a reboot. Do you want to reboot ' + name + ' now?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Reboot now',
            handler: () => {
              this.alSystemService.reboot().then(() => {
                this.alertCtrl.create({
                  title: 'Info',
                  subTitle: name + ' is rebooting...',
                  buttons: ['OK']
                }).present();
              });
            }
          }
        ]
      }).present();
      this.robotsService.update(this.robots);
    });
  }

  openMonitor(robot: Robot): void {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    const self = this;
    ping('http://' + robot.ip).then(delta => {
      loading.dismiss();
      this.navCtrl.push('SettingsRobotPage', { ip: robot.ip });
    }).catch(function (err) {
      loading.dismiss();
      self.alertCtrl.create({
        title: 'Network error',
        subTitle: 'Unable to find ' + robot.name + '!',
        buttons: ['OK']
      }).present();
    });
  }

  selectRobot(robot: Robot): void {
    if (this.selectedRobots.find(elem => elem === robot))
      this.selectedRobots = this.selectedRobots.filter(element => element !== robot);
    else
      this.selectedRobots.push(robot);
  }

  cancelSelection(): void {
    this.selectedRobots = [];
    setTimeout(() => this.isSelection = false, 50);
  }

  removeRobots(): void {
    if (this.selectedRobots.length > 0) {
      this.alertCtrl.create({
        title: 'Delete confirmation',
        message: 'Are you shure to delete them?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.robotsService.update(this.robots.filter(element => this.selectedRobots.indexOf(element) < 0));
              this.robotsService.robots.subscribe(robots => this.robots = robots);
              this.toastCtrl.create({
                message: 'Robot was success fully deleted.',
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
        message: 'No robot was deleted.',
        duration: 3000,
        position: 'bottom'
      }).present();
      this.cancelSelection();
    }
  }
}
