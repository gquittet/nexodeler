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
   * The name of the file where the data are stored.
   * @readonly
   */
  private readonly _FILE_NAME: string = "robots.json";

  /**
   * The list of the robots.
   * @readonly
   */
  private readonly _robotsSubject: BehaviorSubject<Robot[]> = new BehaviorSubject<Robot[]>([]);

  /**
   * The observer of the robots.
   * @readonly
   */
  private readonly _robots: Observable<Robot[]> = this._robotsSubject.asObservable();

  constructor(private _file: File) {
    this._file.readAsText(this._file.dataDirectory, this._FILE_NAME).then((data: string) => {
      this.next(JSON.parse(data));
    }).catch(err => console.error(JSON.stringify("[ERROR][RobotsService] Unable to read the file " + JSON.stringify(err))));
  }

  /**
   * Update the list of the robots.
   * @param robots The new list of the robots.
   */
  next(robots: Robot[]): void {
    this._robotsSubject.next(robots);
    this._file.writeFile(this._file.dataDirectory, this._FILE_NAME, JSON.stringify(robots), { replace: true });

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

  /**
   * Return the name of the file where the data are stored.
   * @returns {string} The name of the file where the data are stored.
   */
  get fileName(): string {
    return this._FILE_NAME;
  }
}
