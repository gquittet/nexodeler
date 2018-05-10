import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ModalTitleComponent } from './modal-title.component';

@NgModule({
  declarations: [ModalTitleComponent],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [ModalTitleComponent]
})
export class ModalTitleModule { }
