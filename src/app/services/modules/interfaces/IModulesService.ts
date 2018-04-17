import { Observable } from 'rxjs/Observable';

import { Module } from '../../../objects/Module';

/**
 * The interface that represent the service that access to the list of the robots.
 * @author Guillaume Quittet
 * @interface
 */
export interface IModulesService {

  /**
   * The file name where the data will be saved.
   * @readonly
   */
  readonly FILE_NAME: string;

  /**
   * Update the list of the modules.
   * @param modules The new list of the modules.
   */
  update(modules: Module[]): void;

  /**
   * Filter the list of the modules with a value.
   * @param value The value that used to filter the list of the modules.
   * @returns {Observable<Module[]>} An observer with the list of the modules.
   */
  filter(value: string): Observable<Module[]>;
}
