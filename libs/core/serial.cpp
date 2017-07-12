#include "pxt.h"
#include "ltc.h"

/**
 * Provides access to Chibi Scope functionality.
 */
//% color=#CF63CF weight=80 icon="\uf00a"
namespace scope {

    /**
     * Write string to the Chibi Scope
     * @param message the message you want to write to the Chibi Scope, eg: Hello World
     */
    //% blockId="serial_write_line" block="say %message"
    //% weight=90 help="serial/write-line"
    void writeLine(StringData *s) {
        printf("\n%s\n", s->data);
    }
}