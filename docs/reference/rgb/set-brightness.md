# set Brightness

Set the brightness of the RGB LED for the next color change.

```sig
rgb.setBrightness(15)
```

The next color set for the RGB LED can have a different brightness. You can decide on a brightness for the LED from `0` to `100` percent. A `0` value is totally dark and `100` is completely bright.

Using ``||set brightness||`` now won't change the brightness of the current color on the LED. It works the next time you use ``||set color||``.

## Parameter

* **brightness**: the brightness for the next color shown on the RGB LED. This is a percentage [number](/types/number) between `0` and `100`.

## Example

Set the RBG LED to have a `pink` color. Then, pulse the `pink` color by changing the brightness to `30` percent and back to `100` percent.

```blocks
rgb.setColor(Colors.Pink)
loops.forever(function() {
    loops.pause(1000)
    rgb.setBrightness(30)
    rgb.setColor(Colors.Pink)
    loops.pause(1000)
    rgb.setBrightness(100)
    rgb.setColor(Colors.Pink)
})
```

[``||set color||``](/reference/rgb/set-color)