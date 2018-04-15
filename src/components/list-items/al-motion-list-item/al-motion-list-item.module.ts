import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ALMotionListItemComponent } from './al-motion-list-item';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ALMotionListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ALMotionListItemComponent
    ],
    providers: [
        ALMotionService
    ]
})
export class ALMotionListItemModule { }
