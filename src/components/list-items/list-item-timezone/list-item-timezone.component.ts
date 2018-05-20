import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';


@Component({
  selector: 'list-item-timezone',
  templateUrl: 'list-item-timezone.component.html'
})
export class ListItemTimezoneComponent {

  private _timezoneInterval;

  private timezone: string;

  constructor(private _alSystem: ALSystemService) { }

  ngOnInit(): void {
    this.getTimezone();
    this._timezoneInterval = setInterval(() => this.getTimezone(), 5000);
  }

  getTimezone(): void {
    this._alSystem.getTimezone().then(timezone => this.timezone = timezone).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this._timezoneInterval);
  }
}
