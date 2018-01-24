# Press for Color!

Change the colors of the RGB pixel by connecting a pin to ground.

Pin **0** changes the color of pixel **0** (on the Chibi Chip board).

```blocks
let RATE = 3 // a number larger than 1, less than 20, rate at which the colors change during pin press
let SATURATION = 100  // 0-100, 0 = no color, 100 = vivid colors    
let INTENSITY = 100  // 0-100, 0 = off, 100 = full brightness
let HUE_DEGREE = 512 // hue is 0 ... (360*HUE_DEGREE - 1)

let pinHue = 0;
let pinDir = RATE;
let hue = 0;
let s = 0;
let v = 0;
let c = 0;

pins.pinMode(DigitalPin.D0, PinMode.PullUp);

loops.forever(() => {
    if (pins.digitalRead(DigitalPin.D0) == 0) {
        pinHue += pinDir;
        if (pinHue >= HUE_DEGREE) {
            pinDir = -pinDir;
            pinHue = HUE_DEGREE - 1;
        } if (pinHue < 0) {
            pinDir = -pinDir;
            pinHue = 0;
        }
    }
    hue = Math.map(pinHue, 0, 1023, 0, HUE_DEGREE);
    hue = (360 * hue) - 1;
    s = Math.map(SATURATION, 0, 100, 0, 255);
    v = Math.map(INTENSITY, 0, 100, 0, 255);

    hsv2rgb();

    rgb.setColor(c)
    loops.pause(10);
})

// from https://gist.github.com/mity/6034000
function hsv2rgb( ) {
    let r = 0; 
    let g = 0;
    let b = 0;

    if (s == 0) {
        r = v; g = v; b = v;
    } else {
        let i = hue / (60 * HUE_DEGREE);
        let p = (256 * v - s * v) / 256;

        if (i % 2 == 1) {
            let q = (256 * 60 * HUE_DEGREE * v - hue * s * v + 60 * HUE_DEGREE * s * v * i) / (256 * 60 * HUE_DEGREE);
            if (i == 1) {
                r = q; g = v; b = p;
            } else if (i == 3) {
                r = p; g = q; b = v;
            } else if (i == 5) {
                r = v; g = p; b = q;
            }
        } else {
            let t = (256 * 60 * HUE_DEGREE * v + hue * s * v - 60 * HUE_DEGREE * s * v * (i + 1)) / (256 * 60 * HUE_DEGREE);
            if (i == 0) {
                r = v; g = t; b = p;
            } else if (i == 2) {
                r = p; g = v; b = t;
            } else if (i == 4) {
                r = t; g = p; b = v;
            }
        }
    }
    c = rgb.rgb(r, g, b)
}
```