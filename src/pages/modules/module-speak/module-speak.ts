import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';


@IonicPage()
@Component({
  selector: 'page-module-speak',
  templateUrl: 'module-speak.html'
})
export class ModuleSpeakPage {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alTextToSpeech: ALTextToSpeechService) { }

  speak(): void {
    if (!this.text)
      throw "[ERROR][MODULES][SPEAK] speak(): Text is undefined or null."
    this.alTextToSpeech.say(this.text);
  }
}
