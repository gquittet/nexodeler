import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ListItemThemeSelectorComponent } from './list-item-theme-selector';
@NgModule({
  declarations: [ListItemThemeSelectorComponent],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [ListItemThemeSelectorComponent]
})
export class ListItemThemeSelectorModule { }
