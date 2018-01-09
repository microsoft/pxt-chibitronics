# read

Read an analog pin value as a percentage of total possible input.

```sig
sensing.read(AnalogPin.A0)
```
The input on the pin is read as a percentage of the total voltage possible. So, if the pin can have a maximum of +3V but there is only +1V of signal on the pin, then a value of `33` is returned.

## Parameters

* **name**: the name of the pin to read the input percentage value from.

## Returns

* a [number](/types/number) which is between `0` and `100` as a percentage of total possible input.

## Example

If the value at pin `A0` is greater than 50, light the LED at pin `D4`.

```blocks
loops.forever(function() {
    if (sensing.read(AnalogPin.A0) > 50) {
        lights.set(DigitalPin.D4, 1)
    } else {
        lights.set(DigitalPin.D4, 0)
    }
    loops.pause(100)
})
```

## See also

[analog read](/reference/pins/analog-read)