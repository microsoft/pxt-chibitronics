# analog Pin Mode

Set the operation of an analog pin to either input or output.

```sig
pins.analogPinMode(AnalogPin.A0, PinMode.Input)
```

Digital pins can function as input pins (read signals) or output pins (write signals). They can't operate in both _modes_ at the same time though. So, if you want to make a pin read after it was set to write, you need to change the mode to `INPUT`. If you want to make a pin write after it was set to read, you need to change the mode to `OUTPUT`.

## Parameters

* **name**: the name of the analog pin to set the mode for, like `A5`.
* **mode**: the operation mode of the pin, either `INPUT` or `OUTPUT`.

## Example

Change the pin mode of `A5` after reading a value of `64`. Write a value of `127` on the same pin.

```blocks
if (pins.analogRead(AnalogPin.A5) == 64) {
    pins.analogPinMode(AnalogPin.A5, PinMode.Output)
    pins.analogWrite(AnalogPin.A5, 127)
}
```

## See also

[``||pins:pin mode||``](/reference/pins/pin-mode)