import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ALMotionService } from '../../../app/services/naoqi/almotion.service';


@Component({
  selector: 'list-item-motors-mode',
  templateUrl: 'list-item-motors-mode.component.html'
})
export class ListItemMotorsModeComponent {

  private stateInterval;
  enable: boolean;

  constructor(translate: TranslateService, private alMotionService: ALMotionService) { }

  ngOnInit(): void {
    this.getState();
    this.stateInterval = setInterval(() => this.getState(), 2000);
  }

  private getState(): void {
    this.alMotionService.robotIsWakeUp().then(wakeUp => this.enable = wakeUp).catch(error => console.error(error));
  }

  update(): void {
    this.enable ? this.alMotionService.wakeUp() : this.alMotionService.rest();
  }

  ngOnDestroy(): void {
    clearInterval(this.stateInterval);
  }
}
