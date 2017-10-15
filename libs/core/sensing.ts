
namespace sensing {

    /**
     * Check a pin or connector is touched or connected.
     * @param name pin to read from, eg: DigitalPin.D0
     */
    //% help=sensing/pressed weight=30
    //% blockId=sensing_pressed block="is|%name=digital_pin|ON?"
    export function pressed(name: number): boolean {
        pins.pinMode(name, PinMode.Input);
        return pins.digitalRead(name) > 0 ? true : false;
    }

    /**
     * Read a pin or connector as an analog value between 0 and 100.
     * @param name pin to write to, eg: AnalogPin.A0
     */
    //% help=sensing/read weight=25
    //% blockId=sending_read block="read analog|%name=analog_pin"
    export function read(name: number): number {
        pins.analogPinMode(name, PinMode.Input);
        return Math.map(pins.analogRead(name), 0, 255, 0, 100);
    }
}