import { Component } from '@angular/core';
import { AboutService } from '../../../app/services/about/about.service';


@Component({
  selector: 'list-item-about-application',
  templateUrl: 'list-item-about-application.html'
})
export class ListItemAboutApplicationComponent {

  creator: string;
  name: string;
  version: string;

  constructor(private _aboutService: AboutService) { }

  ngOnInit(): void {
    this._aboutService.creator.then((creator: string) => this.creator = creator).catch(err => console.error(err));
    this._aboutService.name.then((name: string) => this.name = name).catch(err => console.error(err));
    this._aboutService.version.then((version: string) => this.version = version).catch(err => console.error(err));
  }
}
