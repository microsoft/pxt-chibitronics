
namespace Math {
    /**
     * Re-maps a number from one range to another. That is, a value of ``from low`` would get mapped to ``to low``, a value of ``from high`` to ``to high``, values in-between to values in-between, etc.
     * @param value value to map in ranges
     * @param fromLow the lower bound of the value's current range
     * @param fromHigh the upper bound of the value's current range, eg: 255
     * @param toLow the lower bound of the value's target range
     * @param toHigh the upper bound of the value's target range, eg: 100
     */
    //% help=pins/map weight=23
    //% blockId=math_map block="map %value|from low %fromLow|from high %fromHigh|to low %toLow|to high %toHigh"
    export function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
        return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    }
}

namespace pins {

    /**
     * Get the id of a DigitalPin.
     * @param pin the digital pin, eg: DigitalPin.D0
     */
    //% weight=2 help=pins/digital-pin
    //% blockId=digital_pin block="%pin"
    //% shim=TD_ID
    //% pin.defl="0"
    //% useEnumVal=1 blockGap="8"
    export function digitalPin(pin: DigitalPin): number {
        switch (pin) {
            case DigitalPin.D0: return 0;
            case DigitalPin.D1: return 1;
            case DigitalPin.D2: return 2;
            case DigitalPin.D3: return 3;
            case DigitalPin.D4: return 4;
            case DigitalPin.D5: return 5;
        }
        return 0;
    }

    /**
     * Get the id of a AnalogPin.
     * @param pin the analog pin, eg: AnalogPin.D0
     */
    //% weight=1 help=pins/analog-pin
    //% blockId=analog_pin block="%pin"
    //% shim=TD_ID
    //% pin.defl="0"
    //% useEnumVal=1
    export function analogPin(pin: AnalogPin): number {
        switch (pin) {
            case AnalogPin.A0: return 0;
            case AnalogPin.A1: return 1;
            case AnalogPin.A2: return 2;
            case AnalogPin.A3: return 3;
            case AnalogPin.A4: return 4;
            case AnalogPin.A5: return 5;
        }
        return 0;
    }
}

interface Buffer {
    [index: number]: number;
    // rest defined in buffer.cpp
}