import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { QiService } from '../../app/services/naoqi/qi.service';


@Component({
  selector: 'modal-title',
  templateUrl: 'modal-title.component.html'
})
export class ModalTitleComponent {

  @Input() title: string;

  constructor(private viewCtrl: ViewController) { }

  exit(): void {
    this.viewCtrl.dismiss();
  }

  ngOnDestroy(): void {
    QiService.disconnect();
  }
}
