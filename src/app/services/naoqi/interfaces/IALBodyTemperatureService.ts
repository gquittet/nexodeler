export interface IALBodyTemperatureService {

  /**
   * Return true if the temperature notifications are enabled.
   * @return {Promise<any>} The notifications status.
   */
  areNotificationsEnabled(): Promise<any>;

  /**
   * Get the temperature diagnosis.
   * @return {Promise<any>} The temperature diagnosis.
   */
  getTemperatureDiagnosis(): Promise<any>;

  /**
   * Enable the notifications about the temperature.
   * @param enable A boolean that enable or not the notifications of the temperature.
   * @return {Promise<any>} A promise with the result of this action.
   */
  setNotificationsEnabled(enable: boolean): Promise<any>;
}