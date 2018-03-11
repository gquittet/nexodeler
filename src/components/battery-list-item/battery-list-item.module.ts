import { NgModule } from '@angular/core';
import { BatteryListItemComponent } from './battery-list-item';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        BatteryListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        BatteryListItemComponent
    ]
})
export class BatteryListItemModule { }
