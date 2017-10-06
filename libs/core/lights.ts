namespace lights {
    
        /**
          * Set a pin or connector value 1
          * @param name pin to write to, eg: DigitalPin.D0
          */
        //% help=lights/on weight=29
        //% deprecated=true
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
        //% deprecated=true
        //% blockId=lights_digital_off block="set OFF|%name=digital_pin"
        export function off(name: number) {
            pins.pinMode(name, PinMode.Output);
            pins.digitalWrite(name, 0);
        }
    
        /**
          * Turn a pin or connector on or off, value 0 or 1
          * @param name pin to write to, eg: DigitalPin.D0
          * @param value 1 for on, 0 for off, eg: 1
          */
        //% help=lights/off weight=28
        //% value.defl="1"
        //% blockId=lights_digital_turn block="turn %name=digital_pin|%value=on_off"
        export function turn(name: number, value: number) {
            pins.pinMode(name, PinMode.Output);
            pins.digitalWrite(name, value > 0 ? 1 : 0);
        }
    
        /**
         * Get the toggle field editor
         * @param value on or off, 0 or 1, eg: 1
         */
        //% blockId=on_off block="%value"
        //% blockHidden=true
        //% shim=TD_ID colorSecondary="#FFFFFF"
        //% value.fieldEditor="toggle" value.fieldOptions.decompileLiterals=true
        export function onOff(value: number) {
            return value;
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