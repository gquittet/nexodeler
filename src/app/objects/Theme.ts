/**
 * A theme object.
 * @author Guillaume Quittet
 */
export interface Theme {

    /**
     * The name of the theme.
     * @readonly
     */
    readonly name: string;

    /**
     * The css class of the theme.
     * @readonly
     */
    readonly class: string;

    /**
     * The primary color of the theme.
     * @readonly
     */
    readonly primaryColor: string;
}