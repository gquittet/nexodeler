/**
 * The interface of the ALBehaviorManager service.
 * @author Guillaume Quittet
 * @interface
 */
export interface IALBehaviorManager {

    /**
     * Return the list of the installed behaviors.
     * @returns {Promise<any>} The list of the installed behaviors.
     */
    getInstalledBehaviors(): Promise<any>;

    /**
     * Start a behavior and return when it's started.
     * @param name The name of the behavior.
     * @returns {Promise<any>} The result of this action.
     */
    runBehavior(name: string): Promise<any>;

    /**
     * Start a behavior and return when it's ended.
     * @param name The name of the behavior.
     * @returns {Promise<any>} The result of this action.
     */
    startBehavior(name: string): Promise<any>;

    /**
     * Stop all the running behaviors.
     * @returns {Promise<any>} The result of this action.
     */
    stopAllBehaviors(): Promise<any>;

    /**
     * Stop a behaviors with its name.
     * @param name The name of this behaviors.
     * @returns {Promise<any>} The result of this action.
     */
    stopBehavior(name: string): Promise<any>;
  }