import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsRobotPage } from './settings-robot';

import { ALAutonomousLifeListItemModule } from '../../components/list-items/al-autonomous-life-list-item/al-autonomous-life-list-item.module';
import { ALMotionListItemModule } from '../../components/list-items/al-motion-list-item/al-motion-list-item.module';
import { BatteryListItemModule } from '../../components/list-items/battery-list-item/battery-list-item.module';
import { LanguagesAvailableListItemModule } from '../../components/list-items/languages-available-list-item/languages-available-list-item.module';
import { NaoqiVersionListItemModule } from '../../components/list-items/naoqi-version-list-item/naoqi-version-list-item.module';
import { RebootButtonModule } from '../../components/list-items/reboot-button/reboot-button.module';
import { ShutdownButtonModule } from '../../components/list-items/shutdown-button/shutdown-button.module';
import { TemperatureListItemModule } from '../../components/list-items/temperature-list-item/temperature-list-item.module';
import { VolumeControlModule } from '../../components/list-items/volume-control/volume-control.module';

import { ALModuleService } from '../../app/services/naoqi/almodule.service';
import { TimezoneModule } from '../../components/list-items/timezone/timezone.module';

@NgModule({
  declarations: [
    SettingsRobotPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsRobotPage),
    ALAutonomousLifeListItemModule,
    ALMotionListItemModule,
    BatteryListItemModule,
    LanguagesAvailableListItemModule,
    NaoqiVersionListItemModule,
    RebootButtonModule,
    ShutdownButtonModule,
    TemperatureListItemModule,
    TimezoneModule,
    VolumeControlModule
  ],
  exports: [
    SettingsRobotPage
  ],
  providers: [
    ALModuleService
  ]
})
export class SettingsRobotModule {}
