import { IP } from '../../objects/IP';
import { QiService } from './qi.service';
import { IALService } from './interfaces/IALService';

/**
 * Create a connection with the robot and use modules from QiSession.
 * @author Guillaume Quittet
 */
export class ALService implements IALService {

  /**
   * The IP address of the robot.
   */
  private ip: IP;
  
  /**
   * The QiService class for connecting, disconnecting and calling modules from NAOqi.
   */
  protected qi: QiService;

  constructor() {
    this.qi = new QiService();
  }

  setIP(ip: IP): void {
    this.ip = ip;
    this.qi.connect(this.ip);
  }
}
