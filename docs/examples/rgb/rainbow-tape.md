# Rainbow Tape

Watch the RGB LED show all the colors in the rainbow!

```blocks
loops.forever(() => {
    for (let j = 0; j < 256 * 5; j++) { // 5 cycles of all colors on wheel
        rgb.setColor(rgb.wheel(j % 256));
        loops.pause(20);
    }
})
```