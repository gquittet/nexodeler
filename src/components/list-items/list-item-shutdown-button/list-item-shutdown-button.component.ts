import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { QiService } from '../../../app/services/naoqi/qi.service';


@Component({
  selector: 'list-item-shutdown-button',
  templateUrl: 'list-item-shutdown-button.component.html'
})
export class ListItemShutdownButtonComponent {

  private _subscription: Subscription;

  private _confirmShutdownText: string;
  private _noText: string;
  private _okText: string;
  private _questionShutdownText: string;
  private _shutdownText: string;
  private _yesText: string;

  constructor(private _navCtrl: NavController, private _viewCtrl: ViewController, private _alertCtrl: AlertController, private _translate: TranslateService, private _alSystem: ALSystemService) {
    this._subscription = _translate.get('NO').subscribe((res: string) => this._noText = res);
    this._subscription.add(_translate.get('OK').subscribe((res: string) => this._okText = res));
    this._subscription.add(_translate.get('UI.ALERT.TITLE.CONFIRM.SHUTDOWN').subscribe((res: string) => this._confirmShutdownText = res));
    this._subscription.add(_translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.SHUTDOWN').subscribe((res: string) => this._questionShutdownText = res));
    this._subscription.add(_translate.get('YES').subscribe((res: string) => this._yesText = res));
  }

  ngOnInit(): void {
    this._alSystem.getName().then((name: string) => {
      this._subscription.add(this._translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.IS_SHUTTINGDOWN_DOTS', { value: name }).subscribe((res: string) => this._shutdownText = res));
    }).catch(error => console.error(error));
  }

  shutdown(): void {
    this._alertCtrl.create({
      title: this._confirmShutdownText,
      message: this._questionShutdownText,
      buttons: [
        {
          text: this._noText,
          role: 'cancel'
        },
        {
          text: this._yesText,
          handler: () => {
            this._alSystem.shutdown().catch(error => console.error(error));
            this._alertCtrl.create({
              title: 'Info',
              subTitle: this._shutdownText,
              buttons: [
                {
                  text: this._okText,
                  handler: () => {
                    QiService.disconnect();
                    this._navCtrl.remove(this._viewCtrl.index, 1);
                  }
                }
              ]
            }).present();
          }
        }
      ]
    }).present();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
