import { Component } from '@angular/core';

@Component({
  selector: 'temperature-list-item',
  templateUrl: 'temperature-list-item.html'
})
export class TemperatureListItemComponent {

  text: string;

  constructor() {
    console.log('Hello TemperatureListItemComponent Component');
    this.text = 'Hello World';
  }

}
