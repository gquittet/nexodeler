import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ListItemAboutApplicationModule } from '../../components/list-items/list-item-about-application/list-item-about-application.module';
import { ListItemLanguageChooserModule } from '../../components/list-items/list-item-language-chooser/list-item-language-chooser.module';
import { ListItemThemeSelectorModule } from '../../components/list-items/list-item-theme-selector/list-item-theme-selector.module';
import { AppSettingsPage } from './app-settings';

@NgModule({
  declarations: [
    AppSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(AppSettingsPage),
    ListItemAboutApplicationModule,
    ListItemLanguageChooserModule,
    ListItemThemeSelectorModule,
    TranslateModule
  ],
  exports: [
    AppSettingsPage
  ]
})
export class AppSettingsPageModule { }
