# forever

Run a part of the program in the background and keep running it over again.

```sig
forever(function() {
})
```

The code you have in a ``||forever||`` loop will run and keep repeating itself the whole time your
program is active. Code in other parts of your program won't stop while your ``||forever||``
loop is running. This includes other ``||forever||`` loops too.

## Parameters

* **a**: the code to keep running over and over again.

## Example

Rotate a the LEDs by turning them on and off in sequence.

```blocks
let lightSpot = 0;
forever(() => {
    if (lightSpot == 6) {
        lightSpot = 0;
    }
    lights.set(lightSpot, 1)
    pause(500)
    lights.set(lightSpot, 0)
    lightSpot++
})
```

## See also

[``||while||``](/blocks/loops/while), [``||repeat||``](/blocks/loops/repeat)