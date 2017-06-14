
namespace pxsim.rgb {

    export function setRGBLed(r: number, g: number, b: number): void {
        const led = board().neopixelState;
        const newColor = new Uint8Array(3);
        newColor[0] = g; // G and R and swapped
        newColor[1] = r;
        newColor[2] = b;
        led.updateBuffer(newColor, 0);
        runtime.queueDisplayUpdate();
    }
}