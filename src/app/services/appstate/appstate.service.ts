import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";

/**
 * The service that store the state of the application.
 * @author Guillaume Quittet.
 */
@Injectable()
export class AppStateService {

  /**
   * The observer of the opened state of a modal.
   * @readonly
   */
  private readonly _modalOpenedStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Change the opened state of a modal.
   * @param opened The new opened state of a modal.
   */
  changeModalOpenedState(opened: boolean): void {
    this._modalOpenedStateSubject.next(opened);
  }

  /**
   * Return the opened state of a modal page.
   * @returns {Observable<boolean>} The opened state of a modal page.
   */
  get modalOpenedState(): Observable<boolean> {
    return this._modalOpenedStateSubject.asObservable();
  }
}