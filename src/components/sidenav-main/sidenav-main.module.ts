import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SidenavMainComponent } from './sidenav-main';
import { TranslateModule } from '@ngx-translate/core';

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
