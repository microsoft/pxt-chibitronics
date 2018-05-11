# pressed

See if a pin was pressed on or not.

```sig
sensing.pressed(DigitalPin.D0)
```

## Example

If pin `D0` is pressed, show a phaser on all the other pin LEDs.

```blocks
forever(function () {
    if (sensing.pressed(DigitalPin.D0)) {
        for (let i = 0; i <= 4; i++) {
            lights.set(i + 1, 1)
            pause(50)
        }
        for (let i = 0; i <= 4; i++) {
            lights.set(i + 1, 0)
        }
    }
    pause(100)
})
```