import { Observable } from 'rxjs/Observable';

import { Robot } from '../../../objects/Robot';

export interface IRobotsService {

  FILE_NAME: string;

  update(robots: Robot[]);

  filter(value: string): Observable<Robot[]>;
}
