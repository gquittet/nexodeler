import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RebootButtonComponent } from './reboot-button';

import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';


@NgModule({
    declarations: [
        RebootButtonComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        RebootButtonComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class RebootButtonModule { }
