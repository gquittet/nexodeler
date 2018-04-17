import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListModulesPage } from './list-modules';
import { TranslateModule } from '@ngx-translate/core';
import { ModulesModule } from '../../app/services/modules/modules.module';

@NgModule({
  declarations: [
    ListModulesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListModulesPage),
    ModulesModule,
    TranslateModule
  ],
  exports: [
    ListModulesPage
  ]
})
export class ListModulesPageModule {}
