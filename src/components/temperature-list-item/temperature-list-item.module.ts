import { NgModule } from '@angular/core';
import { TemperatureListItemComponent } from './temperature-list-item';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
        TemperatureListItemComponent
    ],
	imports: [
        IonicModule
    ],
	exports: [
        TemperatureListItemComponent
    ]
})
export class TemperatureListItemModule {}
