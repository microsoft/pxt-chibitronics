# set
 
Set a digital pin on or off.

```sig
lights.set(DigitalPin.D0, 1)
```

## Parameters

* **name**: the digital pin that you what on or off.
* **value**: a [number](/types/number) that is either `1` for on or `0` for off.

## Example

Toggle the LEDs on pins `D0` and `D5` forever.

```blocks
forever(function () {
    lights.set(DigitalPin.D0, 1)
    lights.set(DigitalPin.D5, 0)
    pause(500)
    lights.set(DigitalPin.D0, 0)
    lights.set(DigitalPin.D5, 1)
    pause(500)
})
```

## See also

[set-level](/reference/lights/set-level)

