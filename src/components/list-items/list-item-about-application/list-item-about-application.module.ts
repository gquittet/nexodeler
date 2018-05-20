import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { AboutService } from '../../../app/services/about/about.service';
import { ListItemAboutApplicationComponent } from './list-item-about-application';
@NgModule({
	declarations: [ListItemAboutApplicationComponent],
	imports: [
		IonicModule,
		TranslateModule
	],
	exports: [ListItemAboutApplicationComponent],
	providers: [
		AboutService
	]
})
export class ListItemAboutApplicationModule { }
