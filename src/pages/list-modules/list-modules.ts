import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content, IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import { Module } from '../../app/objects/Module';
import { RobotsChooser } from '../../app/objects/ionic/RobotsChooser';
import { ModulesService } from '../../app/services/modules/modules.service';
import { RobotsService } from '../../app/services/robots/robots.service';



@IonicPage()
@Component({
  selector: 'page-list-modules',
  templateUrl: 'list-modules.html'
})
export class ListModulesPage {

  private _oldSection: string;
  section: string = "favorites";

  private _dataSubscription: Subscription;

  private _modulesOriginal: Module[];
  modules: Module[];
  categories: string[];

  // UI
  private _robotsChooser: RobotsChooser;
  @ViewChild(Content) content: Content;
  searchControl: FormControl;
  searchTerm: string = '';
  searchBar: boolean = false;
  searching: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private _modalCtrl: ModalController, private _file: File, private _modulesService: ModulesService, private _translate: TranslateService, private _alertCtrl: AlertController, loadingCtrl: LoadingController, private _robotsService: RobotsService) {
    this.searchControl = new FormControl();
    this._robotsChooser = new RobotsChooser(this.navCtrl, this.viewCtrl, this._translate, this._alertCtrl, this._robotsService, loadingCtrl, this._file);
  }

  ionViewDidLoad(): void {
    // this.file.removeFile(this.file.dataDirectory, this.modulesService.FILE_NAME);
    this._file.checkFile(this._file.dataDirectory, this._modulesService.FILE_NAME).then(res => {
      if (res) {
        this._file.readAsText(this._file.dataDirectory, this._modulesService.FILE_NAME).then(data => {
          this._modulesOriginal = JSON.parse(data);
          this._modulesService.update(this._modulesOriginal);
        });
      }
    }, err => { });
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.filterItems();
    });
  }

  ionViewDidEnter(): void {
    this._dataSubscription = this._modulesService.modules.subscribe((modules: Module[]) => this._modulesOriginal = modules);
    this.updateCategories(this._modulesOriginal);
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
      this._translate.get('MODULES.CATEGORIES.' + a).subscribe((res: string) => categorieA = res);
      this._translate.get('MODULES.CATEGORIES.' + b).subscribe((res: string) => categorieB = res);
      return categorieA.localeCompare(categorieB);
    });
  }

  private refreshModules(): void {
    if (this.section === 'favorites') {
      this.modules = this._modulesOriginal.filter((module: Module) => module.fav);
      this.alphabeticModuleSort(this.modules);
    } else if (this.section === 'recents') {
      this.modules = this._modulesOriginal.filter((module: Module) => module.last_access);
      this.modules = this.modules.sort((a, b) => new Date(b.last_access).getTime() - new Date(a.last_access).getTime());
    } else if (this.section === 'all') {
      if (this.searchTerm.length <= 0)
        this.updateCategories(this._modulesOriginal);
      this.modules = this._modulesOriginal;
      this.alphabeticModuleSort(this.modules);
    }
  }

  private alphabeticModuleSort(module: Module[]): void {
    let nameA: string = "";
    let nameB: string = "";
    module.sort((a, b) => {
      this._translate.get('MODULES.NAMES.' + a.name).subscribe((res: string) => nameA = res);
      this._translate.get('MODULES.NAMES.' + b.name).subscribe((res: string) => nameB = res);
      return nameA.localeCompare(nameB);
    });
  }

  toggleFavorite(module: Module, event: { srcEvent: Event }): void {
    this._modulesOriginal = this._modulesOriginal.map((element: Module) => {
      element === module ? element.fav = !element.fav : null;
      return element;
    });
    event.srcEvent.stopPropagation();
    this._modulesService.next(this._modulesOriginal);
  }

  loadPage(module: Module): void {
    this._robotsChooser.show(this, this.openPage, module);
  }

  openPage(module: Module): void {
    this._modulesOriginal.forEach((element: Module) => element.id === module.id ? element.last_access = new Date() : null);
    this._modulesService.next(this._modulesOriginal);
    this._modalCtrl.create(module.page, null, { cssClass: "modules" }).present();
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
    this._oldSection = this.section;
    this.section = 'all';
    this.searchBar = true;
  }

  cancelSearch(): void {
    this.section = this._oldSection;
    this.searchTerm = '';
    this.searchBar = false;
    this.refreshModules();
  }

  private filterItems(): void {
    if (this.searchBar) {
      const subscription = this._modulesService.filter(this.searchTerm).subscribe((modules: Module[]) => this.modules = modules);
      this.updateCategories(this.modules);
      subscription.unsubscribe();
    }
  }

  ionViewWillLeave(): void {
    this._dataSubscription.unsubscribe();
  }
}
