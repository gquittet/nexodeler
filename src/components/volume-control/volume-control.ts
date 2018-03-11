import { Component } from '@angular/core';

@Component({
  selector: 'volume-control',
  templateUrl: 'volume-control.html'
})
export class VolumeControlComponent {

  private audio;
  private mute;

  constructor() { }

  ngOnInit() {
    this.audio = 50;
    this.mute = false;
  }
}
