import { Component } from '@angular/core';

/**
 * Generated class for the BatteryListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'battery-list-item',
  templateUrl: 'battery-list-item.html'
})
export class BatteryListItemComponent {

  text: string;

  constructor() {
    console.log('Hello BatteryListItemComponent Component');
    this.text = 'Hello World';
  }

}
