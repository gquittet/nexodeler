import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage
  ],
  providers: [
    Network
  ]
})
export class HomeModule {}
