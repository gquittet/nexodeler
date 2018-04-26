import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsRobotPage } from './settings-robot';

import { ALAutonomousLifeListItemModule } from '../../components/list-items/al-autonomous-life-list-item/al-autonomous-life-list-item.module';
import { ALMotionListItemModule } from '../../components/list-items/al-motion-list-item/al-motion-list-item.module';
import { BatteryListItemModule } from '../../components/list-items/battery-list-item/battery-list-item.module';
import { LanguagesAvailableListItemModule } from '../../components/list-items/languages-available-list-item/languages-available-list-item.module';
import { NaoqiVersionListItemModule } from '../../components/list-items/naoqi-version-list-item/naoqi-version-list-item.module';
import { RebootButtonListItemModule } from '../../components/list-items/reboot-button-list-item/reboot-button-list-item.module';
import { ShutdownButtonListItemModule } from '../../components/list-items/shutdown-button-list-item/shutdown-button-list-item.module';
import { TemperatureListItemModule } from '../../components/list-items/temperature-list-item/temperature-list-item.module';
import { VolumeControlListItemModule } from '../../components/list-items/volume-control-list-item/volume-control-list-item.module';

import { TimezoneListItemModule } from '../../components/list-items/timezone-list-item/timezone-list-item.module';
import { TranslateModule } from '@ngx-translate/core';
import { Network } from '@ionic-native/network';

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
    RebootButtonListItemModule,
    ShutdownButtonListItemModule,
    TemperatureListItemModule,
    TranslateModule,
    TimezoneListItemModule,
    VolumeControlListItemModule
  ],
  exports: [
    SettingsRobotPage
  ],
  providers: [
    Network
  ]
})
export class SettingsRobotModule {}
