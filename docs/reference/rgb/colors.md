# colors

Get an RGB color value for the built-in colors.

```sig
rgb.colors(Colors.Red)
```

## Paramters

* **color**: the color name of a built-in color. The colors you can choose are:
> `red`, `orange`, `yellow`, `green`, `blue`, `indigo`, `violet`, `purple`, `pink`, `white`, `black`

## Returns

* an RGB color value for a built-in color.

## Example

Get the RGB values for `yellow` and `blue` Set the colors on the RGB LED.

```blocks
let nowColor = rgb.colors(Colors.Black)
loops.forever(function() {
    nowColor = rgb.colors(Colors.Yellow)
    setNowColor()
    loops.pause(1000)
    nowColor = rgb.colors(Colors.Blue)
    setNowColor()
    loops.pause(1000)

})

function setNowColor() {
    rgb.setColor(nowColor)
}
```