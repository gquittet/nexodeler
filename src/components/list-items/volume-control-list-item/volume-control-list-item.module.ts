import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VolumeControlListItemComponent } from './volume-control-list-item';
import { ALAudioDeviceService } from '../../../app/services/naoqi/alaudiodevice.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        VolumeControlListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        VolumeControlListItemComponent
    ],
    providers: [
        ALAudioDeviceService
    ]
})
export class VolumeControlListItemModule { }
