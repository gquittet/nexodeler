import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALBatteryService } from '../../../app/services/naoqi/albattery.service';
import { ListItemBatteryLevelComponent } from './list-item-battery-level.component';

@NgModule({
    declarations: [
        ListItemBatteryLevelComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemBatteryLevelComponent
    ],
    providers: [
        ALBatteryService
    ]
})
export class ListItemBatteryLevelModule { }
