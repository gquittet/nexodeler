import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BtrAlert } from '../../objects/alert/BtrAlert';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';


@Component({
  selector: 'languages-available-list-item',
  templateUrl: 'languages-available-list-item.html'
})
export class LanguagesAvailableListItemComponent {

  private alert: BtrAlert;
  private languagesInterval: number;

  private languages: string[];

  constructor(private alertCtrl: AlertController, private alTextToSpeech: ALTextToSpeechService) { }

  ngOnInit(): void {
    this.alert = new BtrAlert(this.alertCtrl);
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
    const alert = this.alert.create('Languages');
    this.languages.forEach(language => this.alert.createInput(language));
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
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
