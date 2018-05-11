# Blinky

Flash the LEDs every half second.

```blocks
forever(() => {
    lights.set(DigitalPin.D0, 1)
    pause(1000)
    lights.set(DigitalPin.D0, 0)
    pause(1000)
})
```