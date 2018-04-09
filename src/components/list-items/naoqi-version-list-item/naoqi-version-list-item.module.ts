import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NaoqiVersionListItemComponent } from './naoqi-version-list-item';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';

@NgModule({
    declarations: [
        NaoqiVersionListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        NaoqiVersionListItemComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class NaoqiVersionListItemModule { }
