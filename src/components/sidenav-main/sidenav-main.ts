import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';


@Component({
  selector: 'sidenav-main',
  templateUrl: 'sidenav-main.html'
})
export class SidenavMainComponent {

  rootPage: string = 'HomePage';

  pages: Array<{ title: string, icon: string, component: string }>

  @ViewChild(Nav) nav: Nav;

  constructor(private menuCtrl: MenuController) {
    this.pages = [
      { title: 'Home', icon: 'home', component: 'HomePage' },
      { title: 'Robots', icon: 'outlet', component: 'ListRobotsPage' },
      { title: 'Modules', icon: 'archive', component: 'ListRobotsPage' },
      { title: 'Settings', icon: 'settings', component: 'ListRobotsPage' }
    ];
  }

  openPage(page) {
    if (page.component !== 'HomePage')
      this.nav.push(page.component);
    else
      this.nav.setRoot(page.component);
    this.menuCtrl.close();
  }

}
