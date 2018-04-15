import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { AlertController, ViewController, NavController } from 'ionic-angular';
import { QiService } from '../../../app/services/naoqi/qi.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'reboot-button-list-item',
  templateUrl: 'reboot-button-list-item.html'
})
export class RebootButtonListItemComponent {

  private confirmRebootText: string;
  private noText: string;
  private okText: string;
  private questionRebootText: string;
  private rebootText: string;
  private yesText: string;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private alertCtrl: AlertController, private translate: TranslateService, private alSystem: ALSystemService) {
    translate.get('NO').subscribe((res: string) => this.noText = res);
    translate.get('OK').subscribe((res: string) => this.okText = res);
    translate.get('UI.ALERT.TITLE.CONFIRM.REBOOT').subscribe((res: string) => this.confirmRebootText = res);
    translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.REBOOT').subscribe((res: string) => this.questionRebootText = res);
    translate.get('YES').subscribe((res: string) => this.yesText = res);
  }

  ngOnInit(): void {
    this.alSystem.getName().then((name: string) => {
      this.translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.IS_REBOOTING_DOTS', { value: name }).subscribe((res: string) => this.rebootText = res);
    }).catch(error => console.error(error));
  }

  reboot(): void {
    this.alertCtrl.create({
      title: this.confirmRebootText,
      message: this.questionRebootText,
      buttons: [
        {
          text: this.noText,
          role: 'cancel'
        },
        {
          text: this.yesText,
          handler: () => {
            this.alSystem.reboot().catch(error => console.error(error));
            this.alertCtrl.create({
              title: 'Info',
              subTitle: this.rebootText,
              buttons: [
                {
                  text: this.okText,
                  handler: () => {
                    QiService.disconnect();
                    this.navCtrl.remove(this.viewCtrl.index, 1);
                  }
                }
              ]
            }).present();
          }
        }
      ]
    }).present();
  }

}
