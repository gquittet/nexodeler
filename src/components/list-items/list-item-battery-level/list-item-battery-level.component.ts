import { Component } from '@angular/core';
import { ALBatteryService } from '../../../app/services/naoqi/albattery.service';


@Component({
  selector: 'list-item-battery-level',
  templateUrl: 'list-item-battery-level.component.html'
})
export class ListItemBatteryLevelComponent {

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
