// Auto-generated. Do not edit.


    /**
     * Provides access to Chibi Scope functionality.
     */
    //% color=#00b295 weight=70 icon="\uf27b"
declare namespace scope {

    /**
     * Write string to the Chibi Scope
     * @param message the message you want to write to the Chibi Scope, eg: "Hello!"
     */
    //% blockId="serial_write_line" block="say message %message"
    //% weight=90 help="scope/write-line" shim=scope::writeLine
    function writeLine(message: string): void;

    /**
     * Write number to the Chibi Scope
     * @param num the number you want to write to the Chibi Scope, eg: 0
     */
    //% blockId="serial_write_number" block="say number %num"
    //% weight=85 help="scope/write-number" shim=scope::writeNumber
    function writeNumber(num: int32): void;
}

// Auto-generated. Do not edit. Really.
