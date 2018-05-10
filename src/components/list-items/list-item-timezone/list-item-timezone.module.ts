import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { ListItemTimezoneComponent } from './list-item-timezone.component';

@NgModule({
	declarations: [
        ListItemTimezoneComponent
    ],
	imports: [
        IonicModule,
        TranslateModule
    ],
	exports: [
        ListItemTimezoneComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class ListItemTimezoneModule {}
