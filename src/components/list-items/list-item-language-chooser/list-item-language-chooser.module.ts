import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ListItemLanguageChooserComponent } from './list-item-language-chooser';
@NgModule({
	declarations: [ListItemLanguageChooserComponent],
	imports: [
		IonicModule,
		TranslateModule
	],
	exports: [ListItemLanguageChooserComponent]
})
export class ListItemLanguageChooserModule { }
