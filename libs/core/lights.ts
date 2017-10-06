
/**
 * Pre-defined effects
 */
enum Effect {
    //% blockImage=1
    //% blockIdentity=lights.effectPicker
    Twinkle = 0,
    //% blockImage=1
    //% blockIdentity=lights.effectPicker
    Heartbeat = 1,
    //% blockImage=1
    //% blockIdentity=lights.effectPicker
    Blink = 2
}

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

        /**
         * Show a predefined effect on the specified pin
         * @param name pin name to write to, eg: AnalogPin.A0
         * @param value effect to show, eg: Effect.Twinkle
         */
        //% help=lights/animate weight=22
        //% blockId=lights_effect block="show %value=lights_effectPicker| effect on %name=analog_pin"
        export function effect(value: number, name: number, tempo?: number) {
            switch(value) {
                case 0: // Twinkle
                    twinkle(name, tempo);
                    break;
                case 1: // Heartbeat
                    heartbeat(name, tempo);
                    break;
                case 2: // Blink
                    blink(name, tempo);
                    break;
            }
        }

        //% blockId=lights_effectPicker block="%value"
        //% value.fieldEditor="imagedropdown" value.fieldOptions.columns=3
        //% value.fieldOptions.decompileLiterals=true
        //% shim=TD_ID blockHidden=1
        export function effectPicker(value: Effect): number {
            return value;
        }

        export function heartbeat(pin: AnalogPin, tempo = 12) {
            let current = 0;
            if (tempo > 12)
                tempo = 12;

            current = fade_to(current, 0xc0, 2, pin, 1);
            current = fade_to(current, 0x4, 2, pin, 1);
            loops.pause(80); // fastest rate
            loops.pause((13 - tempo) * 15);
            //delay(180);
            current = fade_to(current, 0xff, 2, pin, 1);
            current = fade_to(current, 0x00, 2, pin, 1);
            loops.pause(214); // fastest rate
            loops.pause((13 - tempo) * 37);
            //delay(420);
        }

        export function twinkle(pin: AnalogPin, tempo = 5) {
            let current = 128;
            while (1) {
                current = fade_to(current, Math.randomRange(0, 255), tempo, pin, 3);
            }
        }

        export function blink(pin: AnalogPin, tempo = 4) {
            fade_to(0, 255, tempo, pin, 7);
            fade_to(255, 0, tempo, pin, 7);
        }

        function fade_to(current: number, target: number, rate: number, pin: AnalogPin, pause: number) {
            while (Math.abs(current - target) > rate) {
                pins.analogWrite(pin, current);
                current = current + ((target - current) > 0 ? rate : - rate);
                loops.pause(pause);
            }
            return current;
        }
    }