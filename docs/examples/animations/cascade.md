# Light cascade

## @description Create a cascade effect of LEDs from left to right

## ~avatar avatar

Using variables and while loops to create a cascade effect on your LEDs!

## ~

# Duration: 1 hour

## Blocks

```cards
while (true) {
}
loops.pause(0)
lights.setLevel(AnalogPin.A0, 0)
```

## Step 1: Creating your variables

We are going to control the brightness of each LED on the board in a special way. In this step, we create 5 different variables to control each LED. We'll be controlling each separately from each other!

Variables act as places to keep values that are changed and used many times. Let's make some variables now.

1. From **VARIABLES**, click **Make a Variable** and name it ``brightness_0``.
2. Do this 5 more times, using these names for the variables: ``brightness_1``,``brightness_2``, ``brightness_3``, ``brightness_4``, and ``brightness_5``.

## Step 2: Setting up your variables

The next thing we need to do is make a starting value for our variables. This allows our program to begin using our variables. Variables are nice because we don't have to type in an actual value, like `92` or `0`, every time we need our program to use a value. The variable holds the value for us. Handy!

1. From **CONTROL**, drag an ``||loops:on start||`` block into your workspace.
2. From **VARIABLES**, drag a ``||set||`` block into your ``||loops:on start||`` block.

```blocks
let item = 0
```

### Build the block...

From the dropdown in ``||set||``, select ``brightness_0`` to replace ``item``.

Setting ``brightness_0`` to `0` tells any code that uses the variable that the starting value is 0. Let's repeat this step for the other 5 variables you created earlier!

```blocks
let brightness_0 = 0
let brightness_1 = 0
let brightness_2 = 0
let brightness_3 = 0
let brightness_4 = 0
let brightness_5 = 0
``` 

## Step 3: Controlling LED 0

Now that the variables are properly defined, let's start coding the LED lights! we'll begin with the LED on the very left side.

1. From **CONTROL**, drag a ``||loops:forever||`` loop into your workspace.
2. From **CONTROL**, drag a ``||loops:while||`` loop and nest it inside your forever loop.

```blocks
loops.forever(function () {
    while (true) {
    }
})
``` 

### Build the block...

1. From **MATH**, drag a ``||math:(0 == 0)||`` into the place of the ``true`` of the while loop.
2. From **VARIABLES**, drag a ``brightness_0`` variable into the left side of the equation.
3. Change the sign from ``=`` to ``<=``.
4. Type in ``255`` for the righthand side.

Now that the while loop is set up, let's next make the loop do some work.

From **LIGHTS**, drag a ``||lights:set to||`` block into the while loop.

```blocks
let brightness_0 = 0
loops.forever(function () {
    while (brightness_0 <= 255) {
        lights.setLevel(AnalogPin.A0, 255)
    }
})
brightness_0 = 0
```

### Build the block...

1. From **PINS** under Advanced, drag a ``||pins:D0||`` block to replace the ``||pins:A0||`` inside your blue block. The ``||pins:D0||`` pin will control LED 0.
2. From **VARIABLES** drag a ``brightness_0`` into the right side of your ``||lights:set D0||`` block.
3. From **CONTROL**, drag a ``||loops:pause||`` block and place it under your ``||lights:set D0||`` block inside your ``||loops:while||`` loop. Change the value to ``15`` milliseconds.
4. From **VARIABLES**, drag a ``||set||`` block and place it under your ``||loops:pause||`` block.

```blocks
let brightness_0 = 0
let item = 0
loops.forever(function() {
    while (brightness_0 <= 255) {
        lights.setLevel(DigitalPin.D0, brightness_0)
        loops.pause(15)
        item = 0
    }
})
brightness_0 = 0
```

### Build the block...

1. Select ``brightness_0`` from the dropdown of variables to change ``item`` name in your variable.
2. From **MATH**, drag out a ``||math:0 + 0||`` block and place it inside the ``||set||`` block.
3. From **VARIABLES**, drag a ``brightness_0`` into the left side of your addition block.
4. Change the value of `0` on the right side to `10`.

```blocks
let brightness_0 = 0
loops.forever(function() {
    while (brightness_0 <= 255) {
        lights.setLevel(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 + 10
    }
})
brightness_0 = 0
```

Let's run the code now. What do you see? Does your first LED light up and fade in? To make it disappear, we'll need another ``||loops:while||`` loop that does almost the same thing, but have it run it with a different condition. Let's make an identical block to the one which does the fade in, but this time we'll need to change some values to have it fade out instead of fading in.

When you create your second ``||loops:while||`` loop, make sure it's still in your ``||loops:forever||`` loop under your previous ``||loops:while||`` loop.

Using nearly the same steps as above, we'll code the next block. There are some differences in the some of steps here compared to the steps above. Let's see what gets modified as we build the new block.

### Build the block...

1. Create another ``||loops:while||`` loop like you just did before.
2. Change the operation in the conditon from ``=`` to ``>=``.
3. Change the sign of for the addition of ``brightness_0`` to a subtraction, so that it reads ``brightness_0 - 10``.

```blocks
let brightness_0 = 0
while (brightness_0 >= 0) {
    lights.setLevel(DigitalPin.D0, brightness_0)
    loops.pause(15)
    brightness_0 = brightness_0 - 10
}
brightness_0 = 0
```
Run your code now. Does your LED fade in and out? Here's what the complete control block should look like!

```blocks
let brightness_0 = 0
loops.forever(function () {
    while (brightness_0 <= 255) {
        lights.setLevel(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 + 10
    }
    while (brightness_0 >= 0) {
        lights.setLevel(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 - 10
    }
})
brightness_0 = 0
```

We'll repeat the blocks we made to control LED 0 for every variable and every LED, so that we can have each light up. We'll make changes to each and insert some pause blocks to sequence the flashing of each LED so that they all work in succession.

Before moving on to code the next LEDs, let's add one more thing to our current code.

Inside the forever loop and under your ``||loops:while||`` loops, add a ``||loops:pause||`` block and type in ``1500`` for the value instead of ``100``.

```blocks
let brightness_0 = 0
loops.forever(function () {
    while (brightness_0 <= 255) {
        lights.setLevel(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 + 10
    }
    while (brightness_0 >= 0) {
        lights.setLevel(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 -10 
    }
    loops.pause(1500)
})
brightness_0 = 0
```

This seems like a long time to wait. But, to make sure the LED stays off and turns on only after every other LED has lit up, we need to have the loop pause temporarily until 1500 milliseconds (1.5 seconds) have gone by.

### ~button /examples/animations/cascade-next
NEXT: Control all LEDs
### ~