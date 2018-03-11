import { Injectable } from '@angular/core';

import { IQiService } from './interfaces/IQiService';
import { IP } from '../../objects/IP';

declare var QiSession: any;

/**
 * A class that use the NAOqi JS library to connect and call the module.
 * @author Guillaume Quittet
 */
@Injectable()
export class QiService implements IQiService {

  /**
   * The session with the robot.
   */
  private session;

  /**
   * The module that are already loaded.
   */
  private modulesLoaded = {};

  /**
   * Return a table with the parameters of a function.
   * Source: https://stackoverflow.com/a/9924463
   * @param func A function
   * @return {object} A table with the parameters of a function.
   */
  private getParamsName(func: Function) {
    const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let params = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (params === null)
      params = [];
    return params;
  }

  loadModule(moduleName: string): Promise<any> {
    if (!(moduleName in this.modulesLoaded)) {
      this.modulesLoaded[moduleName] = this.session.service(moduleName);
    }
    return this.modulesLoaded[moduleName];
  }

  call(callback: Function): Promise<any> {
    const modulesToBeLoaded = this.getParamsName(callback);
    let pendingModules = modulesToBeLoaded.length;
    const modulesLoaded = new Array(modulesToBeLoaded.length);
    return new Promise((resolve, reject) => {
      for (let i = 0; i < modulesToBeLoaded.length; i++) {
        this.loadModule(modulesToBeLoaded[i]).then(module => {
          modulesLoaded[i] = module;
          pendingModules--;
          if (pendingModules === 0) {
            resolve(callback.apply(null, modulesLoaded));
          }
        }, () => {
          const reason = "Failed getting a NaoQi Module: " + modulesToBeLoaded[i];
          reject(reason);
        });
      }
    });
  }

  disconnect() {
    if (this.session) {
      this.session.socket().removeAllListeners();
      this.session.socket().disconnect();
      this.session = null;
    } else {
      throw "Cannot disconnect because there's no session active.";
    }
  }

  connect(ip: IP) {
    if (!this.session) {
      this.session = new QiSession(ip.toString() + ':80');
      this.modulesLoaded = {};
      this.session.socket().on('connect', () => { });
      this.session.socket().on('disconnect', () => { });
    } else {
      this.disconnect();
      this.connect(ip);
    }
  }
}
