import { Component } from '@angular/core';
import { IP } from '../../../app/objects/IP';
import { ALAudioDeviceService } from '../../../app/services/naoqi/alaudiodevice.service';
import { Toggle } from 'ionic-angular';

@Component({
  selector: 'volume-control',
  templateUrl: 'volume-control.html'
})
export class VolumeControlComponent {

  private volumeInterval: number;
  private enableInterval: number;

  private volume: number;
  private enable: boolean;

  constructor(private alAudioDeviceService: ALAudioDeviceService) { }

  ngOnInit(): void {
    this.getVolume();
    this.getMuteStatus();
    this.volumeInterval = setInterval(() => this.getVolume(), 1000);
    this.enableInterval = setInterval(() => this.getMuteStatus(), 1000);
  }

  private getVolume(): void {
    this.alAudioDeviceService.getOutputVolume().then(volume => this.volume = volume).catch(error => console.error("[ERROR][NAOQI][Call][ALAudioDeviceService] getOutputVolume: " + error));
  }

  private getMuteStatus(): void {
    this.alAudioDeviceService.isAudioOutMuted().then(mute => this.enable = !mute).catch(error => console.error("[ERROR][NAOQI][Call][ALAudioDeviceService] isAudioOutMuted: " + error));
  }

  update(): void {
    this.alAudioDeviceService.setOutputVolume(this.volume).catch(error => console.error("[ERROR][NAOQI][Call][ALAudioDeviceService] setOutputVolume: " + error));
  }

  setMute(event: Toggle): void {
    this.enable = event.checked;
    this.alAudioDeviceService.muteAudioOut(!event.checked).catch(error => console.error("[ERROR][NAOQI][Call][ALAudioDeviceService] muteAudioOut: " + error));
  }

  ngOnDestroy(): void {
    clearInterval(this.volumeInterval);
    clearInterval(this.enableInterval);
  }
}
