import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Robot } from '../../objects/Robot';
import { IRobotsService } from './interfaces/IRobotsService';


/**
 * The service to manage asynchronously the robots.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class RobotsService implements IRobotsService {

  readonly FILE_NAME: string = "robots.json";
  private _robotsSubject: BehaviorSubject<Robot[]> = new BehaviorSubject<Robot[]>([]);
  private _robots: Observable<Robot[]> = this._robotsSubject.asObservable();

  constructor(private _file: File) { }

  next(robots: Robot[]): void {
    this._robotsSubject.next(robots);
    this._file.checkFile(this._file.dataDirectory, this.FILE_NAME).then(res => {
      this._file.writeExistingFile(this._file.dataDirectory, this.FILE_NAME, JSON.stringify(robots));
    }, err => {
      this._file.writeFile(this._file.dataDirectory, this.FILE_NAME, JSON.stringify(robots));
    });
  }

  filter(value: string): Observable<Robot[]> {
    return this._robots.map(robots => robots.filter(robot => (robot.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (robot.ip.toLowerCase().indexOf(value.toLowerCase()) > -1)));
  }

  get robots(): Observable<Robot[]> {
    return this._robots;
  }
}
