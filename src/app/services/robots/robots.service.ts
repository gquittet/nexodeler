import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File } from '@ionic-native/file';

import 'rxjs/add/operator/map';
import { Robot } from '../../objects/Robot';
import { IRobotsService } from './interfaces/IRobotsService';

@Injectable()
export class RobotsService implements IRobotsService {

  FILE_NAME: string = "robots.json";
  private robotsSubject: BehaviorSubject<Robot[]> = new BehaviorSubject<Robot[]>([]);
  robots = this.robotsSubject.asObservable();

  constructor(private file: File) { }

  update(robots) {
    this.robotsSubject.next(robots);
    this.file.checkFile(this.file.dataDirectory, this.FILE_NAME).then(res => {
      this.file.writeExistingFile(this.file.dataDirectory, this.FILE_NAME, JSON.stringify(robots));
    }, err => {
      this.file.writeFile(this.file.dataDirectory, this.FILE_NAME, JSON.stringify(robots));
    });
  }

  filter(value: string): Observable<Robot[]> {
    return this.robots.map(robots => robots.filter(robot => (robot.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (robot.ip.toLowerCase().indexOf(value.toLowerCase()) > -1)));
  }
}