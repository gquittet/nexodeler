import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TimezoneComponent } from './timezone';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';

@NgModule({
	declarations: [
        TimezoneComponent
    ],
	imports: [
        IonicModule
    ],
	exports: [
        TimezoneComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class TimezoneModule {}
