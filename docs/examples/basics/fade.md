# Fade

This example shows how to fade an LED.

Humans think in decimal, Computers think in binary. So:
- When picking a brightness, a human might prefer a scale of 1-100
- When picking a brightness, a computer might prefer a scale of 0-255

The Chibi Chip is a computer, so we tell it brightnesses on a scale of 0-255.

```blocks
let brightness = 0
let fadeAmount = 0
loops.forever(() => {
    lights.setLevel(AnalogPin.A5, brightness)
    brightness = brightness + fadeAmount
    if (brightness <= 0 || brightness >= 255) {
        fadeAmount = 0 - fadeAmount
    }
    // pause for 30 milliseconds, or else the effect is
    // too fast
    loops.pause(30)
})
fadeAmount = 5
brightness = 0
```