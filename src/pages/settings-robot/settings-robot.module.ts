import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ListItemALAutonomousLifeModule } from '../../components/list-items/list-item-al-autonomous-life/list-item-al-autonomous-life.module';
import { ListItemBatteryLevelModule } from '../../components/list-items/list-item-battery-level/list-item-battery-level.module';
import { ListItemLanguagesAvailableModule } from '../../components/list-items/list-item-languages-available/list-item-languages-available.module';
import { ListItemMotorsModeModule } from '../../components/list-items/list-item-motors-mode/list-item-motors-mode.module';
import { ListItemNaoqiVersionModule } from '../../components/list-items/list-item-naoqi-version/list-item-naoqi-version.module';
import { ListItemPostureSelectorModule } from '../../components/list-items/list-item-posture-selector/list-item-posture-selector.module';
import { ListItemRebootButtonModule } from '../../components/list-items/list-item-reboot-button/list-item-reboot-button.module';
import { ListItemShutdownButtonModule } from '../../components/list-items/list-item-shutdown-button/list-item-shutdown-button.module';
import { ListItemTemperatureModule } from '../../components/list-items/list-item-temperature/list-item-temperature.module';
import { ListItemTimezoneModule } from '../../components/list-items/list-item-timezone/list-item-timezone.module';
import { ListItemVolumeControlModule } from '../../components/list-items/list-item-volume-control/list-item-volume-control.module';
import { ModalTitleModule } from '../../components/modal-title/modal-title.module';
import { SettingsRobotPage } from './settings-robot';




@NgModule({
  declarations: [
    SettingsRobotPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsRobotPage),
    ListItemALAutonomousLifeModule,
    ListItemMotorsModeModule,
    ListItemPostureSelectorModule,
    ListItemBatteryLevelModule,
    ListItemLanguagesAvailableModule,
    ListItemNaoqiVersionModule,
    ListItemRebootButtonModule,
    ListItemShutdownButtonModule,
    ListItemTemperatureModule,
    ListItemTimezoneModule,
    ListItemVolumeControlModule,
    ModalTitleModule,
    TranslateModule
  ],
  exports: [
    SettingsRobotPage
  ],
  providers: [
    Network
  ]
})
export class SettingsRobotModule { }
