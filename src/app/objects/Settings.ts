import { Theme } from "./Theme";

/**
 * The object representation of the settings of this application.
 * @author Guillaume Quittet
 */
export interface Settings {

    /**
     * The current language used by the application.
     */
    language: string;

    /**
     * The current theme used by the application.
     */
    theme: Theme;
}