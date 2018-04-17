import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ModulesService } from '../../app/services/modules/modules.service';
import { Module } from '../../app/objects/Module';

import { File } from '@ionic-native/file'


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

  private modules: Module[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, private modulesService: ModulesService) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad(): void {
    this.file.checkFile(this.file.dataDirectory, this.modulesService.FILE_NAME).then(res => {
      if (res) {
        this.file.readAsText(this.file.dataDirectory, this.modulesService.FILE_NAME).then(data => {
          this.modules = JSON.parse(data);
          this.modulesService.update(this.modules);
        });
      }
    }, err => { });
  }

  ionViewDidEnter(): void {
    this.refreshModules();
  }

  private refreshModules(): void {
    this.modulesService.modules.subscribe(
      (modules: Module[]) => {
        this.modules = modules;
        if (this.section === 'favorites') {
          this.modules = this.modules.filter((module: Module) => module.fav);
        } else if (this.section === 'recents') {

        }
      },
      (error) => console.error(error),
      () => {

      });
  }

  segmentChanged(): void {
    console.log(this.section);
    this.refreshModules();
  }
}
