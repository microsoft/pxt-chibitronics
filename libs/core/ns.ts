
/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=#4C97FF weight=100 icon="\uf185"
namespace lights {

}

/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=#9966FF weight=90 icon="\uf192"
namespace sensing {

}

/**
 * Provides access to basic RGB LED functionality.
 */
//% color=#CF63CF weight=80 icon="\uf00a"
namespace rgb {

}

/**
 * Provides access to Chibi Scope functionality.
 */
//% color=#00b295 weight=70 icon="\uf27b" advanced=true
namespace scope {

}

/**
 * Basic functionalities.
 */
//% color=#0078D7 weight=70 icon="\uf110"
namespace loops {

    /**
      * Get the time field editor
      * @param ms time duration in milliseconds, eg: 500, 1000
      */
    //% blockId=timePicker block="%ms"
    //% blockHidden=true
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% ms.fieldEditor="numberdropdown" ms.fieldOptions.decompileLiterals=true
    //% ms.fieldOptions.data='[["100 ms", 100], ["200 ms", 200], ["500 ms", 500], ["1 second", 1000], ["2 seconds", 2000]]'
    export function timePicker(ms: number): number{
        return ms;
    }
}

namespace rgb {

    /**
     * Get the color wheel field editor
     * @param color color, eg: #ff0000
     */
    //% blockId=colorNumberPicker block="%value"
    //% blockHidden=true
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.defl='#ff0000'
    export function colorNumberPicker(value: number) {
        return value;
    }

    /**
     * Get the color wheel field editor
     * @param value value between 0 to 255 to get a color value, eg: 10
     */
    //% blockId=colorWheelPicker block="%value"
    //% blockHidden=true
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% value.fieldEditor="colorwheel" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.sliderWidth='200'
    //% value.fieldOptions.min=0 value.fieldOptions.max=255
    export function colorWheelPicker(value: number) {
        return value;
    }
}

/**
 * Control currents in Pins for analog/digital signals, servos, i2c, ...
 */
//% color=#ff8c1a weight=60 icon="\uf02a" advanced=true
namespace pins {

}

declare namespace String {

    //% blockNamespace="Text" advanced="false"
    export function fromCharCode(code: number): string;
}