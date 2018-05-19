import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Settings } from '../../objects/Settings';
import { Theme } from '../../objects/Theme';


/**
 * The service to access asynchronously to the settings.
 * @author Guillaume Quittet
 */
@Injectable()
export class SettingsService {

  /**
   * The file name where the data will be saved.
   * @readonly
   */
  readonly FILE_NAME: string = "settings.json";

  /**
   * The list of the themes.
   * @readonly
   */
  private readonly _THEMES: Theme[] = [
    <Theme>{ name: 'Blue Autism', class: 'theme-blue-autism' },
    <Theme>{ name: 'Campus Economique', class: 'theme-campus-economique' },
    <Theme>{ name: 'Campus Pédagogique', class: 'theme-campus-pedagogique' },
    <Theme>{ name: 'Campus Social', class: 'theme-campus-social' },
    <Theme>{ name: 'Campus Technique', class: 'theme-campus-technique' }
  ];

  /**
   * The obsever of the themes.
   */
  private _themeSubject: BehaviorSubject<Theme>;

  constructor(private _file: File) {
    this._themeSubject = new BehaviorSubject<Theme>(this._THEMES[0]);
    this._file.checkFile(this._file.dataDirectory, this.FILE_NAME).then(res => {
      if (res) {
        this._file.readAsText(this._file.dataDirectory, this.FILE_NAME).then((data: string) => {
          const settings: Settings = JSON.parse(data);
          this.changeTheme(settings.theme);
        });
      }
    }, err => console.error(err));
  }

  /**
   * Change the theme of the application.
   * @param theme The new theme of the applicaiton.
   */
  changeTheme(theme: Theme): void {
    this._themeSubject.next(theme);
    this.udpateFile();
  }

  /**
   * Update the file where the settings are saved.
   */
  private udpateFile(): void {
    this._file.checkFile(this._file.dataDirectory, this.FILE_NAME).then(res => {
      this._file.writeExistingFile(this._file.dataDirectory, this.FILE_NAME, JSON.stringify(this.settings));
    }, err => {
      this._file.writeFile(this._file.dataDirectory, this.FILE_NAME, JSON.stringify(this.settings));
    });
  }

  /**
   * Return the current theme.
   * @returns {Observable<Theme>} The current theme.
   */
  get theme(): Observable<Theme> {
    return this._themeSubject.asObservable();
  }

  /**
   * Return the list of the themes.
   * @returns {Promise<Theme[]} A promise that return the list of the themes.
   */
  get themes(): Promise<Theme[]> {
    return new Promise((resolve, reject) => resolve(this._THEMES));
  }

  /**
   * Return the settings as objects.
   * @returns {Settings} The settings of the application.
   */
  private get settings(): Settings {
    return { theme: this._themeSubject.value };
  }
}