import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ALTextToSpeechService } from '../../../app/services/naoqi/altexttospeech.service';


@IonicPage()
@Component({
  selector: 'page-module-thematical-association',
  templateUrl: 'module-thematical-association.html',
  animations: [
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'scale(0%)', opacity: 0 }),
        animate('300ms ease-in', keyframes([
          style({ transform: 'scale(0%)', opacity: 0, offset: 0 }),
          style({ transform: 'scale(50%)', opacity: 0.3, offset: 0.3 }),
          style({ transform: 'scale(200%)', opacity: 0.8, offset: 0.8 }),
          style({ transform: 'scale(100%)', opacity: 1, offset: 1 })
        ])),
      ]),
      transition(':leave', [
        style({ transform: 'scale(100%)', opacity: 1 }),
        animate('300ms ease-in', keyframes([
          style({ transform: 'scale(100%)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(200%)', opacity: 0.8, offset: 0.3 }),
          style({ transform: 'scale(50%)', opacity: 0.3, offset: 0.8 }),
          style({ transform: 'scale(0%)', opacity: 0, offset: 1 })
        ])),
      ])
    ])
  ]
})
export class ModuleThematicalAssociationPage {

  private themes = [
    Theme.Bathroom
  ];

  private path: string = "./assets/modules/thematicalassociation/imgs/";

  theme: string;

  thematicalObjects: ThematicalObject[] = [
    <ThematicalObject>{ name: 'toothbrush', picture: this.path + 'toothbrush.jpg', category: Category.DentalCare, theme: Theme.Bathroom },
    <ThematicalObject>{ name: 'toothpaste', picture: this.path + 'toothpaste.jpg', category: Category.DentalCare, theme: Theme.Bathroom },
    <ThematicalObject>{ name: 'comb', picture: this.path + 'comb.jpg', category: Category.HairCare, theme: Theme.Bathroom },
    <ThematicalObject>{ name: 'hair', picture: this.path + 'hair.jpg', category: Category.HairCare, theme: Theme.Bathroom },
    <ThematicalObject>{ name: 'soap', picture: this.path + 'soap.jpg', category: Category.Wash, theme: Theme.Bathroom },
    <ThematicalObject>{ name: 'washcloth', picture: this.path + 'washcloth.jpg', category: Category.Wash, theme: Theme.Bathroom },
  ];

  selectedImages: ThematicalObject[];

  selectedThematicalObjects: ThematicalObject[];
  selectedTargets: any[];

  private confirmExitText: string;
  private notCorrectText: string;
  private noText: string;
  private okText: string;
  private questionGameExitText: string;
  private superText: string;
  private victoryText: string;
  private yesText: string;
  private youpieWinText: string;
  private correctText: string;
  private youWinText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, translate: TranslateService, private alertCtrl: AlertController, private alTextToSpeech: ALTextToSpeechService) {
    translate.get('UI.ALERT.TITLE.CONFIRM.EXIT').subscribe((res: string) => this.confirmExitText = res)
    translate.get('UI.ALERT.CONTENT.QUESTION.GAME.EXIT').subscribe((res: string) => this.questionGameExitText = res)
    translate.get('NO').subscribe((res: string) => this.noText = res);
    translate.get('OK').subscribe((res: string) => this.okText = res);
    translate.get('VICTORY').subscribe((res: string) => this.victoryText = res);
    translate.get('YES').subscribe((res: string) => this.yesText = res);
    translate.get('YOU_WIN').subscribe((res: string) => this.youWinText = res);
    translate.get('SUPER').subscribe((res: string) => this.superText = res);
    translate.get('REACTIONS.NEGATIVES.NO_IT_IS_NOT_CORRECT').subscribe((res: string) => this.notCorrectText = res);
    translate.get('REACTIONS.POSITIVES.YOUPI_YOU_WIN').subscribe((res: string) => this.youpieWinText = res);
    translate.get('REACTIONS.POSITIVES.GOOD_GAME').subscribe((res: string) => this.correctText = res);
    this.selectedImages = [];
    this.selectedThematicalObjects = [];
    this.selectedTargets = [];
    this.theme = this.themes[Math.floor(Math.random() * this.themes.length)];
    let element: ThematicalObject;
    while (this.selectedImages.length < 6) {
      element = this.thematicalObjects[Math.floor(Math.random() * this.thematicalObjects.length)];
      if (element.theme === Theme.Bathroom) {
        if (this.selectedImages.indexOf(element) === -1) {
          this.selectedImages.push(element);
        }
      }
    }
  }

  ionViewDidLoad(): void {

  }

  selectImage(thematicalObject: ThematicalObject, event: any): void {
    if (this.selectedThematicalObjects.length < 2) {
      if (this.selectedThematicalObjects.indexOf(thematicalObject) === -1) {
        event.classList.add('selected');
        this.selectedTargets.push(event);
        this.selectedThematicalObjects.push(thematicalObject);
        if (this.selectedThematicalObjects.length === 2) {
          setTimeout(() => {
            if (this.compare(this.selectedThematicalObjects)) {
              this.selectedThematicalObjects.forEach(element => {
                this.selectedImages = this.selectedImages.map(elem => {
                  if (elem === element) {
                    elem.name = '';
                  }
                  return elem;
                });
              });
              this.alTextToSpeech.say(this.correctText);
              setTimeout(() => this.hasWon(), 500);
            } else {
              this.alTextToSpeech.say(this.notCorrectText);
            }
            this.selectedTargets.forEach(element => {
              element.classList.remove('selected');
            });
            this.selectedTargets = [];
            this.selectedThematicalObjects = [];
          }, 700);
        }
      } else {
        event.classList.remove('selected');
        this.selectedTargets.splice(this.selectedTargets.indexOf(thematicalObject), 1);
        this.selectedThematicalObjects.splice(this.selectedThematicalObjects.indexOf(thematicalObject), 1);
      }
    }
  }

  private compare(selected: ThematicalObject[]): boolean {
    if (selected.length === 2)
      return selected[0].category === selected[1].category;
    throw 'compare(array): The compare table must contains only 2 elements.';
  }

  private hasWon(): boolean {
    let win: boolean = true;
    for (let thematicalObject of this.selectedImages) {
      if (thematicalObject.name !== '') {
        win = false;
        break;
      }
    }
    if (win) {
      this.alTextToSpeech.say(this.youpieWinText);
      this.alertCtrl.create({
        title: this.victoryText,
        subTitle: this.youWinText,
        enableBackdropDismiss: false,
        buttons: [{
          text: this.okText,
          handler: () => {
            this.dismiss();
          }
        }]
      }).present();
    }
    return win;
  }

  private dismiss(): void {
    this.viewCtrl.dismiss();
  }

  exit(): void {
    if (!this.hasWon()) {
      this.alTextToSpeech.say(this.questionGameExitText);
      this.alertCtrl.create({
        title: this.confirmExitText,
        subTitle: this.questionGameExitText,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: this.noText
          },
          {
            text: this.yesText,
            handler: () => {
              this.dismiss();
            }
          }]
      }).present();
    }
  }
}

export enum Category {
  DentalCare,
  HairCare,
  Wash
}

export enum Theme {
  Bathroom = "BATHROOM"
}

export interface ThematicalObject {
  name: string;
  picture: string;
  category: Category;
  theme: Theme;
}
