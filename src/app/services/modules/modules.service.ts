import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { File } from '@ionic-native/file';

import 'rxjs/add/operator/map';
import { Module } from '../../objects/Module'
import { IModulesService } from './interfaces/IModulesService';
import { TranslateService } from '@ngx-translate/core';

/**
 * The service to manage asynchronously the modules.
 * @author Guillaume Quittet
 * @implements
 */
@Injectable()
export class ModulesService implements IModulesService {

  readonly FILE_NAME: string = "modules.json";
  private modulesSubject: BehaviorSubject<Module[]> = new BehaviorSubject<Module[]>([
    <Module>{ id: 0, name: 'THEMATICALASSOCIATION', category: 'LEARNING', page: 'ModuleThematicalAssociationPage', fav: false, creator: 'Éspéranderie', maintainer: 'Guillaume Quittet', version: '0.0.1', created: new Date('2018-04-26T11:45:00'), updated: new Date('2018-04-26T11:45:00'), last_access: null },
    <Module>{ id: 1, name: 'SPEAK', category: 'SPEAK', page: 'HomePage', fav: false, creator: 'Guillaume Quittet', maintainer: 'Guillaume Quittet', version: '0.0.4', created: new Date('2018-04-17T11:59:00'), updated: new Date('2018-04-17T11:59:00'), last_access: null },
    <Module>{ id: 2, name: 'MOVE', category: 'MOVE', page: 'HomePage', fav: false, creator: 'Guillaume Quittet', maintainer: 'Guillaume Quittet', version: '0.0.1', created: new Date('2018-04-17T11:59:00'), updated: new Date('2018-04-17T11:59:00'), last_access: null },
    <Module>{ id: 3, name: 'MOVE', category: 'MOVE', page: 'HomePage', fav: false, creator: 'Guillaume Quittet', maintainer: 'Guillaume Quittet', version: '0.0.3', created: new Date('2018-04-17T11:59:00'), updated: new Date('2018-04-17T11:59:00'), last_access: null }
  ]);
  modules: Observable<Module[]> = this.modulesSubject.asObservable();

  constructor(private file: File, private translate: TranslateService) { }

  update(modules: Module[]): void {
    // Fixing the bad sorting. Sort with the id.
    modules.sort((a, b) => a.id - b.id);
    this.modulesSubject.value.forEach((module: Module, index: number) => {
      let newModule: Module = modules[index];
      if (!newModule)
        modules.push(module);
      else {
        if (newModule.name !== module.name || newModule.category !== module.category || newModule.page !== module.page || newModule.maintainer !== module.maintainer || newModule.version !== module.version || newModule.updated !== module.updated) {
          newModule.name = module.name;
          newModule.category = module.category;
          newModule.page = module.page;
          newModule.maintainer = module.maintainer;
          newModule.version = module.version;
          newModule.updated = module.updated;
        }
      }
    });
    this.modulesSubject.next(modules);
    this.file.checkFile(this.file.dataDirectory, this.FILE_NAME).then(res => {
      this.file.writeExistingFile(this.file.dataDirectory, this.FILE_NAME, JSON.stringify(modules));
    }, err => {
      this.file.writeFile(this.file.dataDirectory, this.FILE_NAME, JSON.stringify(modules));
    });
  }

  next(modules: Module[]): void {
    // Fixing the bad sorting. Sort with the id.
    modules.sort((a, b) => a.id - b.id);
    this.modulesSubject.next(modules);
    this.file.checkFile(this.file.dataDirectory, this.FILE_NAME).then(res => {
      this.file.writeExistingFile(this.file.dataDirectory, this.FILE_NAME, JSON.stringify(modules));
    }, err => {
      this.file.writeFile(this.file.dataDirectory, this.FILE_NAME, JSON.stringify(modules));
    });
  }

  private equals(text0: string, text1: string): boolean {
    return text0.toLowerCase().indexOf(text1.toLowerCase()) > -1;
  }

  filter(value: string): Observable<Module[]> {
    let name: string;
    let category: string;
    return this.modules.map((modules: Module[]) => modules.filter((module: Module) => {
      this.translate.get('MODULES.NAMES.' + module.name).subscribe((res: string) => name = res);
      this.translate.get('MODULES.CATEGORIES.' + module.category).subscribe((res: string) => category = res);
      return this.equals(name, value) || this.equals(category, value) || this.equals(module.creator, value) || this.equals(module.maintainer, value) || this.equals(module.version, value);
    }));
  }
}
