import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALAutonomousLifeService } from '../../../app/services/naoqi/alautonomouslife.service';
import { ListItemALAutonomousLifeComponent } from './list-item-al-autonomous-life.component';

@NgModule({
    declarations: [
        ListItemALAutonomousLifeComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemALAutonomousLifeComponent
    ],
    providers: [
        ALAutonomousLifeService
    ]
})
export class ListItemALAutonomousLifeModule { }
