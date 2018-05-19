import { Component } from '@angular/core';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';


@Component({
  selector: 'list-item-motors-mode',
  templateUrl: 'list-item-motors-mode.component.html'
})
export class ListItemMotorsModeComponent {

  private _stateInterval;
  enable: boolean;

  constructor(private _alMotionService: ALMotionService) { }

  ngOnInit(): void {
    this.getState();
    this._stateInterval = setInterval(() => this.getState(), 2000);
  }

  private getState(): void {
    this._alMotionService.robotIsWakeUp().then(wakeUp => this.enable = wakeUp).catch(error => console.error(error));
  }

  update(): void {
    this.enable ? this._alMotionService.wakeUp() : this._alMotionService.rest();
  }

  ngOnDestroy(): void {
    clearInterval(this._stateInterval);
  }
}
