import { Component } from '@angular/core';
import { ALBodyTemperatureService } from '../../../app/services/naoqi/albodytemperature.service';


@Component({
  selector: 'temperature-list-item',
  templateUrl: 'temperature-list-item.html'
})
export class TemperatureListItemComponent {

  private temperatureInterval: number;

  temperature: string;

  constructor(private alBodyTemperature: ALBodyTemperatureService) { }

  ngOnInit(): void {
    this.getTemperature();
    this.temperatureInterval = setInterval(() => this.getTemperature(), 2000);
  }

  private getTemperature(): void {
    this.alBodyTemperature.getTemperatureDiagnosis().then(temperature => {
      if (temperature) {
        switch (temperature[0]) {
          case 0:
            this.temperature = "Negligible";
            break;
          case 1:
            this.temperature = "Serious";
            break;
          case 2:
            this.temperature = "Critical";
            break;
        }
      } else {
        this.temperature = "Perfect";
      }
    }).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this.temperatureInterval);
  }
}
