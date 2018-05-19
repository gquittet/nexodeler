import { Alert } from "ionic-angular";

/**
 * A alert radio button interface.
 * @author Guillaume Quittet
 * @interface
 */
export interface IAlertRadioButton {

  /**
   * Close the alert.
   */
  close(): void;

  /**
   * Create a new alert.
   * @param title The title of the alert.
   */
  create(title: string): Alert;

  /**
   * Create a new input for the alert.
   * @param name The name of the input.
   */
  createInput(name: string): void;

  /**
   * Show the alert.
   */
  present(): void;
}