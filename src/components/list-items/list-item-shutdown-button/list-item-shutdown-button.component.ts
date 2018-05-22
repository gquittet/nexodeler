import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, ViewController } from 'ionic-angular';
import { Theme } from '../../../app/objects/Theme';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { QiService } from '../../../app/services/naoqi/qi.service';
import { SettingsService } from '../../../app/services/settings/settings.service';


@Component({
  selector: 'list-item-shutdown-button',
  templateUrl: 'list-item-shutdown-button.component.html'
})
export class ListItemShutdownButtonComponent {

  private _takeWhile: boolean = true;

  private _confirmShutdownText: string;
  private _noText: string;
  private _okText: string;
  private _questionShutdownText: string;
  private _shutdownText: string;
  private _yesText: string;

  // UI
  // Theme
  private _theme: Theme;

  constructor(private _navCtrl: NavController, private _viewCtrl: ViewController, private _alertCtrl: AlertController, private _translate: TranslateService, private _alSystem: ALSystemService, private _settingsService: SettingsService) {
    _translate.get('NO').takeWhile(() => this._takeWhile).subscribe((res: string) => this._noText = res);
    _translate.get('OK').takeWhile(() => this._takeWhile).subscribe((res: string) => this._okText = res);
    _translate.get('UI.ALERT.TITLE.CONFIRM.SHUTDOWN').takeWhile(() => this._takeWhile).subscribe((res: string) => this._confirmShutdownText = res);
    _translate.get('UI.ALERT.CONTENT.QUESTION.ROBOT.SHUTDOWN').takeWhile(() => this._takeWhile).subscribe((res: string) => this._questionShutdownText = res);
    _translate.get('YES').takeWhile(() => this._takeWhile).subscribe((res: string) => this._yesText = res);
    this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
  }

  ngOnInit(): void {
    this._alSystem.getName().then((name: string) => {
      this._translate.get('UI.ALERT.CONTENT.LABEL.ROBOT.IS_SHUTTINGDOWN_DOTS', { value: name }).takeWhile(() => this._takeWhile).subscribe((res: string) => this._shutdownText = res);
    }).catch(error => console.error(error));
  }

  shutdown(): void {
    this._alertCtrl.create({
      title: this._confirmShutdownText,
      message: this._questionShutdownText,
      cssClass: this._theme.class,
      buttons: [
        {
          text: this._noText,
          role: 'cancel'
        },
        {
          text: this._yesText,
          cssClass: this._theme.class,
          handler: () => {
            this._alSystem.shutdown().catch(error => console.error(error));
            this._alertCtrl.create({
              title: 'Info',
              subTitle: this._shutdownText,
              cssClass: this._theme.class,
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
    this._takeWhile = false;
  }
}
