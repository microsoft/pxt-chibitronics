# pin Mode

Set the operation of a digital pin to either input or output.

```sig
pins.pinMode(DigitalPin.D0, PinMode.Input)
```

Digital pins can function as input pins (read signals) or output pins (write signals). They can't operate in both _modes_ at the same time though. So, if you want to make a pin read after it was set to write, you need to change the mode to `INPUT`. If you want to make a pin write after it was set to read, you need to change the mode to `OUTPUT`.

## Parameters

* **name**: the name of the digital pin to set the mode for, like `D5`.
* **mode**: the operation mode of the pin, either `INPUT` or `OUTPUT`.

## Example

Change the pin mode of `D5` after reading a value of `1`. Write a `0` on the same pin.

```blocks
if (pins.digitalRead(DigitalPin.D5) > 0) {
    pins.pinMode(DigitalPin.D5, PinMode.Output)
    pins.digitalWrite(DigitalPin.D5, 0)
}
```

## See also

[``||pins:analog pin mode||``](/reference/pins/analog-pin-mode)