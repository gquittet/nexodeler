import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ModulesService } from '../../app/services/modules/modules.service';
import { Module } from '../../app/objects/Module';

import { File } from '@ionic-native/file'
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-list-modules',
  templateUrl: 'list-modules.html',
})
export class ListModulesPage {

  section: string = "favorites";

  searchControl: FormControl;
  searchTerm: string = '';
  searching: boolean;

  private subscription: Subscription;

  private modulesOriginal: Module[];
  modules: Module[];
  categories: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, private modulesService: ModulesService, private translate: TranslateService) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad(): void {
    // this.file.removeFile(this.file.dataDirectory, this.modulesService.FILE_NAME);
    this.file.checkFile(this.file.dataDirectory, this.modulesService.FILE_NAME).then(res => {
      if (res) {
        this.file.readAsText(this.file.dataDirectory, this.modulesService.FILE_NAME).then(data => {
          this.modulesOriginal = JSON.parse(data);
          this.modulesService.update(this.modulesOriginal);
        });
      }
    }, err => { });
  }

  ionViewDidEnter(): void {
    this.subscription = this.modulesService.modules.subscribe((modules: Module[]) => this.modulesOriginal = modules);
    this.categories = [];
    let index = 0;
    for (let module of this.modulesOriginal) {
      if (index === 0)
        this.categories.push(module.category);
      else {
        this.categories.indexOf(module.category) <= -1 ? this.categories.push(module.category) : null;
      }
      index++;
    }
    let categorieA: string = "";
    let categorieB: string = "";
    this.categories = this.categories.sort((a, b) => {
      this.translate.get('MODULES.CATEGORIES.' + a).subscribe((res: string) => categorieA = res);
      this.translate.get('MODULES.CATEGORIES.' + b).subscribe((res: string) => categorieB = res);
      return categorieA.localeCompare(categorieB);
    });
    this.refreshModules();
  }

  private refreshModules(): void {
    if (this.section === 'favorites') {
      this.modules = this.modulesOriginal.filter((module: Module) => module.fav);
      this.modules = this.alphabeticModuleSort(this.modules);
    } else if (this.section === 'recents') {
      this.modules = this.modulesOriginal.filter((module: Module) => module.access);
      this.modules = this.modules.sort((a, b) => new Date(b.access).getTime() - new Date(a.access).getTime());
    } else if (this.section === 'all') {
      this.modules = this.alphabeticModuleSort(this.modulesOriginal);
    }
  }

  private alphabeticModuleSort(module: Module[]): Module[] {
    let nameA: string = "";
    let nameB: string = "";
    return module.sort((a, b) => {
      this.translate.get('MODULES.NAMES.' + a.name).subscribe((res: string) => nameA = res);
      this.translate.get('MODULES.NAMES.' + b.name).subscribe((res: string) => nameB = res);
      return nameA.localeCompare(nameB);
    });
  }

  toggleFavorite(module: Module, event: { srcEvent: Event } ): void {
    this.modulesOriginal = this.modulesOriginal.map((element: Module) => {
      element === module ? element.fav = !element.fav : null;
      return element;
    });
    event.srcEvent.stopPropagation();
    this.modulesService.next(this.modulesOriginal);
  }

  openPage(module: Module): void {
    this.modulesOriginal = this.modulesOriginal.map((element: Module) => {
      element === module ? element.access = new Date() : null;
      return element;
    });
    this.modulesService.next(this.modulesOriginal);
  }

  segmentChanged(): void {
    this.refreshModules();
  }

  formatDate(date: Date): string {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  }

  ionViewWillLeave(): void {
    this.subscription.unsubscribe();
  }
}
