/**
 * A Module object.
 * @author Guillaume Quittet
 */
export interface Module {

    /**
     * The id of the module.
     * @readonly
     */
    readonly id: number;

    /**
     * The name of the module.
     */
    name: string;

    /**
     * The category of the module.
     */
    category: string;

    /**
     * The page to open the module.
     */
    page: string;

    /**
     * The favorite status of the module.
     */
    fav: boolean;

    /**
     * The name of the creator of the module.
     * @readonly
     */
    readonly creator: string;

    /**
     * The name of the maintainer of the module.
     */
    maintainer: string;

    /**
     * The current version of the module.
     */
    version: string;

    /**
     * The date when the module was created.
     * @readonly
     */
    readonly created: Date;

    /**
     * The date when the module was updated.
     */
    updated: Date;

    /**
     * The date when the module was opened for the last time.
     */
    last_access: Date;
}