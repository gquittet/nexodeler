import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SidenavMainComponent } from './sidenav-main';

@NgModule({
	declarations: [
        SidenavMainComponent
    ],
	imports: [
        IonicModule
    ],
	exports: [
        SidenavMainComponent
    ]
})
export class SidenavMainModule {}
