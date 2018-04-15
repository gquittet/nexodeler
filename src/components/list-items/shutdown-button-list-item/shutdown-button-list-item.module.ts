import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ShutdownButtonListItemComponent } from './shutdown-button-list-item';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        ShutdownButtonListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ShutdownButtonListItemComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class ShutdownButtonListItemModule { }
