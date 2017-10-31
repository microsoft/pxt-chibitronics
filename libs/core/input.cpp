#include "pxt.h"
#include "ltc.h"
#include "pins.h"

//% color=#B4009E weight=99 icon="\uf192"
namespace input {

    static bool eventsRegistered = false;
    static struct {
        Action body;
        uint8_t event;
    } callbackTable[6];
    static void interruptHandler(void) {
        for (int i = 0; i < 6; i++) {
            if (digitalRead(i) && callbackTable[i].body) {
                runAction0(callbackTable[i].body);
            }
        }
    }
    static void registerEvent(DigitalPin name, Action body) {
        uint8_t event = ((int)name) & 0x7;
        callbackTable[event].body = body;
        callbackTable[event].event = event;

        if (!eventsRegistered) {
            attachInterrupt(PORTA_IRQ, interruptHandler, CHANGE);
            attachInterrupt(PORTB_IRQ, interruptHandler, CHANGE);
            eventsRegistered = true;
        }
    }

    /**
     * Do something when a pin is touched and released again (while also touching the GND pin).
     * @param name the pin that needs to be pressed, eg: TouchPin.P0
     * @param body the code to run when the pin is pressed
     */
    //% help=input/on-pin-pressed weight=83
    //% blockId=device_pin_event block="on pin %name|pressed"
    void onPinPressed(DigitalPin pin, Action body) {
        if (pin < DigitalPin::D0 || pin > DigitalPin::D5)
            return;

        // Switch the pin to an input, and rely on the Schmitt trigger.
        digitalRead((int)pin);

        registerEvent(pin, body);
    }

}