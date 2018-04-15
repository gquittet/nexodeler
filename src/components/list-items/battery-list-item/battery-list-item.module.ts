import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BatteryListItemComponent } from './battery-list-item';
import { ALBatteryService } from '../../../app/services/naoqi/albattery.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        BatteryListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        BatteryListItemComponent
    ],
    providers: [
        ALBatteryService
    ]
})
export class BatteryListItemModule { }
