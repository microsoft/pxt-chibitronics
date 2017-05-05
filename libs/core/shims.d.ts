// Auto-generated. Do not edit.


    /**
     * Provides access to basic micro:bit functionality.
     */
    //% color=#0078D7 weight=100 icon="\uf00a"
declare namespace basic {

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=basic/forever weight=55 blockGap=8 blockAllowMultiple=1
    //% blockId=device_forever block="forever" icon="\uf01e" shim=basic::forever
    function forever(a: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="pause %pause ms"
    //% blockId=device_pause icon="\uf110" shim=basic::pause
    function pause(ms: number): void;
}
declare namespace pins {

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.P0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="is|%name ON?" blockGap=8 shim=pins::digitalReadPin
    function digitalReadPin(name: DigitalPin): number;

    /**
     * Set a pin or connector value to 0
     * @param name pin to write to, eg: DigitalPin.P0
     */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin_off block="set OFF|%name" shim=pins::digitalWritePinOff
    function digitalWritePinOff(name: DigitalPin): void;

    /**
     * Set a pin or connector value 1
     * @param name pin to write to, eg: DigitalPin.P0
     */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin_on block="set ON|%name" shim=pins::digitalWritePinOn
    function digitalWritePinOn(name: DigitalPin): void;

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.P0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="read analog|%name" blockGap="8" shim=pins::analogReadPin
    function analogReadPin(name: AnalogPin): number;

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.P0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="set|%name|to %value %" blockGap=8 shim=pins::analogWritePin
    function analogWritePin(name: AnalogPin, value: number): void;
}

// Auto-generated. Do not edit. Really.
