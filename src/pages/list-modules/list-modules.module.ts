import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulesModule } from '../../app/services/modules/modules.module';
import { RobotsModule } from '../../app/services/robots/robots.module';
import { ListModulesPage } from './list-modules';

@NgModule({
  declarations: [
    ListModulesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListModulesPage),
    ModulesModule,
    RobotsModule,
    TranslateModule
  ],
  exports: [
    ListModulesPage
  ]
})
export class ListModulesPageModule {}
