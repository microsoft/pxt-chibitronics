# Basic Switch

A basic switch example using events

```blocks
sensing.onPinEvent(DigitalPin.D5, PinEvent.Pressed, function () {
    lights.set(DigitalPin.D0, 1)
})
sensing.onPinEvent(DigitalPin.D5, PinEvent.Released, function () {
    lights.set(DigitalPin.D0, 0)
})
```