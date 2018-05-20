/**
 * A behavior make with the Choregraphe software object.
 * @author Guillaume Quittet
 */
export interface Behavior {

    /**
     * The id of the behavior.
     * @readonly
     */
    readonly id: number;

    /**
     * The name of the behavior.
     * @readonly
     */
    readonly name: string;

    /**
     * The posture of the robot during this behavior.
     * @readonly
     */
    readonly posture: string;

    /**
     * The category of the behavior.
     * @readonly
     */
    readonly category: string;

    /**
     * The name of the creator of the behavior.
     * @readonly
     */
    readonly creator: string;

    /**
     * The path where the behavior is stored.
     * @readonly
     */
    readonly path: string;
}