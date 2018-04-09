import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ShutdownButtonComponent } from './shutdown-button';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';


@NgModule({
    declarations: [
        ShutdownButtonComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ShutdownButtonComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class ShutdownButtonModule { }
