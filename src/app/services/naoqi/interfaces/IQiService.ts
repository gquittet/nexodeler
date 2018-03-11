import { IP } from "../../../objects/IP";

export interface IQiService {

  /**
   * Load a module with its name.
   * @param moduleName The name of a module.
   * @return {Promise<any>} A promise that is ended when the module is loaded.
   */
  loadModule(moduleName: string): Promise<any>;

  /**
   * Call a NAOqi module and use it.
   * @param callback A function to use a NAOqi module.
   * @return {Promise<any>} The Promise
   */
  call(callback: Function): Promise<any>;

  /**
   * Disconnect the current connection of the robot.
   */
  disconnect();

  /**
   * Connect to the robot or overwrite the current connection.
   * @param ip The IP address of the robot.
   */
  connect(ip: IP);
}
