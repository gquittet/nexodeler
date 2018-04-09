export interface IALAudioDeviceService {

  /**
   * Get the global output volume of the system.
   * @return {Promise<any>} The global output volume of the system.
   */
  getOutputVolume(): Promise<any>;

  /**
   * Get the mute state of the  output sound of the system.
   * @return {Promise<any>} The mute state of the output sound.
   */
  isAudioOutMuted(): Promise<any>;

  /**
   * Mute or unmute the output sound.
   * @param mute A boolean that mute or not the output sound.
   * @return {Promise<any>} A promise with the result of this action.
   */
  muteAudioOut(mute: boolean): Promise<any>;

  /**
   * Read a sound file. File format must be a wav file (48000Hz/16bits/4 channels).
   * @param fileName The absolute path of the file with its name.
   * @return {Promise<any>} A promise with the result of this action.
   */
  setFileAsInput(fileName: string): Promise<any>;

  /**
   * Set the output volume of the system.
   * @param volume The new output volume of the system.
   * @return {Promise<any>} A promise with the result of this action.
   */
  setOutputVolume(volume: number): Promise<any>;

  /**
   * Start the recording and put the content into a file
   * @param fileName The absolute path of the file with its name.
   * @return {Promise<any>} A promise with the result of this action.
   */
  startMicrophonesRecording(fileName: string): Promise<any>;

  /**
   * Stop the current record.
   * @return {Promise<any>} A promise with the result of this action.
   */
  stopMicrophonesRecording(): Promise<any>;
}