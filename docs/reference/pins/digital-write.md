# digital Write

Write a value of `0` or `1` to a digital pin.

```sig
pins.digitalWrite(DigitalPin.D0, 0)
```

Digital pins write one of two values: `0` or `1`. Often the `0` means something connected
to the pin is turned **off** or its status is `0`. In a similar way, `1` means something
connected to the pin is **on** or has a status of `1`.

The value from the last ``||pins:digital write||`` stays at the pin until another ``||pins:digital write||``
happens.

## Parameters

* **value**: a [number](/types/number) value that is either `0` or `1`. The meaning of the value depends on how something connected to the pin behaves when it gets the new value.

## Example

Light an LED that is connected to pin `D4`. You write the value `1` to the pin.

```blocks
pins.digitalWrite(DigitalPin.D4, 1)
```

## See Also

[``||pins:digital read||``](/reference/pins/digital-read)