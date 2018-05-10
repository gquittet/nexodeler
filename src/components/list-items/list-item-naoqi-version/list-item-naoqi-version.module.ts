import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { ListItemNaoqiVersionComponent } from './list-item-naoqi-version.component';

@NgModule({
    declarations: [
        ListItemNaoqiVersionComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ListItemNaoqiVersionComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class ListItemNaoqiVersionModule { }
