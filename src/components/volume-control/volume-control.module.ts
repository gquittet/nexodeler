import { NgModule } from '@angular/core';
import { VolumeControlComponent } from './volume-control';
import { IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        VolumeControlComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        VolumeControlComponent
    ]
})
export class VolumeControlModule { }
