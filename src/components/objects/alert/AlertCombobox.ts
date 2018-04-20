import { IAlertCombobox } from "./IAlertCombobox";
import { Alert, AlertController } from "ionic-angular";

export class AlertCombobox implements IAlertCombobox {

  protected isRadioOpen: boolean = false;
  private alert: Alert;
  private result: string;

  constructor(private alertCtrl: AlertController) { }

  create(title: string): Alert {
    this.alert = this.alertCtrl.create();
    this.alert.setTitle(title);
    return this.alert;
  }

  getResult(): string {
    return this.result;
  }

  setResult(result: string): void {
    this.result = result;
  }

  close(): void {
    this.isRadioOpen = false;
  }

  createInput(name: string): void {
    this.alert.addInput({
      type: 'radio',
      label: name,
      value: name,
      checked: name === this.result
    });
  }

  present(): void {
    this.alert.present().then(() => this.isRadioOpen = true);
  }
}