import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ListItemLanguagesSelectorComponent } from './list-item-languages-selector';
@NgModule({
	declarations: [ListItemLanguagesSelectorComponent],
	imports: [
		IonicModule,
		TranslateModule
	],
	exports: [ListItemLanguagesSelectorComponent]
})
export class ListItemLanguagesSelectorModule { }
