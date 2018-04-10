import { Injectable } from '@angular/core';

import { IP } from '../../objects/IP';

declare var QiSession: any;

/**
 * A class that use the NAOqi JS library to connect and call the module.
 * @author Guillaume Quittet
 */
@Injectable()
export class QiService {

  /**
   * The session with the robot.
   */
  private static session;

  /**
   * The module that are already loaded.
   */
  private static modulesLoaded = {};

  /**
   * Return a table with the parameters of a function.
   * Source: https://stackoverflow.com/a/9924463
   * @param func A function
   * @return {string[]} A table with the parameters of a function.
   */
  private static getParamsName(func: Function): string[] {
    const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let params = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (params === null)
      params = [];
    return params;
  }

  /**
   * Load a module with its name.
   * @param moduleName The name of a module.
   * @return {Promise<any>} A promise that is ended when the module is loaded.
   */
  private static loadModule(moduleName: string): Promise<any> {
    if (!(moduleName in this.modulesLoaded)) {
      this.modulesLoaded[moduleName] = this.session.service(moduleName);
    }
    return this.modulesLoaded[moduleName];
  }

  /**
   * Call a NAOqi module and use it.
   * @param callback A function to use a NAOqi module.
   * @return {Promise<any>} The Promise
   */
  static call(callback: Function): Promise<any> {
    const modulesToBeLoaded = this.getParamsName(callback);
    let pendingModules = modulesToBeLoaded.length;
    const modulesLoaded = new Array(modulesToBeLoaded.length);
    return new Promise((resolve, reject) => {
      for (let i = 0; i < modulesToBeLoaded.length; i++) {
        this.loadModule(modulesToBeLoaded[i]).then(module => {
          modulesLoaded[i] = module;
          pendingModules--;
          console.log("[INFO][NAOQI][Call] " + modulesToBeLoaded[i]);
          if (pendingModules === 0) {
            resolve(callback.apply(null, modulesLoaded));
          }
        }, () => {
          const reason = "[ERROR][NAOQI][Call][" + modulesToBeLoaded[i] + "] Failed to get the NAOqi module";
          reject(reason);
        });
      }
    });
  }

  /**
   * Disconnect the current connection of the robot.
   */
  static disconnect(): void {
    if (this.session) {
      this.session.socket().removeAllListeners();
      this.session.socket().disconnect();
      this.session = null;
      console.log("[INFO][NAOQI][Session] Disconnected");
    } else {
      console.error("[ERROR][NAOQI][Session] Cannot disconnect because there's no session active.");
    }
  }

  /**
   * Connect to the robot or overwrite the current connection.
   * @param ip The IP address of the robot.
   */
  static connect(ip: IP): void {
    if (!this.session) {
      this.session = new QiSession(ip.toString() + ':80');
      this.modulesLoaded = {};
      this.session.socket().on('connect', () => { });
      this.session.socket().on('disconnect', () => { });
      console.log("[INFO][NAOQI][Session] Connected");
    } else {
      this.disconnect();
      this.connect(ip);
    }
  }
}
