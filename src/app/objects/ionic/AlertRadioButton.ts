import { Alert, AlertController } from "ionic-angular";
import { SettingsService } from "../../services/settings/settings.service";
import { Theme } from "../Theme";
import { IAlertRadioButton } from "./interfaces/IAlertRadioButton";

/**
 * An AlertRadioButton object.
 * @author Guillaume Quittet
 * @implements
 */
export class AlertRadioButton implements IAlertRadioButton {

  protected isRadioOpen: boolean = false;
  private _alert: Alert;
  private _result: string;

  // Subscription
  private _takeWhile: boolean = true;

  // UI
  // Theme
  private _theme: Theme;

  /**
   * Create a new AlertRadioButton object.
   * @param _alertCtrl The alert controller.
   * @param _settingsService The settings service.
   * @constructor
   */
  constructor(private _alertCtrl: AlertController, private _settingsService: SettingsService) { }

  /**
   * Create a new alert.
   * @param title The title of the alert.
   * @override
   */
  create(title: string): Alert {
    this._settingsService.theme.takeWhile(() => this._takeWhile).subscribe((theme: Theme) => this._theme = theme);
    this._alert = this._alertCtrl.create({
      enableBackdropDismiss: false,
      cssClass: this._theme.class
    });
    this._alert.setTitle(title);
    return this._alert;
  }

  /**
   * Return the result of the alert.
   * @returns {string} The result of the alert.
   */
  get result(): string {
    return this._result;
  }

  /**
   * Set the result of the alert.
   * @param result The result of the alert.
   */
  set result(result: string) {
    this._result = result;
  }

  /**
   * Close the alert.
   * @override
   */
  close(): void {
    this.isRadioOpen = false;
    this._takeWhile = false;
  }

  /**
   * Create a new input for the alert.
   * @param name The name of the input.
   * @override
   */
  createInput(name: string): void {
    this._alert.addInput({
      type: 'radio',
      label: name,
      value: name,
      checked: name === this._result
    });
  }

  /**
   * Show the alert.
   * @override
   */
  present(): void {
    this._alert.present().then(() => this.isRadioOpen = true);
  }
}