import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';
import { ListItemRebootButtonComponent } from './list-item-reboot-button.component';



@NgModule({
    declarations: [
        ListItemRebootButtonComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        ListItemRebootButtonComponent
    ],
    providers: [
        ALSystemService
    ]
})
export class ListItemRebootButtonModule { }
