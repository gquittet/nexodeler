import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsRobotPage } from './settings-robot';
import { VolumeControlModule } from '../../components/volume-control/volume-control.module';
import { BatteryListItemModule } from '../../components/battery-list-item/battery-list-item.module';
import { TemperatureListItemModule } from '../../components/temperature-list-item/temperature-list-item.module';

@NgModule({
  declarations: [
    SettingsRobotPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsRobotPage),
    BatteryListItemModule,
    TemperatureListItemModule,
    VolumeControlModule
  ],
  exports: [
    SettingsRobotPage
  ]
})
export class SettingsRobotModule {}
