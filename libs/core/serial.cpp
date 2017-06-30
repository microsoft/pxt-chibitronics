#include "pxt.h"
#include "ltc.h"

/**
 * Provides access to serial functionality.
 */
//% color=#CF63CF weight=80 icon="\uf00a"
namespace serial {

    /**
     * Write string to serial
     * @param message the message you want to write to serial, eg: Hello World
     */
    //% blockId="serial_write_line" block="say %message"
    //% weight=90 help="serial/write-line"
    void writeLine(StringData *s) {
        printf("\n%s\n", s->data);
    }
}