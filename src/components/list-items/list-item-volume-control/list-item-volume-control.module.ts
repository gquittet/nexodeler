import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALAudioDeviceService } from '../../../app/services/naoqi/alaudiodevice.service';
import { ListItemVolumeControlComponent } from './list-item-volume-control.component';

@NgModule({
    declarations: [
        ListItemVolumeControlComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemVolumeControlComponent
    ],
    providers: [
        ALAudioDeviceService
    ]
})
export class ListItemVolumeControlModule { }
