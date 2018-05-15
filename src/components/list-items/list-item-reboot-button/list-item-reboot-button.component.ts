import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, ViewController } from 'ionic-angular';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { QiService } from '../../../app/services/naoqi/qi.service';


@Component({
  selector: 'list-item-reboot-button',
  templateUrl: 'list-item-reboot-button.component.html'
})
export class ListItemRebootButtonComponent {

  private _confirmRebootText: string;
  private _noText: string;
  private _okText: string;
  private _questionRebootText: string;
  private _rebootText: string;
  private _yesText: string;

  constructor(private _navCtrl: NavController, private _viewCtrl: ViewController, private _alertCtrl: AlertController, private _translate: TranslateService, private _alSystem: ALSystemService) {
    _translate.get('NO').subscribe((res: string) => this._noText = res);
    _translate.get('OK').subscribe((res: string) => this._okText = res);
    _translate.get('UI.ALERT.TITLE.CONFIRM.REBOOT').subscribe((res: string) => this._confirmRebootText = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.REBOOT').subscribe((res: string) => this._questionRebootText = res);
    _translate.get('YES').subscribe((res: string) => this._yesText = res);
  }

  ngOnInit(): void {
    this._alSystem.getName().then((name: string) => {
      this._translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.IS_REBOOTING_DOTS', { value: name }).subscribe((res: string) => this._rebootText = res);
    }).catch(error => console.error(error));
  }

  reboot(): void {
    this._alertCtrl.create({
      title: this._confirmRebootText,
      message: this._questionRebootText,
      buttons: [
        {
          text: this._noText,
          role: 'cancel'
        },
        {
          text: this._yesText,
          handler: () => {
            this._alSystem.reboot().catch(error => console.error(error));
            this._alertCtrl.create({
              title: 'Info',
              subTitle: this._rebootText,
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

}
