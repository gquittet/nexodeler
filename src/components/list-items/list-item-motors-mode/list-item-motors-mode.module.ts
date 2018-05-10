import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';
import { ListItemMotorsModeComponent } from './list-item-motors-mode.component';

@NgModule({
    declarations: [
        ListItemMotorsModeComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemMotorsModeComponent
    ],
    providers: [
        ALMotionService
    ]
})
export class ListItemMotorsModeModule { }
