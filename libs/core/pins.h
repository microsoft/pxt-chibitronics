#ifndef PINS_H_
#define PINS_H_

enum class DigitalPin {
    //% blockIdentity=pins.digitalPin enumval=0
    D0 = 0xa0,
    //% blockIdentity=pins.digitalPin enumval=1
    D1 = 0xa1,
    //% blockIdentity=pins.digitalPin enumval=2
    D2 = 0xa2,
    //% blockIdentity=pins.digitalPin enumval=3
    D3 = 0xa3,
    //% blockIdentity=pins.digitalPin enumval=4
    D4 = 0xa4,
    //% blockIdentity=pins.digitalPin enumval=5
    D5 = 0xa5,
};

enum class AnalogPin {
    //% blockIdentity=pins.analogPin enumval=0
    A0 = 0x80,
    //% blockIdentity=pins.analogPin enumval=1
    A1 = 0x81,
    //% blockIdentity=pins.analogPin enumval=2
    A2 = 0x82,
    //% blockIdentity=pins.analogPin enumval=3
    A3 = 0x83,
    //% blockIdentity=pins.analogPin enumval=4
    A4 = 0x84,
    //% blockIdentity=pins.analogPin enumval=5
    A5 = 0x85,
    //% block="temperature sensor"
    ATEMP = 0x86,
    //% block="1.0V sensor"
    AV1p0 = 0x87
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

#endif /* PINS_H_ */