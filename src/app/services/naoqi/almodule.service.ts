import { IP } from '../../objects/IP';
import { QiService } from './qi.service';
import { IALModuleService } from './interfaces/IALModuleService';

/**
 * Create a connection with the robot and use modules from QiSession.
 * @author Guillaume Quittet
 */
export class ALModuleService implements IALModuleService {

  /**
   * The IP address of the robot.
   */
  private ip: IP;

  setIP(ip: IP): void {
    this.ip = ip;
    QiService.connect(ip);
  }
}
