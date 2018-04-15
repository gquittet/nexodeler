/**
 * The interface of the ALBodyTemperature service.
 * @author Guillaume Quittet
 * @interface
 */
export interface IALBodyTemperatureService {

  /**
   * Return true if the temperature notifications are enabled.
   * @returns {Promise<any>} The notifications status.
   */
  areNotificationsEnabled(): Promise<any>;

  /**
   * Get the temperature diagnosis.
   * @returns {Promise<any>} The temperature diagnosis.
   */
  getTemperatureDiagnosis(): Promise<any>;

  /**
   * Enable the notifications about the temperature.
   * @param enable A boolean that enable or not the notifications of the temperature.
   * @returns {Promise<any>} A promise with the result of this action.
   */
  setNotificationsEnabled(enable: boolean): Promise<any>;
}