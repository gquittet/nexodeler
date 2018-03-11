import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ViewController, AlertController, LoadingController, IonicPage } from 'ionic-angular';

import { IP } from '../../app/objects/IP';
import { Robot } from '../../app/objects/Robot';

import { ALSystemService } from '../../app/services/naoqi/alsystem.service';
import { RobotsService } from '../../app/services/robots/robots.service';

declare var ping: any;

@IonicPage()
@Component({
  selector: 'page-add-robot',
  templateUrl: 'add-robot.html'
})
export class AddRobotPage {

  name = 'Add Robot';
  addForm: FormGroup;
  robots: Robot[];

  constructor(private fb: FormBuilder, public navCtrl: NavController, public viewCtrl: ViewController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private robotsService: RobotsService, private alSystemService: ALSystemService) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      'number1': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number2': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number3': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])],
      'number4': ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(255), Validators.minLength(1), Validators.maxLength(3)])]
    });
  }

  save() {
    const ip = new IP([this.addForm.controls['number1'].value, this.addForm.controls['number2'].value,
    this.addForm.controls['number3'].value, this.addForm.controls['number4'].value]);
    this.robotsService.robots.subscribe(robots => this.robots = robots);
    const self = this;
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    ping('http://' + ip.toString()).then(delta => {
      const timer = setTimeout(() => {
        loading.dismiss();
        self.alertCtrl.create({
          title: 'Error',
          subTitle: 'Unable to get the robot name.',
          buttons: ['OK']
        }).present();
      }, 5000);
      self.alSystemService.setIP(ip);
      self.alSystemService.getName().then(robotName => {
        const robot = new Robot(robotName, ip.toString());
        self.robots.push(robot);
        self.robotsService.update(self.robots);
        clearTimeout(timer);
        loading.dismiss();
        self.goBack();
      }, error => {
        self.alertCtrl.create({
          title: 'Error',
          subTitle: 'Unable to get the robot name.',
          buttons: ['OK']
        }).present();
      });
    }).catch(err => {
      loading.dismiss();
      self.alertCtrl.create({
        title: 'Error',
        subTitle: 'Verify your network connection !',
        buttons: ['OK']
      }).present();
    });
  }

  goBack() {
    this.navCtrl.remove(this.viewCtrl.index, 1);
  }
}