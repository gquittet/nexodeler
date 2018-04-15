import { Component } from '@angular/core';
import { ALBatteryService } from '../../../app/services/naoqi/albattery.service';
import { NavController, ViewController } from 'ionic-angular';


@Component({
  selector: 'battery-list-item',
  templateUrl: 'battery-list-item.html'
})
export class BatteryListItemComponent {

  private batteryInterval;

  private batteryLevel: number;

  constructor(private alBatteryService: ALBatteryService) { }

  ngOnInit(): void {
    this.getBatteryLevel();
    this.batteryInterval = setInterval(() => this.getBatteryLevel(), 1500);
  }

  private getBatteryLevel(): void {
    this.alBatteryService.getLevel().then(level => this.batteryLevel = level).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this.batteryInterval);
  }
}
