import { Observable } from 'rxjs/Observable';

import { Robot } from '../../../objects/Robot';

/**
 * The interface that represent the service that access to the list of the robots.
 * @author Guillaume Quittet
 * @interface
 */
export interface IRobotsService {

  /**
   * The file name where the data will be saved.
   */
  readonly FILE_NAME: string;

  /**
   * Update the list of the robots.
   * @param robots The new list of the robots.
   */
  update(robots: Robot[]): void;

  /**
   * Filter the list of the robots with a value.
   * @param value The value that used to filter the list of the robots.
   */
  filter(value: string): Observable<Robot[]>;
}
