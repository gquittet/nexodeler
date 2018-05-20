import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulesService } from '../../app/services/modules/modules.service';
import { RobotsService } from '../../app/services/robots/robots.service';
import { ListModulesPage } from './list-modules';

@NgModule({
  declarations: [
    ListModulesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListModulesPage),
    TranslateModule
  ],
  exports: [
    ListModulesPage
  ],
  providers: [
    ModulesService,
    RobotsService
  ]
})
export class ListModulesPageModule { }
