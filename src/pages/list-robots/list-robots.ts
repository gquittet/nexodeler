import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { App, NavController, AlertController, LoadingController, ItemSliding, IonicPage } from 'ionic-angular';

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
  templateUrl: 'list-robots.html'
})
export class ListRobotsPage {

  name = 'Robots';
  robots: Robot[];
  searchControl: FormControl;
  searchTerm: string = '';
  searching: boolean = false;

  constructor(public appCtrl: App, public navCtrl: NavController, private file: File, private robotsService: RobotsService, private alSystemService: ALSystemService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.robots = [];
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    // this.file.removeFile(this.file.dataDirectory, 'robots.json');
    this.file.checkFile(this.file.dataDirectory, 'robots.json').then(res => {
      if (res) {
        this.file.readAsText(this.file.dataDirectory, 'robots.json').then(data => {
          console.log('[Info]: Read the file: robots.json');
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

  addRobot() {
    this.navCtrl.push('AddRobotPage');
  }

  sendPing(item: ItemSliding, robot: Robot) {
    item.close();
    const self = this;
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    ping('http://' + robot.ip).then(delta => {
      loading.dismiss();
      self.alertCtrl.create({
        title: 'Ping result',
        subTitle: 'Ping ' + robot.name + ' success.',
        buttons: ['OK']
      }).present();
    }).catch(function (err) {
      loading.dismiss();
      self.alertCtrl.create({
        title: 'Ping result',
        subTitle: 'Ping ' + robot.name + ' failed.',
        buttons: ['OK']
      }).present();
    });
  }

  delete(item: ItemSliding, robot: Robot) {
    item.close();
    const self = this;
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
            self.robotsService.robots.subscribe(robots => self.robots = robots);
            self.robots.forEach(element => {
              if (element === robot) {
                self.robots.splice(index, 1);
              }
              index++;
            });
            self.robotsService.update(self.robots);
          }
        }
      ]
    }).present();
  }

  edit(item: ItemSliding, robot: Robot) {
    item.close();
    const ipPart = robot.ip.split('.');
    const self = this;
    self.alertCtrl.create({
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
              self.alertCtrl.create({
                title: 'Error',
                subTitle: 'Enter a correct name.',
                buttons: ['OK']
              }).present();
              return false;
            } else if (!ip.isValid()) {
              self.alertCtrl.create({
                title: 'Error',
                subTitle: 'Enter correct numbers.',
                buttons: ['OK']
              }).present();
              return false;
            } else {
              if (robot.name != data.name.trim() || ipPart[0] != data.ipPart0 || ipPart[1] != data.ipPart1 || ipPart[2] != data.ipPart2 || ipPart[3] != data.ipPart3) {
                self.robotsService.robots.subscribe(robots => self.robots = robots);
                self.robots.forEach(element => {
                  if (element === robot) {
                    element.ip = ip.toString();
                    if (robot.name != data.name.trim()) {
                      ping('http://' + ip.toString()).then(delta => {
                        element.name = data.name.trim();
                        self.updateName(element.name, ip);
                      }).catch(function (err) {
                        self.alertCtrl.create({
                          title: 'Error',
                          subTitle: 'Verify your network connection !',
                          buttons: ['OK']
                        }).present();
                      });
                    }
                  }
                });
                self.robotsService.update(self.robots);
              }
            }
          }
        }
      ]
    }).present();
  }

  onSearch() {
    this.searching = true;
  }

  filterItems() {
    this.robotsService.filter(this.searchTerm).subscribe(robots => this.robots = robots);
  }

  updateName(name: string, ip: IP) {
    const self = this;
    this.alSystemService.setIP(ip);
    this.alSystemService.setName(name).then(() => {
      self.alertCtrl.create({
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
              self.alSystemService.reboot().then(() => {
                self.alertCtrl.create({
                  title: 'Info',
                  subTitle: name + ' is rebooting ...',
                  buttons: ['OK']
                }).present();
              });
            }
          }
        ]
      }).present();
      self.robotsService.update(self.robots);
    });
  }

  openMonitor(robot: Robot) {
    this.navCtrl.push('SettingsRobotPage');
  }
}
