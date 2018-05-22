import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Globalization } from '@ionic-native/globalization';
import { TranslateService } from '@ngx-translate/core';
import { Config } from 'ionic-angular';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  private readonly _FILE_NAME: string = "settings.json";

  /**
   * The list of the themes.
   * @readonly
   */
  private readonly _THEMES: Theme[] = [
    <Theme>{ name: 'Blue Autism', class: 'theme-blue-autism', primaryColor: '#5191CE' },
    <Theme>{ name: 'Campus Economique', class: 'theme-campus-economique', primaryColor: '#dfae00' },
    <Theme>{ name: 'Campus Pédagogique', class: 'theme-campus-pedagogique', primaryColor: '#72214b' },
    <Theme>{ name: 'Campus Social', class: 'theme-campus-social', primaryColor: '#d16003' },
    <Theme>{ name: 'Campus Technique', class: 'theme-campus-technique', primaryColor: '#c80b0e' }
  ];

  /**
   * The obsever of the themes.
   * @readonly
   */
  private readonly _themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this._THEMES[0]);
  /**
   * The observer of the language.
   */
  private readonly _languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._translate.currentLang);

  // Subscription
  private _subscription: Subscription;

  constructor(private _file: File, private _translate: TranslateService, private _globalization: Globalization, private _config: Config) {
    this._subscription = new Subscription();
  }

  /**
   * Read the file where the settings are saved.
   */
  readFile(): void {
    this._file.readAsText(this._file.dataDirectory, this._FILE_NAME).then((data: string) => {
      const settings: Settings = JSON.parse(data);
      this.initializeTranslate(settings);
      this.changeTheme(settings.theme);
    }).catch(err => console.error(JSON.stringify("[ERROR][SettingsService] Unable to read the file " + JSON.stringify(err))));
  }

  /**
   * Initialize the translations.
   * @param settings The settings object.
   */
  private initializeTranslate(settings: Settings): void {
    this._translate.setDefaultLang('en');
    this._translate.addLangs(['fr']);
    if (!settings.language) {
      this._globalization.getPreferredLanguage().then(lang => {
        this.changeLanguage(lang.value.split('-')[0]);
      }).catch(e => {
        console.error('[ERROR][GLOBALIZATION][getLocale] ' + e);
      });
    } else {
      this.changeLanguage(settings.language);
    }
    this._subscription.add(this._translate.get('UI.NAVBAR.BUTTONS.BACK').subscribe(res => {
      this._config.set('ios', 'backButtonText', res);
    }));
  }

  /**
   * Change the theme of the application.
   * @param theme The new theme of the application.
   */
  changeTheme(theme: Theme): void {
    this._themeSubject.next(theme);
    this.updateFile();
  }

  /**
   * Find a theme by its class name and return it.
   * @param className The class name of the theme.
   * @returns {Theme} The theme.
   */
  findThemeByClassName(className: string): Theme {
    for (let theme of this._THEMES) {
      if (theme.class == className) {
        return theme;
      }
    }
    console.error("[ERROR][Themes] Unable to find the theme with this class: " + className);
    return null;
  }

  /**
   * Change the language of the application.
   * @param language The new language of the applicaiton.
   */
  changeLanguage(language: string): void {
    this._languageSubject.next(language);
    this._translate.use(language);
    this.updateFile();
  }

  /**
   * Update the file where the settings are saved.
   */
  private updateFile(): void {
    this._file.writeFile(this._file.dataDirectory, this._FILE_NAME, JSON.stringify(this.settings), { replace: true });
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

  get language(): Observable<string> {
    return this._languageSubject.asObservable();
  }

  /**
   * Return the settings of the application.
   * @returns {Settings} The settings of the application.
   */
  private get settings(): Settings {
    return <Settings>{ language: this._languageSubject.value, theme: this._themeSubject.value };
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}