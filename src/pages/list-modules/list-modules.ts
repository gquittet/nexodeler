import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ModulesService } from '../../app/services/modules/modules.service';
import { Module } from '../../app/objects/Module';
import { trigger, style, animate, transition, keyframes } from '@angular/animations';

import { File } from '@ionic-native/file'
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/debounceTime';

@IonicPage()
@Component({
  selector: 'page-list-modules',
  templateUrl: 'list-modules.html'
})
export class ListModulesPage {

  private oldSection: string;
  section: string = "favorites";

  searchControl: FormControl;
  searchTerm: string = '';
  searchBar: boolean = false;
  searching: boolean;
  @ViewChild(Content) content: Content;

  private dataSubscription: Subscription;

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
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this.dataSubscription = this.modulesService.modules.subscribe((modules: Module[]) => this.modulesOriginal = modules);
    this.updateCategories(this.modulesOriginal);
    this.refreshModules();
  }

  private updateCategories(modules: Module[]): void {
    this.categories = [];
    modules.forEach((module: Module, index: number) => {
      if (index === 0)
        this.categories.push(module.category);
      else {
        this.categories.indexOf(module.category) <= -1 ? this.categories.push(module.category) : null;
      }
    });
    let categorieA: string = "";
    let categorieB: string = "";
    this.categories = this.categories.sort((a, b) => {
      this.translate.get('MODULES.CATEGORIES.' + a).subscribe((res: string) => categorieA = res);
      this.translate.get('MODULES.CATEGORIES.' + b).subscribe((res: string) => categorieB = res);
      return categorieA.localeCompare(categorieB);
    });
  }

  private refreshModules(): void {
    if (this.section === 'favorites') {
      this.modules = this.modulesOriginal.filter((module: Module) => module.fav);
      this.alphabeticModuleSort(this.modules);
    } else if (this.section === 'recents') {
      this.modules = this.modulesOriginal.filter((module: Module) => module.last_access);
      this.modules = this.modules.sort((a, b) => new Date(b.last_access).getTime() - new Date(a.last_access).getTime());
    } else if (this.section === 'all') {
      if (this.searchTerm.length <= 0)
        this.updateCategories(this.modulesOriginal);
      this.modules = this.modulesOriginal;
      this.alphabeticModuleSort(this.modules);
    }
  }

  private alphabeticModuleSort(module: Module[]): void {
    let nameA: string = "";
    let nameB: string = "";
    module.sort((a, b) => {
      this.translate.get('MODULES.NAMES.' + a.name).subscribe((res: string) => nameA = res);
      this.translate.get('MODULES.NAMES.' + b.name).subscribe((res: string) => nameB = res);
      return nameA.localeCompare(nameB);
    });
  }

  toggleFavorite(module: Module, event: { srcEvent: Event }): void {
    this.modulesOriginal = this.modulesOriginal.map((element: Module) => {
      element === module ? element.fav = !element.fav : null;
      return element;
    });
    event.srcEvent.stopPropagation();
    this.modulesService.next(this.modulesOriginal);
  }

  openPage(module: Module): void {
    this.modulesOriginal.forEach((element: Module) => element.id === module.id ? element.last_access = new Date() : null);
    this.modulesService.next(this.modulesOriginal);
  }

  segmentChanged(): void {
    this.refreshModules();
  }

  formatDate(date: Date): string {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  }

  inputSearch(): void {
    this.content.scrollToTop();
    this.searching = true;
  }

  showSearchBar(): void {
    this.oldSection = this.section;
    this.section = 'all';
    this.searchBar = true;
  }

  cancelSearch(): void {
    this.section = this.oldSection;
    this.searchTerm = '';
    this.searchBar = false;
    this.refreshModules();
  }

  private filterItems(): void {
    if (this.searchBar) {
      const subscription = this.modulesService.filter(this.searchTerm).subscribe((modules: Module[]) => this.modules = modules);
      this.updateCategories(this.modules);
      subscription.unsubscribe();
    }
  }

  ionViewWillLeave(): void {
    this.dataSubscription.unsubscribe();
  }
}
