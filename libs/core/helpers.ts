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
