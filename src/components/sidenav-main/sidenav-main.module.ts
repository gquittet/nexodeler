import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { SidenavMainComponent } from './sidenav-main.component';

@NgModule({
    declarations: [
        SidenavMainComponent
    ],
    imports: [
        IonicModule,
        TranslateModule
    ],
    exports: [
        SidenavMainComponent
    ]
})
export class SidenavMainModule { }
