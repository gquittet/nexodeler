export interface IBtrAlert {

  /**
   * Close the alert
   */
  close(): void;

  /**
   * Create an input for an alert
   * @param name The name of the input to create
   */
  createInput(name: string): void;

  /**
   * Show the alert
   */
  present(): void;
}