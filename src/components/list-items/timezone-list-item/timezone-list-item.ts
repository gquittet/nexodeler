import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';


@Component({
  selector: 'timezone-list-item',
  templateUrl: 'timezone-list-item.html'
})
export class TimezoneListItemComponent {

  private timezoneInterval;

  private timezone: string;

  constructor(private alSystem: ALSystemService) { }

  ngOnInit(): void {
    this.getTimezone();
    this.timezoneInterval = setInterval(() => this.getTimezone(), 5000);
  }

  getTimezone(): void {
    this.alSystem.getTimezone().then(timezone => this.timezone = timezone).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this.timezoneInterval);
  }
}
