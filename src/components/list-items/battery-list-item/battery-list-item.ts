import { Component } from '@angular/core';
import { ALBatteryService } from '../../../app/services/naoqi/albattery.service';
import { IP } from '../../../app/objects/IP';
import { NavController, ViewController } from 'ionic-angular';


@Component({
  selector: 'battery-list-item',
  templateUrl: 'battery-list-item.html'
})
export class BatteryListItemComponent {

  private batteryInterval: number;

  private batteryLevel: number;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private alBatteryService: ALBatteryService) { }

  ngOnInit(): void {
    this.getBatteryLevel();
    this.batteryInterval = setInterval(() => this.getBatteryLevel(), 1000);
  }

  // TODO Corriger le bug d'erreur dans la promesse.
  private getBatteryLevel(): void {
    this.alBatteryService.getLevel().then(level => this.batteryLevel = level).catch(error => console.error("[ERROR][NAOQI][Call][ALBatteryService] getLevel: " + error));
  }

  ngOnDestroy(): void {
    clearInterval(this.batteryInterval);
  }
}
