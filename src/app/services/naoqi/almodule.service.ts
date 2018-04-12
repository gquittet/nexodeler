import { IP } from '../../objects/IP';
import { QiService } from './qi.service';
import { IALModuleService } from './interfaces/IALModuleService';

/**
 * Create a connection with the robot and use modules from QiSession.
 * @author Guillaume Quittet
 */
export class ALModuleService implements IALModuleService {

  setIP(ip: IP): void {
    QiService.connect(ip);
  }
}
