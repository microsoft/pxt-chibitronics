
/**
 * Well known colors for the RGB Led
 */
enum Colors {
    //% block=red blockIdentity=rgb.colors
    Red = 0xFF0000,
    //% block=orange blockIdentity=rgb.colors
    Orange = 0xFFA500,
    //% block=yellow blockIdentity=rgb.colors
    Yellow = 0xFFFF00,
    //% block=green blockIdentity=rgb.colors
    Green = 0x00FF00,
    //% block=blue blockIdentity=rgb.colors
    Blue = 0x0000FF,
    //% block=indigo blockIdentity=rgb.colors
    Indigo = 0x4b0082,
    //% block=violet blockIdentity=rgb.colors
    Violet = 0x8a2be2,
    //% block=purple blockIdentity=rgb.colors
    Purple = 0xFF00FF,
    //% block=pink blockIdentity=rgb.colors
    Pink = 0xFFC0CB,
    //% block=white blockIdentity=rgb.colors
    White = 0xFFFFFF,
    //% block=black  blockIdentity=rgb.colors
    Black = 0x000000
}

namespace rgb {

    /**
     * Shows the on-board RGB LED to a given color (range 0-255 for r, g, b).
     * @param rgb RGB color of the LED
     */
    //% blockId="rgb_set_color" block="set rgb to %rgb=rgb_colors"
    //% weight=90
    export function setColor(rgb: number) {
        let red = unpackR(rgb);
        let green = unpackG(rgb);
        let blue = unpackB(rgb);

        setRGBLed(red, green, blue);
    }

    /**
     * Gets the RGB value of a known color
    */
    //% weight=2 blockGap=8
    //% blockId=rgb_colors block="%color"
    //% shim=TD_ID
    export function colors(color: Colors): number {
        return color;
    }

    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb >> 0) & 0xFF;
        return b;
    }
}