#include "pxt.h"
#include "ltc.h"

namespace scope {

    /* Shim for the OS call to set up the serial port. */
    __attribute__((naked))
    static void setSerialSpeed(unsigned long speed) {
        (void)speed;
        asm("svc #144");
    }

    static void serial_init() {
        static bool initialized = 0;
        if (initialized)
            return;
        initialized = 1;
        setSerialSpeed(9600);
    }

    /**
     * Write string to the Chibi Scope
     * @param message the message you want to write to the Chibi Scope, eg: "Hello!"
     */
    //% blockId="serial_write_line" block="say message %message"
    //% weight=90 help="scope/write-line"
    void writeLine(StringData *message) {
        serial_init();
        printf("%s\n", message->data);
    }


    /**
     * Write number to the Chibi Scope
     * @param num the number you want to write to the Chibi Scope, eg: 0
     */
    //% blockId="serial_write_number" block="say number %num"
    //% weight=85 help="scope/write-number"
    void writeNumber(int num) {
        serial_init();
        printf("%d\n", num);
    }
}