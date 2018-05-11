namespace Math {
    /**
     * Generates a `true` or `false` value randomly, just like flipping a coin.
     */
    //% blockId=logic_random block="pick random true or false"
    //% help=math/random-boolean color="#59C059"
    export function randomBoolean(): boolean {
        return Math.random() >= 0.5;
    }
}

/**
 * Repeats the code forever in the background. On each iteration, allows other codes to run.
 * @param body code to execute
 */
//% help=loops/forever weight=100 afterOnStart=true blockNamespace="loops"
//% blockId=device_forever block="forever" blockAllowMultiple=1
function forever(a: () => void): void {
    forever(a);
}

/**
 * Pause for the specified time in milliseconds
 * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
 */
//% help=loops/pause weight=99
//% async block="pause %pause=timePicker|ms"
//% blockId=device_pause blockNamespace="loops"
function pause(ms: number): void {
    pause(ms);
}