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
    if (page !== 'HomePage')
      this.nav.push(page);
    else
      this.nav.setRoot(page);
    this.menuCtrl.close();
  }

}
