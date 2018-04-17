import { NgModule } from '@angular/core';

import { File } from '@ionic-native/file'
import { ModulesService } from './modules.service';

@NgModule({
  providers: [
    File,
    ModulesService
  ]
})
export class RobotsModule {}
