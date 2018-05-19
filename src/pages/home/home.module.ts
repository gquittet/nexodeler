import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule
  ],
  exports: [
    HomePage
  ],
  providers: [
    Network
  ]
})
export class HomeModule { }
