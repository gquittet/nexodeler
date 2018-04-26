import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';

@Component({
  selector: 'sidenav-main',
  templateUrl: 'sidenav-main.html'
})
export class SidenavMainComponent {

  rootPage: string = 'HomePage';

  @ViewChild(Nav) nav: Nav;

  constructor(private menuCtrl: MenuController) { }

  openPage(page: string): void {
    this.nav.setRoot('HomePage');
    if (page !== 'HomePage')
      this.nav.push(page);
    this.menuCtrl.close();
  }

}
