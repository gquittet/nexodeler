/**
 * A class to manage color.
 * @author
 */
export class Color {

    /**
     * Shade an hexadecimal color.
     * @param color The hexadecimal color code.
     * @param percent The percentage of the shade. [-100, 100];
     * @returns {string} The shade of the color.
     */
    static shade(color: string, percent: number): string {
        if (color[0] === '#' && color.length === 7) {
            let r: number = parseInt(color.substring(1, 3), 16);
            let g: number = parseInt(color.substring(3, 5), 16);
            let b: number = parseInt(color.substring(5, 7), 16);

            r = Math.floor(r * (100 + percent) / 100);
            g = Math.floor(g * (100 + percent) / 100);
            b = Math.floor(b * (100 + percent) / 100);

            r = (r < 255) ? r : 255;
            g = (g < 255) ? g : 255;
            b = (b < 255) ? b : 255;

            const R: string = (r.toString(16).length === 1) ? '0' + r.toString(16) : r.toString(16);
            const G: string = (g.toString(16).length === 1) ? '0' + g.toString(16) : g.toString(16);
            const B: string = (b.toString(16).length === 1) ? '0' + b.toString(16) : b.toString(16);

            return '#' + R + G + B;
        }
        throw 'Please enter a correct color with the hexadecimal format.';
    }
}