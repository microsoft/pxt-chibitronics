# Blinky

Flash the LEDs every half second.

```blocks
loops.forever(function () {
    lights.turn(DigitalPin.D0, 1)
    loops.pause(1000)
    lights.turn(DigitalPin.D0, 0)
    loops.pause(1000)
})
```
