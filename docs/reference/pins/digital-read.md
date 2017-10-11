# digital Read

Read a digital `0` or `1` from a pin.

```sig
pins.digitalRead(DigitalPin.D0)
```

Digital pins read one of two values: `0` or `1`. Often the `0` means something connected
to the pin is turned **off** or its status is `0`. In a similar way, `1` means something
connected to the pin is **on** or has a status of `1`.

## Returns

* a [number](/types/number) value that is either `0` or `1`. The meaning of the value depends on how something connected to the pin decides on what value to give.

## Example

See if a switch on your bread board is on or off. The switch is connected to pin `D4`. If
the switch is on, change the color of the RGB LED strip to `green`.

```blocks
let mySwitchOn = pins.digitalRead(DigitalPin.D4)
if (mySwitchOn > 0) {
    rgb.setColor(Colors.Green)
} else {
    rgb.setColor( Colors.Red)    
}
```

## See Also

[``||pins:digital write||``](/reference/pins/digital-write)