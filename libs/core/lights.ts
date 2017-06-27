
namespace lights {

    /**
      * Set a pin or connector value 1
      * @param name pin to write to, eg: DigitalPin.D0
      */
    //% help=pins/digital-write-pin weight=29
    //% blockId=lights_digital_on block="set ON|%name" blockGap="8"
    export function on(name: DigitalPin) {
        pins.setPinMode(name, PinMode.Output);
        pins.digitalWritePin(name, 1);
    }

    /**
      * Set a pin or connector value 0
      * @param name pin to write to, eg: DigitalPin.D0
      */
    //% help=pins/digital-write-pin weight=28
    //% blockId=lights_digital_off block="set OFF|%name"
    export function off(name: DigitalPin) {
        pins.setPinMode(name, PinMode.Output);
        pins.digitalWritePin(name, 0);
    }

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.A0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=lights_analog_set block="set|%name|to %value" blockGap=8
    export function set(name: AnalogPin, value: number) {
        pins.setAnalogPinMode(name, PinMode.Output);
        pins.analogWritePin(name, value);
    }
}