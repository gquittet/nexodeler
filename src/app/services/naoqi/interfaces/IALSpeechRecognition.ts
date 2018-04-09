export interface IALSpeechRecognition {

  /**
   * Return all the languages available by the robot.
   * @return {Promise<any>} A promise with the result of this action.
   */
  getAvailableLanguages(): Promise<any>;

  /**
   * Return the current language used by the robot.
   * @return {Promise<any>} A promise with the result of this action.
   */
  getLanguage(): Promise<any>;

  /**
   * Set the current language used by the robot.
   * @param language The language name (example: 'English')
   * @return {Promise<any>} A promise with the result of this action.
   */
  setLanguage(language: string): Promise<any>;
}