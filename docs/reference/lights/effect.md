# effect

Show a light effect at the pin you want.

```sig
lights.effect(Effect.Twinkle, AnalogPin.A0)
```

You can choose to have a light effect, like blink or pulse, happen on the LED at a pin.

## Parameters

* **value**: the effecy you want for the LED. You can choose:
>`Twinkle`, `Heartbeat`, `Blink`, or `SOS`
* **name**: the pin with the LED you want to see the effect on, like `A2`.
* **tempo**: the rate of how the effect changes in milliseconds. This is optional.

## Example

If pin `A0` is pressed, then show the `SOS` effect at pin `A2`,

```blocks
loops.forever(function () {
    loops.pause(100)
    if (sensing.pressed(DigitalPin.D0)) {
        lights.effect(Effect.SOS, AnalogPin.A2)
    }
})
```

## See also

[turn](/reference/lights/turn)
