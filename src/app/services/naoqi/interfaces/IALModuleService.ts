import { IP } from "../../../objects/IP";

export interface IALModuleService {

  /**
   * Set the IP address of the robot and connect to it.
   * @param ip The IP address of the robot.
   */
  setIP(ip: IP): void;
}