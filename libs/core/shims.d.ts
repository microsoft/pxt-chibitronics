// Auto-generated. Do not edit.


    /**
     * Provides access to basic functionality.
     */
    //% color=#FFAB19 weight=100 icon="\uf00a"
declare namespace loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=control/forever weight=55 blockAllowMultiple=1 afterOnStart=true
    //% blockId=device_forever block="forever" icon="\uf01e" shim=loops::forever
    function forever(a: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=control/pause weight=54
    //% async block="pause %ms=timePicker|ms"
    //% blockId=device_pause icon="\uf110" shim=loops::pause
    function pause(ms: int32): void;
}
declare namespace sensing {

    /**
     * Do something when a pin is touched (while also touching the +3.3V pin).
     * @param name the pin that needs to be pressed, eg: DigitalPin.D0
     * @param body the code to run when the pin is pressed
     */
    //% help=sensing/on-pin-event weight=90
    //% blockId=device_pin_event block="when %name=digital_pin|is %event" shim=sensing::onPinEvent
    function onPinEvent(name: int32, ev: PinEvent, body: () => void): void;
}
declare namespace pins {

    /**
     * Set a pin or connector value to the value
     * @param name pin to write to, eg: DigitalPin.D0
     */
    //% help=pins/digital-write weight=29
    //% blockId=device_set_digital_pin block="digital write |%name=digital_pin|to %value"
    //% value.min=0 value.max=1 shim=pins::digitalWrite
    function digitalWrite(name: int32, value: int32): void;

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.A0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write weight=24
    //% blockId=device_set_analog_pin block="analog write |%name=analog_pin|to %value"
    //% value.min=0 value.max=1023 shim=pins::analogWrite
    function analogWrite(name: int32, value: int32): void;

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.D0
     */
    //% help=pins/digital-read weight=30
    //% blockId=device_get_digital_pin block="digital read |%name=digital_pin" blockGap=8 shim=pins::digitalRead
    function digitalRead(name: int32): int32;

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.A0
     */
    //% help=pins/analog-read weight=25
    //% blockId=device_get_analog_pin block="analog read |%name=analog_pin" blockGap="8" shim=pins::analogRead
    function analogRead(name: int32): int32;

    /**
     * Set the digital pin mode.
     * @param name pin to set the mode on, eg: DigitalPin.D0
     * @param mode one of the pin modes: Input, Output, PullUp, PullDown
     */
    //% help=pins/pin-mode weight=5
    //% blockId=device_set_mode block="set pin |mode %pin=digital_pin|to %mode" blockGap="8" shim=pins::pinMode
    function pinMode(name: int32, mode: PinMode): void;

    /**
     * Set the analog pin mode.
     * @param name pin to set the mode on, eg: AnalogPin.A0
     * @param mode one of the pin modes: Input, Output, PullUp, PullDown
     */
    //% help=pins/analog-pin-mode weight=4
    //% blockId=device_set_analog_mode block="set analog pin |mode %pin=analog_pin|to %mode" shim=pins::analogPinMode
    function analogPinMode(name: int32, mode: PinMode): void;
}


    /**
     * Provides access to basic RGB LED functionality.
     */
    //% color=#CF63CF weight=80 icon="\uf00a"
declare namespace rgb {

    /**
     * Set the rgb led to a specific red, green, blue color.
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
    //% parts="rgbled" shim=rgb::setRGBLed
    function setRGBLed(r: int32, g: int32, b: int32): void;

    /**
     * Sets an RGB sticker led to a specific red, green, blue color.
     * @param name the pin name
     * @param index the lef index
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
    //% parts="rgbled" shim=rgb::setRGBStickerLed
    function setRGBStickerLed(name: int32, index: int32, r: int32, g: int32, b: int32): void;
}

// Auto-generated. Do not edit. Really.
