import { Component } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-module-motion',
  templateUrl: 'module-motion.html'
})
export class ModuleMotionPage {

  constructor(private events: Events) { }

  ionViewWillLeave(): void {
    this.events.publish('module:exit');
  }
}
