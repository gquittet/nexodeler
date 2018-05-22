import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ALBodyTemperatureService } from '../../../app/services/naoqi/albodytemperature.service';

@Component({
  selector: 'list-item-temperature',
  templateUrl: 'list-item-temperature.component.html'
})
export class ListItemTemperatureComponent {

  private _temperatureInterval;

  private _subscription: Subscription;

  temperature: string;

  private _temperatures: string[];

  constructor(translate: TranslateService, private _alBodyTemperature: ALBodyTemperatureService) {
    this._subscription = new Subscription();
    this._temperatures = [];
    this._subscription.add(translate.get('NAOQI.TEMPERATURE.PERFECT').subscribe(res => this._temperatures[0] = res));
    this._subscription.add(translate.get('NAOQI.TEMPERATURE.NEGLIGIBLE').subscribe(res => this._temperatures[1] = res));
    this._subscription.add(translate.get('NAOQI.TEMPERATURE.SERIOUS').subscribe(res => this._temperatures[2] = res));
    this._subscription.add(translate.get('NAOQI.TEMPERATURE.CRITICAL').subscribe(res => this._temperatures[3] = res));
  }

  ngOnInit(): void {
    this.getTemperature();
    this._temperatureInterval = setInterval(() => this.getTemperature(), 2000);
  }

  private getTemperature(): void {
    this._alBodyTemperature.getTemperatureDiagnosis().then(temperature => {
      if (temperature) {
        switch (temperature[0]) {
          case 0:
            this.temperature = this._temperatures[1];
            break;
          case 1:
            this.temperature = this._temperatures[2];
            break;
          case 2:
            this.temperature = this._temperatures[3];
            break;
        }
      } else {
        this.temperature = this._temperatures[0];
      }
    }).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this._temperatureInterval);
    this._subscription.unsubscribe();
  }
}
