import { Injectable } from '@angular/core';

import { ALModuleService } from './almodule.service';
import { IALBehaviorManager } from './interfaces/IALBehaviorManager';
import { QiService } from './qi.service';

/**
 * The service implementation of the ALBehaviorManager NAOqi class.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ALBehaviorManager extends ALModuleService implements IALBehaviorManager {

    /**
     * @override
     */
    getInstalledBehaviors(): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.getInstalledBehaviors().then(result => resolve(result), error => reject(error))));
    }

    /**
     * @override
     */
    runBehavior(name: string): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.runBehavior(name).then(result => resolve(result), error => reject(error))));
    }

    /**
     * @override
     */
    startBehavior(name: string): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.startBehavior(name).then(result => resolve(result), error => reject(error))));
    }

    /**
     * @override
     */
    stopAllBehaviors(): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.stopAllBehaviors().then(result => resolve(result), error => reject(error))));
    }

    /**
     * @override
     */
    stopBehavior(name: string): Promise<any> {
        return new Promise((resolve, reject) => QiService.call(ALBehaviorManager => ALBehaviorManager.stopBehavior(name).then(result => resolve(result), error => reject(error))));
    }
}
