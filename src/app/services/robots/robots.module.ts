import { NgModule } from '@angular/core';

import { File } from '@ionic-native/file'
import { RobotsService } from './robots.service';

@NgModule({
  providers: [
    File,
    RobotsService
  ]
})
export class RobotsModule {}
