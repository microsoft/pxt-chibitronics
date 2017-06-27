
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

//% groups='["other", "Colors"]'
namespace rgb {

    /**
     * Shows the on-board RGB LED to a given color (range 0-255 for r, g, b).
     * @param rgb RGB color of the LED
     */
    //% blockId="rgb_set_color" block="set rgb to %rgb=rgb_colors"
    //% weight=90 help="rgb/set-color"
    export function setColor(rgb: number) {
        let red = unpackR(rgb);
        let green = unpackG(rgb);
        let blue = unpackB(rgb);

        setRGBLed(red, green, blue);
    }

    /**
     * Dim's an RGB color
     * @param rgb RGB color of the LED
     * @param level dim level between 0 and 5 eg: 1
     */
    //% blockId="rgb_dim" block="dim %rgb=rgb_colors |%level"
    //% level.min=0 level.max=5
    //% weight=80 help="rgb/dim"
    export function dim(rgb: number, level: number): number {
        if(level < 0)
            level = 0;
        if(level > 5)
            level = 5;
        return( (((rgb & 0xFF0000) >> level) & 0xFF0000) |
            (((rgb & 0x00FF00) >> level) & 0x00FF00) |
            (((rgb & 0x0000FF) >> level) & 0x0000FF) );
    }

    /**
     * Converts red, green, blue channels into an RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% blockId="rgb_rgbcolor" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% weight=20 help="rgb/rgbcolor" blockGap=8 group="Colors"
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    /**
     * Converts wheel position into an RGB color
     * @param wheelPos value between 0 to 255 to get a color value, eg: 10
     */
    //% blockId="rgb_wheel" block="wheel %wheelPos"
    //% wheelPos.min=0 wheelPos.max=255 group="Colors"
    //% weight=19 help="rgb/rgbwheel" blockGap=8
    export function wheel(wheelPos: number): number {
        wheelPos = 255 - wheelPos;
        if(wheelPos < 85) {
            return rgb(255 - wheelPos * 3, 0, wheelPos * 3);
        }
        if(wheelPos < 170) {
            wheelPos -= 85;
            return rgb(0, wheelPos * 3, 255 - wheelPos * 3);
        }
        wheelPos -= 170;
        return rgb(wheelPos * 3, 255 - wheelPos * 3, 0);
    }

    /**
     * Gets the RGB value of a known color
    */
    //% weight=10 blockGap=8
    //% blockId=rgb_colors block="%color"
    //% shim=TD_ID group="Colors"
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