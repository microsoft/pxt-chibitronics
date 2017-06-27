# Rainbow Tape

```blocks
loops.forever(() => {
    for (let j = 0; j < 256 * 5; j++) { // 5 cycles of all colors on wheel
        rgb.setColor(rgb.wheel((256 + j) & 255));
        loops.pause(20);
    }
})
```