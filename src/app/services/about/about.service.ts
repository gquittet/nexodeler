import { Injectable } from "@angular/core";

/**
 * The service that store the informations about this application.
 * @author Guillaume Quittet.
 */
@Injectable()
export class AboutService {

  private readonly _CREATOR: string = "Guillaume Quittet";
  private readonly _NAME: string = "Nexodeler";
  private readonly _VERSION: string = "0.1.6";

  /**
   * Return the creator's name of this application.
   * @returns {Promise<string>} The creator's name of this application.
   */
  get creator(): Promise<string> {
    return new Promise((resolve, reject) => resolve(this._CREATOR));
  }

  /**
   * Return the name of this application.
   * @returns {Promise<string>} The name of this application.
   */
  get name(): Promise<string> {
    return new Promise((resolve, reject) => resolve(this._NAME));
  }

  /**
   * Return the current version of this application.
   * @return {Promise<string>} The current version of this application.
   */
  get version(): Promise<string> {
    return new Promise((resolve, reject) => resolve(this._VERSION));
  }
}