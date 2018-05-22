import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Module } from '../../objects/Module';


/**
 * The service to manage asynchronously the modules.
 * @author Guillaume Quittet
 */
@Injectable()
export class ModulesService {

  /**
   * The file name where the data will be saved.
   * @readonly
   */
  private readonly _FILE_NAME: string = "modules.json";

  /**
   * The list of the modules.
   * @readonly
   */
  private readonly _modulesSubject: BehaviorSubject<Module[]> = new BehaviorSubject<Module[]>([
    <Module>{ id: 0, name: 'THEMATICALASSOCIATION', category: 'LEARNING', page: 'ModuleThematicalAssociationPage', fav: false, creator: 'Éspéranderie', maintainer: 'Guillaume Quittet', version: '0.0.1', created: new Date('2018-04-26T11:45:00'), updated: new Date('2018-04-26T11:45:00'), last_access: null },
    <Module>{ id: 1, name: 'SPEAK', category: 'SPEAK', page: 'ModuleSpeakPage', fav: false, creator: 'Guillaume Quittet', maintainer: 'Guillaume Quittet', version: '0.0.1', created: new Date('2018-04-17T11:59:00'), updated: new Date('2018-04-17T11:59:00'), last_access: null },
    <Module>{ id: 2, name: 'MOVE', category: 'MOVE', page: 'ModuleMotionPage', fav: false, creator: 'Guillaume Quittet', maintainer: 'Guillaume Quittet', version: '0.0.1', created: new Date('2018-04-17T11:59:00'), updated: new Date('2018-04-17T11:59:00'), last_access: null },
  ]);

  /**
   * The observer of the modules.
   * @readonly
   */
  private readonly _modules: Observable<Module[]> = this._modulesSubject.asObservable();

  // Subscription
  private _subscription: Subscription;

  constructor(private _file: File, private _translate: TranslateService) {
    this._subscription = new Subscription();
    this._file.readAsText(this._file.dataDirectory, this._FILE_NAME).then((data: string) => {
      this.update(JSON.parse(data));
    }).catch(err => console.error(JSON.stringify("[ERROR][ModulesService] Unable to read the file " + JSON.stringify(err))));
  }

  /**
   * Read the file and update the modules inside it with the subject.
   * @param modules The old list of the modules.
   */
  private update(modules: Module[]): void {
    // Fixing the bad sorting. Sort with the id.
    modules.sort((a, b) => a.id - b.id);
    this._modulesSubject.value.forEach((module: Module, index: number) => {
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
    this._modulesSubject.next(modules);
    this._file.writeFile(this._file.dataDirectory, this._FILE_NAME, JSON.stringify(modules), { replace: true });
  }

  /**
   * Update the list of the modules.
   * @param modules The new list of the modules.
   */
  next(modules: Module[]): void {
    // Fixing the bad sorting. Sort with the id.
    modules.sort((a, b) => a.id - b.id);
    this._modulesSubject.next(modules);
    this._file.checkFile(this._file.dataDirectory, this._FILE_NAME).then(res => {
      this._file.writeExistingFile(this._file.dataDirectory, this._FILE_NAME, JSON.stringify(modules));
    }, err => {
      this._file.writeFile(this._file.dataDirectory, this._FILE_NAME, JSON.stringify(modules));
    });
  }

  /**
   * Verify the equality between 2 strings.
   * @param text0 The first string
   * @param text1 The second string
   * @returns {boolean} True if the 2 strings are equals and False otherwise.
   */
  private equals(text0: string, text1: string): boolean {
    return text0.toLowerCase().indexOf(text1.toLowerCase()) > -1;
  }

  /**
   * Filter the list of the modules with a value.
   * @param value The value that used to filter the list of the modules.
   * @returns {Observable<Module[]>} An observer with the list of the modules.
   */
  filter(value: string): Observable<Module[]> {
    let name: string;
    let category: string;
    return this._modules.map((modules: Module[]) => modules.filter((module: Module) => {
      this._subscription.add(this._translate.get('MODULES.NAMES.' + module.name).subscribe((res: string) => name = res));
      this._subscription.add(this._translate.get('MODULES.CATEGORIES.' + module.category).subscribe((res: string) => category = res));
      return this.equals(name, value) || this.equals(category, value) || this.equals(module.creator, value) || this.equals(module.maintainer, value) || this.equals(module.version, value);
    }));
  }

  /**
   * Return the list of the modules.
   * @returns {Observable<Module[]>} The list of the modules.
   */
  get modules(): Observable<Module[]> {
    return this._modules;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
