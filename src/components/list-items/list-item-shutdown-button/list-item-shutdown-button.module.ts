import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { ListItemShutdownButtonComponent } from './list-item-shutdown-button.component';


@NgModule({
    declarations: [
        ListItemShutdownButtonComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemShutdownButtonComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class ListItemShutdownButtonModule { }
