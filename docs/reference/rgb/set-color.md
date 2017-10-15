# set Color

Set the color of the RGB LED to the color you want.

```sig
rgb.setColor(0)
```

You can pick one of the built-in colors to set for the RGB LED:

```block
rgb.setColor(Colors.Orange)
```

Or, you can make an RGB color of your own:

```block
rgb.setColor(rgb.rgb(128, 45, 89))
```

## Parameters

* **rgb**: the color you want the RGB LED to show. This is an [RGB](/reference/rgb/rgb) value.

## Example

Make a pretend stop light with the RGB LED.

```blocks
loops.forever(function() {
    rgb.setColor(Colors.Green)
    loops.pause(5000)
    rgb.setColor(Colors.Yellow)
    loops.pause(1500)
    rgb.setColor(Colors.Red)
    loops.pause(5000)
})
```

## See also

[``||rgb||``](/reference/rgb/rgb)