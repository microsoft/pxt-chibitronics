
namespace sensing {

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.D0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=sensing_pressed block="is|%name| ON?"
    export function pressed(name: DigitalPin): number {
        pins.setPinMode(name, PinMode.Input);
        return pins.digitalReadPin(name);
    }

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.A0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=sending_read block="read analog|%name"
    export function read(name: AnalogPin): number {
        pins.setAnalogPinMode(name, PinMode.Input);
        return pins.analogReadPin(name);
    }
}