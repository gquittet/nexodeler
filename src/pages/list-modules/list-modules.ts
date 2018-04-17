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
    this.refreshModules();
  }

  private refreshModules(): void {
    if (this.section === 'favorites') {
      this.modules = this.modulesOriginal.filter((module: Module) => module.fav);
    } else if (this.section === 'recents') {
      this.modules = this.modulesOriginal.sort((a, b) => new Date(b.access).getTime() - new Date(a.access).getTime());
    } else if (this.section === 'all') {
      let nameA: string;
      let nameB: string;
      this.modules = this.modulesOriginal.sort((a, b) => {
        this.translate.get('MODULES.NAMES.' + a.name).subscribe((res: string) => nameA = res);
        this.translate.get('MODULES.NAMES.' + b.name).subscribe((res: string) => nameB = res);
        return nameA.localeCompare(nameB);
      });
    }
  }

  toggleFavorite(module: Module): void {
    this.modulesOriginal = this.modulesOriginal.map((element: Module) => {
      element === module ? element.fav = !element.fav : null;
      return element;
    });
    this.modulesService.update(this.modulesOriginal);
  }

  openPage(module: Module): void {
    this.modulesOriginal = this.modulesOriginal.map((element: Module) => {
      element === module ? element.access = new Date() : null;
      return element;
    });
    this.modulesService.update(this.modulesOriginal);
  }

  segmentChanged(): void {
    console.log(this.section);
    this.refreshModules();
  }

  ionViewWillLeave(): void {
    this.subscription.unsubscribe();
  }
}
