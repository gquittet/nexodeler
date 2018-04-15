/**
 * The interface of the ALBattery service.
 * @author Guillaume Quittet
 * @interface
 */
export interface IALBatteryService {

  /**
   * Return the battery charge in percent.
   * @returns {Promise<any>} The battery charge in percent.
   */
  getLevel(): Promise<any>;

  /**
   * Enable or disable power monitoring.
   * @param enable Choose True to enable the power monitoring and its notifications.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setPowerMonitoring(enable: boolean): Promise<any>;
}