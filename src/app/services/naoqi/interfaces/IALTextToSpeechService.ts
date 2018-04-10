export interface IALTextToSpeechService {

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
   * Return the current volume used by the robot between [0, 1].
   * @return {Promise<any>} A promise with the result of this action.
   */
  getVolume(): Promise<any>;

  /**
   * Set the current language used by the robot.
   * @param language The language name (example: 'English')
   * @return {Promise<any>} A promise with the result of this action.
   */
  setLanguage(language: string): Promise<any>;

  /**
   * Set the output volume of the robot.
   * @param volume The volume of the robot.
   * @return {Promise<any>} A promise with the result of this action.
   */
  setVolume(volume: number): Promise<any>
}