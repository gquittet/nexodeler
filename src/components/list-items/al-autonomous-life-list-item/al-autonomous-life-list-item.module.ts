import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ALAutonomousLifeListItemComponent } from './al-autonomous-life-list-item';
import { ALAutonomousLifeService } from '../../../app/services/naoqi/alautonomouslife.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ALAutonomousLifeListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ALAutonomousLifeListItemComponent
    ],
    providers: [
        ALAutonomousLifeService
    ]
})
export class ALAutonomousLifeListItemModule { }
