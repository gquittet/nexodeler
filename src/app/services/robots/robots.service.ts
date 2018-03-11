import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File } from '@ionic-native/file';

import 'rxjs/add/operator/map';
import { Robot } from '../../objects/Robot';

@Injectable()
export class RobotsService {

  private robotsSubject: BehaviorSubject<Robot[]> = new BehaviorSubject<Robot[]>([]);
  robots = this.robotsSubject.asObservable();
  fileName: string = 'robots.json';

  constructor(private file: File) { }

  update(robots) {
    this.robotsSubject.next(robots);
    this.file.checkFile(this.file.dataDirectory, this.fileName).then(res => {
      this.file.writeExistingFile(this.file.dataDirectory, this.fileName, JSON.stringify(robots));
    }, err => {
      this.file.writeFile(this.file.dataDirectory, this.fileName, JSON.stringify(robots));
    });
  }

  filter(value: string): Observable<Robot[]> {
    return this.robots.map(robots => robots.filter(robot => (robot.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (robot.ip.toLowerCase().indexOf(value.toLowerCase()) > -1)));
  }
}
