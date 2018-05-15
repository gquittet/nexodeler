import { Component } from '@angular/core';
import { ALSystemService } from '../../../app/services/naoqi/alsystem.service';


@Component({
  selector: 'list-item-naoqi-version',
  templateUrl: 'list-item-naoqi-version.component.html'
})
export class ListItemNaoqiVersionComponent {

  version: Object;

  constructor(private _alSystemService: ALSystemService) { }

  ngOnInit(): void {
    this.getVersion();
  }

  private getVersion(): void {
    this._alSystemService.getSystemVersion().then(version => this.version = version).catch(error => console.error(error));
  }
}
