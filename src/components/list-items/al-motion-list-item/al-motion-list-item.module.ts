import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ALMotionListItemComponent } from './al-motion-list-item';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';

@NgModule({
    declarations: [
        ALMotionListItemComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ALMotionListItemComponent
    ],
    providers: [
        ALMotionService
    ]
})
export class ALMotionListItemModule { }
