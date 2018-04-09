import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BatteryListItemComponent } from './battery-list-item';
import { ALBatteryService } from '../../../app/services/naoqi/albattery.service';

@NgModule({
    declarations: [
        BatteryListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        BatteryListItemComponent
    ],
    providers: [
        ALBatteryService
    ]
})
export class BatteryListItemModule { }
