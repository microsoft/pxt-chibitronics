#include "pxt.h"

enum class DigitalPin {
    D0 = 0xa0,
    D1 = 0xa1,
    D2 = 0xa2,
    D3 = 0xa3,
    D4 = 0xa4,
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
    //% block="high"
    High = 1,
    //% block="low"
    Low = 0
};

enum class PinPullMode {
    //% block="up"
    PullUp = 1,
    //% block="none"
    PullNone = 2
};

namespace pins {
    /**
     * Read the specified pin or connector as either 0 or 1
     * @param name pin to read from, eg: DigitalPin.P0
     */
    //% help=pins/digital-read-pin weight=30
    //% blockId=device_get_digital_pin block="digital read|pin %name" blockGap=8
    int digitalReadPin(DigitalPin name) {
        ::pinMode((int)name, 0);
        return ::digitalRead((int)name);
    }

    /**
      * Set a pin or connector value to either 0 or 1.
      * @param name pin to write to, eg: DigitalPin.P0
      * @param value value to set on the pin, 1 eg,0
      */
    //% help=pins/digital-write-pin weight=29
    //% blockId=device_set_digital_pin block="digital write|pin %name|to %value"
    void digitalWritePin(DigitalPin name, int value) {
        ::pinMode((int)name, 1);
        ::digitalWrite((int)name, value);
    }

    /**
     * Read the connector value as analog, that is, as a value comprised between 0 and 1023.
     * @param name pin to write to, eg: AnalogPin.P0
     */
    //% help=pins/analog-read-pin weight=25
    //% blockId=device_get_analog_pin block="analog read|pin %name" blockGap="8" 
    int analogReadPin(AnalogPin name) {
        ::pinMode((int)name, 0);
        return ::analogRead((int)name);
    }

    /**
     * Set the connector value as analog. Value must be comprised between 0 and 1023.
     * @param name pin name to write to, eg: AnalogPin.P0
     * @param value value to write to the pin between ``0`` and ``1023``. eg:1023,0
     */
    //% help=pins/analog-write-pin weight=24
    //% blockId=device_set_analog_pin block="analog write|pin %name|to %value" blockGap=8
    void analogWritePin(AnalogPin name, int value) { 
        ::pinMode((int)name, 1);
        ::analogWrite((int)name, value);
    }
}