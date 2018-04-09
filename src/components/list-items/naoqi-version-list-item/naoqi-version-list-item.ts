import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';


@Component({
  selector: 'naoqi-version-list-item',
  templateUrl: 'naoqi-version-list-item.html'
})
export class NaoqiVersionListItemComponent {

  private versionInterval: number;

  private version: Object;

  constructor(private alSystemService: ALSystemService) { }

  ngOnInit(): void {
    this.getVersion();
    this.versionInterval = setInterval(() => this.getVersion(), 10000);
  }

  private getVersion(): void {
    this.alSystemService.getSystemVersion().then(version => this.version = version).catch(error => console.error("[ERROR][NAOQI][Call][ALSystemService] getSystemVersion: " + error));
  }

  ngOnDestroy(): void {
    clearInterval(this.versionInterval);
  }
}
