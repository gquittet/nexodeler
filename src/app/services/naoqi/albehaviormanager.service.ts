import { Injectable } from '@angular/core';
import { ALModuleService } from './almodule.service';
import { QiService } from './qi.service';


/**
 * The service implementation of the ALBehaviorManager NAOqi class.
 * @author Guillaume Quittet
 */
@Injectable()
export class ALBehaviorManager extends ALModuleService {

    /**
     * Return the list of the installed behaviors.
     * @returns {Promise<any>} The list of the installed behaviors.
     */
    getInstalledBehaviors(): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.getInstalledBehaviors().then(result => resolve(result), error => reject(error))));
    }

    /**
     * Start a behavior and return when it's started.
     * @param name The name of the behavior.
     * @returns {Promise<any>} The result of this action.
     */
    runBehavior(name: string): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.runBehavior(name).then(result => resolve(result), error => reject(error))));
    }

    /**
     * Start a behavior and return when it's ended.
     * @param name The name of the behavior.
     * @returns {Promise<any>} The result of this action.
     */
    startBehavior(name: string): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.startBehavior(name).then(result => resolve(result), error => reject(error))));
    }

    /**
     * Stop all the running behaviors.
     * @returns {Promise<any>} The result of this action.
     */
    stopAllBehaviors(): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.stopAllBehaviors().then(result => resolve(result), error => reject(error))));
    }

    /**
     * Stop a behaviors with its name.
     * @param name The name of this behaviors.
     * @returns {Promise<any>} The result of this action.
     */
    stopBehavior(name: string): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.stopBehavior(name).then(result => resolve(result), error => reject(error))));
    }
}
