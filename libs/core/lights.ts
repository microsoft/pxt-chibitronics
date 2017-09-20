
namespace lights {

    /**
      * Set a pin or connector value 1
      * @param name pin to write to, eg: DigitalPin.D0
      */
    //% help=lights/on weight=29
    //% blockId=lights_digital_on block="set ON|%name=digital_pin" blockGap="8"
    export function on(name: number) {
        pins.pinMode(name, PinMode.Output);
        pins.digitalWrite(name, 1);
    }

    /**
      * Set a pin or connector value 0
      * @param name pin to write to, eg: DigitalPin.D0
      */
    //% help=lights/off weight=28
    //% blockId=lights_digital_off block="set OFF|%name=digital_pin"
    export function off(name: number) {
        pins.pinMode(name, PinMode.Output);
        pins.digitalWrite(name, 0);
    }

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 100.
     * @param name pin name to write to, eg: AnalogPin.A0
     * @param value value to write to the pin between ``0`` and ``100``. eg:100,0
     */
    //% help=lights/set weight=24
    //% blockId=lights_analog_set block="set|%name=analog_pin|to %value"
    //% value.min=0 value.max=100
    export function set(name: number, value: number) {
        pins.analogPinMode(name, PinMode.Output);
        pins.analogWrite(name, Math.map(value, 0, 100, 0, 1023));
    }
}