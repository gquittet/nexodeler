import { Component } from '@angular/core';
import { ALAudioDeviceService } from '../../../app/services/naoqi/alaudiodevice.service';

@Component({
  selector: 'list-item-volume-control',
  templateUrl: 'list-item-volume-control.component.html'
})
export class ListItemVolumeControlComponent {

  private _volumeInterval;
  private _enableInterval;

  volume: number;
  enable: boolean;

  constructor(private _alAudioDeviceService: ALAudioDeviceService) { }

  ngOnInit(): void {
    this.getVolume();
    this.getMuteStatus();
    this._volumeInterval = setInterval(() => this.getVolume(), 1000);
    this._enableInterval = setInterval(() => this.getMuteStatus(), 2000);
  }

  private getVolume(): void {
    this._alAudioDeviceService.getOutputVolume().then(volume => this.volume = volume).catch(error => console.error(error));
  }

  private getMuteStatus(): void {
    this._alAudioDeviceService.isAudioOutMuted().then(mute => this.enable = !mute).catch(error => console.error(error));
  }

  update(): void {
    this._alAudioDeviceService.setOutputVolume(this.volume).catch(error => console.error(error));
  }

  setMute(): void {
    this._alAudioDeviceService.muteAudioOut(!this.enable).catch(error => console.error(error));
  }

  ngOnDestroy(): void {
    clearInterval(this._volumeInterval);
    clearInterval(this._enableInterval);
  }
}
