import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Content, IonicPage, Loading, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import { AlertRadioButton } from '../../app/objects/AlertRadioButton';
import { IP } from '../../app/objects/IP';
import { Module } from '../../app/objects/Module';
import { Robot } from '../../app/objects/Robot';
import { ModulesService } from '../../app/services/modules/modules.service';
import { QiService } from '../../app/services/naoqi/qi.service';
import { RobotsService } from '../../app/services/robots/robots.service';



declare var pingRobot: any;

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

  private robots: Robot[];
  private robotsSubscription: Subscription;
  private dataSubscription: Subscription;

  private modulesOriginal: Module[];
  modules: Module[];
  categories: string[];

  private robotsAlertCombobox: AlertRadioButton;
  private loading: Loading;

  private cancelText: string;
  private connectText: string;
  private errorAddAtLeastOneRobotText: string;
  private errorNetworkDisconnectedText: string;
  private errorNoRobotFoundText: string;
  private errorText: string;
  private informationText: string;
  private okText: string;
  private pleaseWaitText: string;
  private robotsText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private file: File, private modulesService: ModulesService, private translate: TranslateService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private robotsService: RobotsService) {
    this.searchControl = new FormControl();
    translate.get('ERROR.ERROR').subscribe((res: string) => this.errorText = res);
    translate.get('ERROR.NETWORK_DISCONNECTED').subscribe((res: string) => this.errorNetworkDisconnectedText = res);
    translate.get('ERROR.ADD_AT_LEAST_A_ROBOT').subscribe((res: string) => this.errorAddAtLeastOneRobotText = res);
    translate.get('ERROR.NO_ROBOT_FOUND').subscribe((res: string) => this.errorNoRobotFoundText = res);
    translate.get('UI.ALERT.TITLE.INFORMATION.INFORMATION').subscribe((res: string) => this.informationText = res);
    translate.get('PLEASE_WAIT').subscribe((res: string) => this.pleaseWaitText = res);
    translate.get("VERBS.CANCEL").subscribe((res: string) => this.cancelText = res);
    translate.get("VERBS.CONNECT").subscribe((res: string) => this.connectText = res);
    translate.get("OK").subscribe((res: string) => this.okText = res);
    translate.get("ROBOTS").subscribe((res: string) => this.robotsText = res);
  }

  ionViewDidLoad(): void {
    this.file.checkFile(this.file.dataDirectory, this.robotsService.FILE_NAME).then(res => {
      if (res) {
        this.file.readAsText(this.file.dataDirectory, this.robotsService.FILE_NAME).then(data => {
          this.robots = JSON.parse(data);
          this.robotsService.next(this.robots);
        });
      }
    }, err => { });
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
    this.robotsSubscription = this.robotsService.robots.subscribe((robots: Robot[]) => this.robots = robots);
    this.updateCategories(this.modulesOriginal);
    this.refreshModules();
    this.robotsAlertCombobox = new AlertRadioButton(this.alertCtrl);
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
    this.loading = this.loadingCtrl.create({
      content: this.pleaseWaitText
    });
    this.loading.present();
    const robotsAlertCombobox = this.robotsAlertCombobox.create(this.robotsText);
    const promises = [];
    if (this.robots.length > 0) {
      this.robots.forEach((robot: Robot) => {
        promises.push(pingRobot(robot));
      });
    } else {
      this.loading.dismiss();
      this.alertCtrl.create({
        title: this.errorText,
        subTitle: this.errorAddAtLeastOneRobotText,
        buttons: [this.okText]
      }).present();
    }
    this.dataSubscription.unsubscribe();
    let index = 0;
    let pass = 0;
    promises.forEach((promise) => {
      promise.then(robot => {
        pass++;
        robotsAlertCombobox.addInput({
          type: 'radio',
          label: robot.name + ' (' + robot.ip + ')',
          value: robot.ip,
          checked: false
        });
        if (++index === promises.length) {
          this.loading.dismiss();
          this.robotsAlertCombobox.present();
        }
      }).catch(err => {
        if (++index === promises.length) {
          this.loading.dismiss();
          if (pass === 0) {
            console.error('[ERROR][PING][ROBOTS] Unable to find the robot.')
            this.alertCtrl.create({
              title: this.errorText,
              subTitle: this.errorNoRobotFoundText,
              enableBackdropDismiss: false,
              buttons: [this.okText]
            }).present();
          } else {
            this.robotsAlertCombobox.present();
          }
        }
      });
    });
    robotsAlertCombobox.addButton({
      text: this.cancelText,
      handler: () => {
        this.robotsAlertCombobox.close();
      }
    });
    robotsAlertCombobox.addButton({
      text: this.connectText,
      handler: data => {
        if (data) {
          this.robotsAlertCombobox.close();
          this.loading = this.loadingCtrl.create({
            content: this.pleaseWaitText
          });
          this.loading.present();
          QiService.connect(new IP(data.split('.')));
          this.robotsAlertCombobox.setResult(data);
          this.modulesOriginal.forEach((element: Module) => element.id === module.id ? element.last_access = new Date() : null);
          this.modulesService.next(this.modulesOriginal);
          this.modalCtrl.create(module.page, null, { cssClass: "modules" }).present();
          this.loading.dismiss();
          this.robotsAlertCombobox.setResult(data);
        }
      }
    });
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
    this.robotsSubscription.unsubscribe();
  }
}
