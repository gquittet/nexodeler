import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VolumeControlComponent } from './volume-control';
import { ALAudioDeviceService } from '../../../app/services/naoqi/alaudiodevice.service';

@NgModule({
    declarations: [
        VolumeControlComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        VolumeControlComponent
    ],
    providers: [
        ALAudioDeviceService
    ]
})
export class VolumeControlModule { }
