import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Color } from '../../app/objects/Color';
import { Theme } from '../../app/objects/Theme';
import { SettingsService } from '../../app/services/settings/settings.service';

@Component({
  selector: 'sidenav-main',
  templateUrl: 'sidenav-main.component.html'
})
export class SidenavMainComponent {

  rootPage: string = 'HomePage';
  private _subscription: Subscription;

  @ViewChild(Nav) nav: Nav;

  constructor(private _menuCtrl: MenuController, private _settingsService: SettingsService) {
    this._subscription = new Subscription();
  }

  ngOnInit(): void {
    const naoPhoto: HTMLElement = document.getElementById('menuTopPanel');
    this._subscription.add(this._settingsService.theme.subscribe((theme: Theme) => {
      naoPhoto.style.backgroundColor = Color.shade(theme.primaryColor, 13);
    }));
  }

  openPage(page: string): void {
    this.nav.push(page);
    this._menuCtrl.close();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
