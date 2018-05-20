import { Component } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-module-motion',
  templateUrl: 'module-motion.html'
})
export class ModuleMotionPage {

  constructor(private _events: Events) { }

  ionViewWillLeave(): void {
    this._events.publish('module:exit');
  }
}
