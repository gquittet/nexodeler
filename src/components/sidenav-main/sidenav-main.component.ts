import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';
import { Color } from '../../app/objects/Color';
import { Theme } from '../../app/objects/Theme';
import { SettingsService } from '../../app/services/settings/settings.service';

@Component({
  selector: 'sidenav-main',
  templateUrl: 'sidenav-main.component.html'
})
export class SidenavMainComponent {

  rootPage: string = 'HomePage';

  private _takeWhile: boolean = true;

  @ViewChild(Nav) nav: Nav;

  constructor(private _menuCtrl: MenuController, private _settingsService: SettingsService) { }

  ngOnInit(): void {
    const naoPhoto: HTMLElement = document.getElementById('menuTopPanel');
    this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => {
      naoPhoto.style.backgroundColor = Color.shade(theme.primaryColor, 13);
    });
  }

  openPage(page: string): void {
    this.nav.push(page);
    this._menuCtrl.close();
  }

  ngOnDestroy(): void {
    this._takeWhile = false;
  }

}
