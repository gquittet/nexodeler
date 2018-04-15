import { Component } from '@angular/core';
import { ALBodyTemperatureService } from '../../../app/services/naoqi/albodytemperature.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'temperature-list-item',
  templateUrl: 'temperature-list-item.html'
})
export class TemperatureListItemComponent {

  private temperatureInterval;

  temperature: string;

  private temperatures: string[];

  constructor(translate: TranslateService, private alBodyTemperature: ALBodyTemperatureService) {
    translate.get('NAOQI.TEMPERATURE.PERFECT').subscribe(res => this.temperatures[0] = res);
    translate.get('NAOQI.TEMPERATURE.NEGLIGIBLE').subscribe(res => this.temperatures[1] = res);
    translate.get('NAOQI.TEMPERATURE.SERIOUS').subscribe(res => this.temperatures[2] = res);
    translate.get('NAOQI.TEMPERATURE.CRITICAL').subscribe(res => this.temperatures[3] = res);
  }

  ngOnInit(): void {
    this.getTemperature();
    this.temperatureInterval = setInterval(() => this.getTemperature(), 2000);
    this.temperatures = new Array(4);
  }

  private getTemperature(): void {
    this.alBodyTemperature.getTemperatureDiagnosis().then(temperature => {
      if (temperature) {
        switch (temperature[0]) {
          case 0:
            this.temperature = this.temperatures[1];
            break;
          case 1:
            this.temperature = this.temperatures[2];
            break;
          case 2:
            this.temperature = this.temperatures[3];
            break;
        }
      } else {
        this.temperature = this.temperatures[0];
      }
    }).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this.temperatureInterval);
  }
}
