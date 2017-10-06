
namespace sensing {

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.D0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=sensing_pressed block="is|%name=digital_pin|ON?"
    export function pressed(name: number): boolean {
        pins.pinMode(name, PinMode.Input);
        return pins.digitalRead(name) > 0 ? true : false;
    }

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 100.
     * @param name pin to write to, eg: AnalogPin.A0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=sending_read block="read analog|%name=analog_pin"
    export function read(name: number): number {
        pins.analogPinMode(name, PinMode.Input);
        return Math.map(pins.analogRead(name), 0, 1023, 0, 100);
    }
}