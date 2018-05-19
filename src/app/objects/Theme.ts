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
}