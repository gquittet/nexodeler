import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AlertCombobox } from '../../objects/alert/AlertCombobox';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'languages-available-list-item',
  templateUrl: 'languages-available-list-item.html'
})
export class LanguagesAvailableListItemComponent {

  private alert: AlertCombobox;
  private languagesInterval;

  private alertTitle: string;
  private okText: string;
  private cancelText: string;

  private languages: string[];

  constructor(private alertCtrl: AlertController, translate: TranslateService, private alTextToSpeech: ALTextToSpeechService) {
    translate.get('OK').subscribe((res: string) => this.okText = res);
    translate.get('VERBS.CANCEL').subscribe((res: string) => this.cancelText = res);
    translate.get('LANGUAGES').subscribe((res: string) => this.alertTitle = res);
  }

  ngOnInit(): void {
    this.alert = new AlertCombobox(this.alertCtrl);
    this.getLanguages();
    this.languagesInterval = setInterval(() => this.getLanguages(), 3000);
  }

  private getLanguages(): void {
    this.alTextToSpeech.getAvailableLanguages().then(languages => this.languages = languages).catch(error => console.error(error));
    this.alTextToSpeech.getLanguage().then(language => {
      this.alert.setResult(language);
    }).catch(error => console.error(error));
  }

  show(): void {
    const alert = this.alert.create(this.alertTitle);
    this.languages.forEach(language => this.alert.createInput(language));
    alert.addButton(this.cancelText);
    alert.addButton({
      text: this.okText,
      handler: data => {
        this.alert.close();
        this.alTextToSpeech.setLanguage(data);
        this.alert.setResult(data);
      }
    });
    this.alert.present();
  }

  ngOnDestroy(): void {
    clearInterval(this.languagesInterval);
  }
}
