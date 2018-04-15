import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TimezoneListItemComponent } from './timezone-list-item';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
        TimezoneListItemComponent
    ],
	imports: [
        IonicModule,
        TranslateModule
    ],
	exports: [
        TimezoneListItemComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class TimezoneListItemModule {}
