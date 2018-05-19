import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';

@Component({
  selector: 'sidenav-main',
  templateUrl: 'sidenav-main.component.html'
})
export class SidenavMainComponent {

  rootPage: string = 'HomePage';

  @ViewChild(Nav) nav: Nav;

  constructor(private _menuCtrl: MenuController) { }

  openPage(page: string): void {
    this.nav.push(page);
    this._menuCtrl.close();
  }

}
