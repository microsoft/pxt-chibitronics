#include "pxt.h"

enum class DigitalPin {
    //% blockIdentity=lights.pin enumval=0
    D0 = 0xa0,
    //% blockIdentity=lights.pin enumval=1
    D1 = 0xa1,
    //% blockIdentity=lights.pin enumval=2
    D2 = 0xa2,
    //% blockIdentity=lights.pin enumval=3
    D3 = 0xa3,
    //% blockIdentity=lights.pin enumval=4
    D4 = 0xa4,
    //% blockIdentity=lights.pin enumval=5
    D5 = 0xa5,
};

enum class AnalogPin {
    A0 = 0x80,
    A1 = 0x81,
    A2 = 0x82,
    A3 = 0x83,
    A4 = 0x84,
    A5 = 0x85,
    //% block="temperature sensor"
    ATEMP = 0x86,
    //% block="1.0V sensor"
    AV1p0 = 0x87,
    //% block="vdd voltage"
    AVDD = 0x88,
    //% block="vcc voltage"
    AVCC = 0x89,
    //% block="audio"
    AAUDIO = 0x8a,
};

enum class PulseValue {
    //% block="HIGH"
    High = 1,
    //% block="LOW"
    Low = 0
};

enum class PinMode {
    //% block="INPUT"
    Input = 0,
    //% block="OUTPUT"
    Output = 1,
    //% block="PULL UP"
    PullUp = 2,
    //% block="PULL DOWN"
    PullDown = 3
};

namespace pins {

    /**
      * Set a pin or connector value to the value
      * @param name pin to write to, eg: DigitalPin.D0
      */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="digital write pin |%name=digital_pin|to %value"
    void digitalWritePin(int name, int value) {
        ::digitalWrite(name, value);
    }

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.A0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="analog write pin |%name=analog_pin|to %value"
    void analogWritePin(int name, int value) { 
        ::analogWrite(name, value);
    }

    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.D0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="digital read pin |%name=digital_pin" blockGap=8
    int digitalReadPin(int name) {
        return ::digitalRead(name);
    }

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.A0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="analog read pin |%name=analog_pin" blockGap="8" 
    int analogReadPin(int name) {
        return ::analogRead(name);
    }

    /**
    * Set the pin mode.
    * @param name pin to set the mode on, eg: DigitalPin.D0
    * @param mode one of the pin modes: Input, Output, PullUp, PullDown
    */
    //% help=pins/set-mode weight=5
    //% blockId=device_set_mode block="set pin |mode %pin=digital_pin|to %mode" blockGap="8" 
    void setPinMode(int name, PinMode mode) {
        ::pinMode(name, (int)mode);
    }

    /**
    * Set the pin mode.
    * @param name pin to set the mode on, eg: AnalogPin.A0
    * @param mode one of the pin modes: Input, Output, PullUp, PullDown
    */
    //% help=pins/set-mode weight=4
    //% blockId=device_set_analog_mode block="set analog pin |mode %pin=analog_pin|to %mode"
    void setAnalogPinMode(int name, PinMode mode) {
        ::pinMode(name, (int)mode);
    }

}