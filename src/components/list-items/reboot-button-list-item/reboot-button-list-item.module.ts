import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RebootButtonListItemComponent } from './reboot-button-list-item';

import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        RebootButtonListItemComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        RebootButtonListItemComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class RebootButtonListItemModule { }
