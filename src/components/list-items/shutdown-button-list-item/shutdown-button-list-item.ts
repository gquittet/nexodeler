import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { AlertController, NavController, ViewController } from 'ionic-angular';
import { QiService } from '../../../app/services/naoqi/qi.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'shutdown-button-list-item',
  templateUrl: 'shutdown-button-list-item.html'
})
export class ShutdownButtonListItemComponent {

  private confirmShutdownText: string;
  private noText: string;
  private okText: string;
  private questionShutdownText: string;
  private shutdownText: string;
  private yesText: string;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private alertCtrl: AlertController, private translate: TranslateService, private alSystem: ALSystemService) {
    translate.get('NO').subscribe((res: string) => this.noText = res);
    translate.get('OK').subscribe((res: string) => this.okText = res);
    translate.get('UI.ALERT.TITLE.CONFIRM.SHUTDOWN').subscribe((res: string) => this.confirmShutdownText = res);
    translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.SHUTDOWN').subscribe((res: string) => this.questionShutdownText = res);
    translate.get('YES').subscribe((res: string) => this.yesText = res);
  }

  ngOnInit(): void {
    this.alSystem.getName().then((name: string) => {
      this.translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.IS_SHUTTINGDOWN_DOTS', { value: name }).subscribe((res: string) => this.shutdownText = res);
    }).catch(error => console.error(error));
  }

  shutdown(): void {
    this.alertCtrl.create({
      title: this.confirmShutdownText,
      message: this.questionShutdownText,
      buttons: [
        {
          text: this.noText,
          role: 'cancel'
        },
        {
          text: this.yesText,
          handler: () => {
            this.alSystem.shutdown().catch(error => console.error(error));
            this.alertCtrl.create({
              title: 'Info',
              subTitle: this.shutdownText,
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
