# wheel

Get an RGB color by picking a color wheel position.

```sig
rgb.wheel(99)
```

A color wheel is a way choosing a color by thinking that all the different colors have a place somewhere around a wheel. The wheel has `255` spots all around it. Each spot is a different color.
The numbers start at `0` on the top of the wheel and go around clockwise to the top again where `225` sits next to `0` on the top.

On the top of the wheel, `0` is light blue and next to it `255` which is also light blue. One-third the distance down the wheel on the right side is the `purple` color at `85`. The color `yellow` is two-thirds the distance around the wheel at `170`. All the other colors have there own place on the wheel somewhere in-between these colors.

## Parameters

* **wheelPos**: a [number](/types/number) which is a position on the RGB color wheel. This is a number between `0` and `255`.

## Returns

* an RGB color value for the color at the color wheel position.

## Example

Get the `yellow` RGB color from it's color wheel position. If it the color matches the built-in color value, flash the color on the RGB LED.

```blocks
let wheelColor = rgb.wheel(170)
if (wheelColor == rgb.colors(Colors.Yellow))
{
    for (let i = 0; i <= 3; i++) {
        rgb.setColor(wheelColor)
        pause(1000)
        rgb.setColor(rgb.colors(Colors.Black))
        pause(1000)
    }
}
```

## See also

[``||rgb||``](/reference/rgb/rgb), [``||colors||``](/reference/rgb/colors)