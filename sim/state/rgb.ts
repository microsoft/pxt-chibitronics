
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

    export function setRGBStickerLed(index: number, r: number, g: number, b: number): void {
        const state = board().rgbStickerState;
        const name = 1;
        state.setLED(name, index, r, g, b);
        runtime.queueDisplayUpdate();
    }
}

namespace pxsim {
    export class RGBStickerState {
        protected buffers: Uint8Array[] = [];
        protected lengths: number[] = [];
        protected colors: Map<RGBW[]> = {};
        protected dirty: Map<boolean> = {};

        public setLED(pin: number, index: number, r: number, g: number, b: number) {
            let buf = this.buffers[pin];

            if (!buf) buf = new Uint8Array(60);

            const start = index * 3;

            buf[start] = g;
            buf[start + 1] = r;
            buf[start + 2] = b;

            this.lengths[pin] = Math.max(this.lengths[pin] || 0, index + 1);

            this.updateBuffer(buf, pin);
        }

        public getColors(pin: number): RGBW[] {
            let outColors = this.colors[pin] || (this.colors[pin] = []);
            if (this.dirty[pin]) {
                let buf = this.buffers[pin] || (this.buffers[pin] = new Uint8Array([]));
                this.readNeoPixelBuffer(buf, outColors, NeoPixelMode.RGB, this.lengths[pin]);
                this.dirty[pin] = false;
            }
            return outColors;
        }

        usedPins(): number[] {
            const names: number[] = [];
            this.buffers.filter((buf, index) => {
                if (buf) names.push(index);
            })
            return names;
        }

        protected updateBuffer(buffer: Uint8Array, pin: number) {
            this.buffers[pin] = buffer;
            this.dirty[pin] = true;
        }

        private readNeoPixelBuffer(inBuffer: Uint8Array, outColors: RGBW[], mode: NeoPixelMode, pixelCount = 0) {
            let buf = inBuffer;
            let stride = mode === NeoPixelMode.RGBW ? 4 : 3;
            pixelCount = pixelCount || Math.floor(buf.length / stride);
            for (let i = 0; i < pixelCount; i++) {
                // NOTE: for whatever reason, NeoPixels pack GRB not RGB
                let r = buf[i * stride + 1]
                let g = buf[i * stride + 0]
                let b = buf[i * stride + 2]
                let w = 0;
                if (stride === 4)
                    w = buf[i * stride + 3]
                outColors[i] = [r, g, b, w]
            }
        }
    }
}