
namespace sensing {

    /**
     * Check a pin or connector is touched or connected.
     * @param name pin to read from, eg: DigitalPin.D0
     */
    //% help=sensing/pressed weight=30
    //% blockId=sensing_pressed block="is|%name=digital_pin|%value"
    export function pressed(name: number, value: PulseValue = PulseValue.High): boolean {
        pins.pinMode(name, PinMode.Input);
        const readValue = pins.digitalRead(name);
        switch(value) {
            case PulseValue.High: return readValue > 0;
            case PulseValue.Low: return readValue == 0;
        }
        return false;
    }

    /**
     * Read a pin or connector as an analog value between 0 and 100.
     * @param name pin to write to, eg: AnalogPin.A0
     */
    //% help=sensing/read weight=25
    //% blockId=sending_read block="read level|%name=analog_pin"
    export function read(name: number): number {
        pins.analogPinMode(name, PinMode.Input);
        return Math.map(pins.analogRead(name), 0, 1023, 0, 100);
    }
}