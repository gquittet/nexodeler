import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Robot } from '../../objects/Robot';


/**
 * The service to manage asynchronously the robots.
 * @author Guillaume Quittet
 */
@Injectable()
export class RobotsService {

  /**
   * The file name where the data will be saved.
   * @readonly
   */
  readonly FILE_NAME: string = "robots.json";

  /**
   * The list of the robots.
   */
  private _robotsSubject: BehaviorSubject<Robot[]> = new BehaviorSubject<Robot[]>([]);

  /**
   * The observer of the robots.
   */
  private _robots: Observable<Robot[]> = this._robotsSubject.asObservable();

  constructor(private _file: File) {
    this._file.checkFile(this._file.dataDirectory, this.FILE_NAME).then(res => {
      if (res) {
        this._file.readAsText(this._file.dataDirectory, this.FILE_NAME).then((data: string) => {
          this.next(JSON.parse(data));
        });
      }
    }, err => console.error(err));
  }

  /**
   * Update the list of the robots.
   * @param robots The new list of the robots.
   */
  next(robots: Robot[]): void {
    this._robotsSubject.next(robots);
    this._file.checkFile(this._file.dataDirectory, this.FILE_NAME).then(res => {
      this._file.writeExistingFile(this._file.dataDirectory, this.FILE_NAME, JSON.stringify(robots));
    }, err => {
      this._file.writeFile(this._file.dataDirectory, this.FILE_NAME, JSON.stringify(robots));
    });
  }

  /**
   * Filter the list of the robots with a value.
   * @param value The value that used to filter the list of the robots.
   * @returns {Observable<Robot[]>} An observer with the list of the robots.
   */
  filter(value: string): Observable<Robot[]> {
    return this._robots.map(robots => robots.filter(robot => (robot.name.toLowerCase().indexOf(value.toLowerCase()) > -1) || (robot.ip.toLowerCase().indexOf(value.toLowerCase()) > -1)));
  }

  /**
   * Return the list of the robots.
   * @returns {Observable<Robot[]>} The list of the robots.
   */
  get robots(): Observable<Robot[]> {
    return this._robots;
  }
}
