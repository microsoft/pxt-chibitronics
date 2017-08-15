# Light cascade, keep going...

## Step 4: Make the blocks to control each LED

Ok, we already have the ``||loops:forver||`` block for LED 0. It looks like this:

```blocks
let brightness_0 = 0
loops.forever(function () {
    while (brightness_0 <= 255) {
        lights.set(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 + 10 
    }
    while (brightness_0 >= 0) {
        lights.set(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 - 10
    }
    loops.pause(1500)
})
```
Instead of repeating the same steps that we did with LED 0 for each of the other LEDs, let's just copy the ``||loops:forver||`` block for LED 0 change a few things inside. You'll do this for each of the LEDs.

### ~hint
**Copying blocks**

You can duplicate (copy) a whole block by right-clicking on the block and choosing _duplicate_. An exact copy is created and shows up in your workspace. You drag the new copy to someplace in the editor where you want put it and click to release.
### ~

The ``||loops:forver||`` blocks for each LED have some differences from each other. Carefully follow the steps for each so that the LEDs will work in the right way.

### Controlling LED 1

Make the ``||loops:forver||`` block for LED 1:

1. Duplicate the ``||loops:forever||`` block for LED 0 to make a new block for LED 1.
2. In the new block, change each variable name of ``brightness_0`` to ``brightness_1``.
3. Add a ``||loops:pause||`` to the BEGINNING of the ``||loops:forever||`` loop set it to `600` milliseconds.
4. Change the ``||loops:pause||`` at the END of the ``||loops:forever||`` loop to `900` milliseconds.

```blocks
let brightness_1 = 0
loops.forever(function () {
    loops.pause(300)
    while (brightness_1 <= 255) {
        lights.set(DigitalPin.D1, brightness_1)
        loops.pause(15)
        brightness_1 = brightness_1 + 10 
    }
    while (brightness_1 >= 0) {
        lights.set(DigitalPin.D1, brightness_1)
        loops.pause(15)
        brightness_1 = brightness_1 - 10
    }
    loops.pause(1200)

})
```

### Controlling LED 2

Make the ``||loops:forver||`` block for LED 2:

1. Duplicate the ``||loops:forever||`` block for LED 1 to make a new block for LED 2.
2. In the new block, change each variable name of ``brightness_1`` to ``brightness_2``.
3. Change the ``||loops:pause||`` at the BEGINNING of the ``||loops:forever||`` loop to `600` milliseconds.
4. Change the ``||loops:pause||`` at the END of the ``||loops:forever||`` loop to `900` milliseconds.

```blocks
let brightness_2 = 0
loops.forever(function () {
    loops.pause(600)
    while (brightness_2 <= 255) {
        lights.set(DigitalPin.D2, brightness_2)
        loops.pause(15)
        brightness_2 = brightness_2 + 10 
    }
    while (brightness_2 >= 0) {
        lights.set(DigitalPin.D2, brightness_2)
        loops.pause(15)
        brightness_2 = brightness_2 - 10
    }
    loops.pause(900)

})
```

### Controlling LED 3

Make the ``||loops:forver||`` block for LED 3:

1. Duplicate the ``||loops:forever||`` block for LED 2 to make a new block for LED 3.
2. In the new block, change each variable name of ``brightness_2`` to ``brightness_3``.
3. Change the ``||loops:pause||`` at the BEGINNING of the ``||loops:forever||`` loop to `900` milliseconds.
4. Change the ``||loops:pause||`` at the END of the ``||loops:forever||`` loop to `1200` milliseconds.

```blocks
let brightness_3 = 0
loops.forever(function () {
    loops.pause(900)
    while (brightness_3 <= 255) {
        lights.set(DigitalPin.D3, brightness_3)
        loops.pause(15)
        brightness_3 = brightness_3 + 10 
    }
    while (brightness_3 >= 0) {
        lights.set(DigitalPin.D3, brightness_3)
        loops.pause(15)
        brightness_3 = brightness_3 - 10
    }
    loops.pause(600)

})
```

### Controlling LED 4

Make the ``||loops:forver||`` block for LED 4:

1. Duplicate the ``||loops:forever||`` block for LED 3 to make a new block for LED 4.
2. In the new block, change each variable name of ``brightness_3`` to ``brightness_4``.
3. Change the ``||loops:pause||`` at the BEGINNING of the ``||loops:forever||`` loop to `1200` milliseconds.
4. Change the ``||loops:pause||`` at the END of the ``||loops:forever||`` loop to `300` milliseconds.

```blocks
let brightness_4 = 0
loops.forever(function () {
    loops.pause(1200)
    while (brightness_4 <= 255) {
        lights.set(DigitalPin.D4, brightness_4)
        loops.pause(15)
        brightness_4 = brightness_4 + 10 
    }
    while (brightness_4 >= 0) {
        lights.set(DigitalPin.D4, brightness_4)
        loops.pause(15)
        brightness_4 = brightness_4 - 10
    }
    loops.pause(300)
})
```

### Controlling LED 5

Make the ``||loops:forver||`` block for LED 5:

1. Duplicate the ``||loops:forever||`` block for LED 4 to make a new block for LED 5.
2. In the new block, change each variable name of ``brightness_4`` to ``brightness_5``.
3. Change the ``||loops:pause||`` at the BEGINNING of the ``||loops:forever||`` loop to `1500` milliseconds.
4. Delete the ``||loops:pause||`` block at the END of the ``||loops:forever||`` loop.

```blocks
let brightness_5 = 0
loops.forever(function () {
    loops.pause(1500)
    while (brightness_5 <= 255) {
        lights.set(DigitalPin.D5, brightness_5)
        loops.pause(15)
        brightness_5 = brightness_5 + 10 
    }
    while (brightness_5 >= 0) {
        lights.set(DigitalPin.D5, brightness_5)
        loops.pause(15)
        brightness_5 = brightness_5 - 10
    }
})
```

## Finished

Good work! Now that you've completed your code, let's have it run and see happens. Do you see the fade in and fade out of each LED?
