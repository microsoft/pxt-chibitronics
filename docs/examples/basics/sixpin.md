# Six Pin Blink

Blinks every LED in sequence

```blocks
forever(function () {
lights.set(DigitalPin.D0, 1)
pause(1000)
lights.set(DigitalPin.D0, 0)
lights.set(DigitalPin.D1, 1)
pause(1000)
lights.set(DigitalPin.D1, 0)
lights.set(DigitalPin.D2, 1)
pause(1000)
lights.set(DigitalPin.D2, 0)
lights.set(DigitalPin.D3, 1)
pause(1000)
lights.set(DigitalPin.D3, 0)
lights.set(DigitalPin.D4, 1)
pause(1000)
lights.set(DigitalPin.D4, 0)
lights.set(DigitalPin.D5, 1)
pause(1000)
lights.set(DigitalPin.D5, 0)
})
```
