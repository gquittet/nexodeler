import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListModulesPage } from './list-modules';
import { TranslateModule } from '@ngx-translate/core';
import { ModulesService } from '../../app/services/modules/modules.service';

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
    ModulesService
  ]
})
export class ListModulesPageModule {}
