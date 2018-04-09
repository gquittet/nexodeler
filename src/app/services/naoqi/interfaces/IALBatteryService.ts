export interface IALBatteryService {

  /**
   * Return the battery charge in percent.
   * @return {Promise<any>} The battery charge in percent.
   */
  getLevel(): Promise<any>;

  /**
   * Enable or disable power monitoring.
   * @param enable Choose True to enable the power monitoring and its notifications.
   * @return {Promise<any>} A promise with the result of this action.
   */
  setPowerMonitoring(enable: boolean): Promise<any>;
}