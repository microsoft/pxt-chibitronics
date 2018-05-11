# dim

Dim the brightness of an RGB color value.

```sig
rgb.dim(0, 1)
```

You can make a new RGB color that is a dimmer version of another one. The brightness of the color
you give is reduced by the _dim level_ that you want. The dim levels go from `0` to `5`. A level of `0` makes the new color that has the same brightness (no dimming). A level of `5` is the maximum amount of dimming.

Each level of dimming makes the new color have half of the brightness. So, a dim level of `1` is half as bright, a dim level of `2` is one-fourth as bright, and so on.

If you give a dim level that is less than `0`, your dim level is set to be just `0`. Also, if you give a dim level more than `5`, your dim level is set to be just `5`. 

## Parameters

* **rgb**: the RGB color that will get dimmed.
* **level**: a [number](/types/number) that is the dim level, a value between `0` and `5`.

## Returns

* an RGB color value that is dimmed from the value in **rgb**.

## Example

Slowly dim the blue light of the RGB LED by each dim level.

```blocks
for (let level = 0; level <= 5; level++) {
    rgb.setColor(rgb.dim(Colors.Blue, level))
    pause(2000)
}
```

[``||rgb||``](/reference/rgb/dim)