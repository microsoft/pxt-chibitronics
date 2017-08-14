# Light Cascade

### @description Create a cascade effect of LEDs from left to right

### ~avatar avatar

Using variables and while loops, create a cascade effect of your LEDs!

### ~

# Duration: 1 hour

## Blocks

```cards
while (true) {
}
```

## Step 1: Creating your variables

In this step, we'll be creating 5 different variables to control each LED. We'll be controlling each separate from each other!

Variables act as placeholders of values that can be substituted many times into a function.

* From **VARIABLES**, click **Make a Variable** and name it ``brightness_0``.
* Repeat the following process 5 more times, naming your variables ``brightness_1``,``brightness_2``, ``brightness_3``, ``brightness_4``, and ``brightness_5``.

## Step 2: Setting up your variables

The next thing we need to do is define a value for our variables. This allows the system to run code using your variable in place of a value.

* From **CONTROL**, drag an **on start** block into your workspace.
* From **VARIABLES**, drag a **set item to** block into your **on start** loop.

```blocks
let item = 0
```

## Build the block...

* From the dropdown in **set**, select ``brightness_0`` to replace ``item``.

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

Now that the variables are properly defined, let's start coding the LED lights! Let's begin with the LED on the very left side.

* From **CONTROL**, drag a **forever** loop into your workspace.
* From **CONTROL**, drag a **while** loop and nest it inside your forever loop.

```blocks
let brightness_0 = 0 
loops.forever(function () {
    while (brightness_0 <= 255) {
    }
})
brightness_0 = 0 
``` 

## Build the block...

* From **MATH**, drag a **(0 == 0)** into the place of the ``true`` of the while loop.
* From **VARIABLES**, drag a **brightness_0** block into the lefthand side of the equation.
* Change the sign from ``=`` to ``<=``.
* Type in ``255`` for the righthand side.

Now that the while loop is set up, let's next make the loop do some work.

* From **LIGHTS**, drag a **set A0 to** block into the while loop.

```blocks
let brightness_0 = 0
loops.forever(function () {
    while (brightness_0 <= 255) {
        lights.set(AnalogPin.A0, 1023)
    }
})
brightness_0 = 0
```

## Build the block...

* From **PINS** under Advanced, drag a **D0** block to replace the **A0** inside your blue block. The **D0** will control LED 0.
* From **VARIABLES** drag a **brightness_0** into the righthand side of your **set D0** block.
* From **CONTROL**, drag a **pause** block and place it under your **set D0** block inside your while loop. Change the value to ``15`` milliseconds.
* From **VARIABLES**, drag a **set item to** block and place it under your pause block.

```blocks
let brightness_0 = 0
loops.forever(function() {
    while (brightness_0 <= 255) {
        lights.set(DigitalPin.D0, brightness_0)
        loops.pause(15)
        brightness_0 = brightness_0 + 10
    }
})
brightness_0 = 0
```
## Build the block...

* Select **brightness_0** from the dropdown of variables to change item into your variable.
* From **MATH**, drag out a **0 + 0** block and place it inside the **set item to** block.
* From **VARIABLES**, drag a **brightness_0** into your lefthand side of your addition block.
* Change the value of ``0`` on the righthand side to ``10``.

Let's run the code now- what do you see? Does your first LED light up in a fade in pattern? To make it disappear, we'll need to create the same kind of while loop, but run it on a different condition. Follow the steps previously to create an identical block, but we'll need to change some values so that instead of fading in, your LED fades out.

When you create your second while loop, make sure it's still in your forever loop under your previous while loop.

After following the code steps above, here's what your block should look like! There are some differences in the steps above compared to the steps below, so let's see what needs to be modified by looking at our block below and the instructions as well.

```blocks
let brightness_0 = 0
while (brightness_0 >= 0) {
    lights.set(DigitalPin.D0, brightness_0)
    loops.pause(15)
    brightness_0 = brightness_0 - 10
}
brightness_0 = 0
```
## Build the block...

* Change the sign from ``=`` to ``>=``.
* Change the sign of your addition to subtraction, so that it reads *brightness_0 - 10*.

Run your code now- does your LED fade in and out? Here's what your compiled code from Step 3 alone should look like!

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
})
brightness_0 = 0
```

We'll be repeating Step 3 for every variable and every LED, so that we can have each light up. However, we'll be making changes to each, as well as adding pause blocks along the way to time the flashing of each LED so that they come in succession.

Before moving on to our 2nd LED (D1), let's add one more thing to our code.

* Inside the forever loop and under your while loops, add a pause block and type in ``1500`` for the value instead of ``100``.

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
        brightness_0 = brightness_0 -10 
    }
    loops.pause(1500)
})
brightness_0 = 0
```

This may seem like a long time to wait, but to make sure it stays off and turns on only after every LED has lit up, we need to have the loop pause temporarily until 1500 milliseconds (1.5 seconds) have passed.

## Step 4: Controlling LED 1

Following Step 3, let's create the same forever loop with two while loops. In our code below, we won't be going step by step through how to step up each while loop, but we'll show you what needs to change in each loop!

Here's what your first while loop should look like:
```blocks
let brightness_1 = 0
loops.forever(function () {
    while (brightness_1 <= 255) {
        lights.set(DigitalPin.D1, brightness_1)
        loops.pause(15)
        brightness_1 = brightness_1 + 10
    }
})
brightness_1 = 0
``` 
## Some differences to notice...

* The **pin**, unlike Step 3, has been changed to ``D1`` instead of ``D0``.
* The **variable**, unlike Step 3, has changed to ``brightness_1`` instead of ``brightness_0``.

And your second while loop:

```blocks
let brightness_1 = 0
while (brightness_1 >= 0) {
        lights.set(DigitalPin.D1, brightness_1)
        loops.pause(15)
        brightness_1 = brightness_1 - 10
}
brightness_1 = 0
```
## Some differences to notice...

* The **pin** has been changed to ``D1`` instead of ``D0``.
* The **variable** has been changed to ``brightness_1``.

Great! Your second LED, D1, should fade in and out. The only thing we need to add to the beginning and the end of the forever loop is a set of pause blocks to make sure this LED lights up a little after your first LED you programmed in Step 3.

The first pause block stops this LED from lighting up at the same time of your first. Its timing is staggered so that while the first turns off, this begins to fade in. The pause block at the end will serve the same function as the one you used in Step 3 for D0, your first LED. You want to make sure your LEDs light up and light off in a left to right pattern!

* From **CONTROL**, drag a **pause** block to the *beginning* of your forever loop built in this step. Change the value to ``300``.
* From **CONTROL**, drag another **pause** block to the *bottom* of your forever loop built in this step. Change the value to ``1200``.

Here's what your code from Step 4 should look like!

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
brightness_1 = 0
```
## Step 5: Controlling LED 2

Now that two of your LEDs light up in succession with a pause built in afterwards to wait for the rest of your lights, let's work on your third LED. The steps to make this LED fade in and out are the same as the previous steps, so look back to Step 3 for a step-by-step instructions on how to build.

We'll again show what you need to change!

Here's what your first half of code should look like:

```blocks
let brightness_2 = 0 
loops.forever(function () {
    while (brightness_2 <= 255) {
        lights.set(DigitalPin.D2, brightness_2)
        loops.pause(15)
        brightness_2 = brightness_2 + 10 
    }
})
brightness_2 = 0
```
## Some differences to notice...

* The **pin**, unlike Step 3, has been changed to ``D2`` instead of ``D0``. 
* The **variable**, unlike Step 3, has changed to ``brightness_2`` instead of ``brightness_0``. 

And your second while loop: 
```blocks
let brightness_2 = 0
while (brightness_2 >= 0) {
        lights.set(DigitalPin.D2, brightness_2)
        loops.pause(15) 
        brightness_2 = brightness_2 -10 
    }
brightness_2 = 0
```
## Some differences to notice...
* The **pin** has been changed to ``D2`` instead of ``D0``.
* The **variable** has been changed to ``brightness_2``.

Like we did in Step 4, your third LED will also require the pauses at the beginning and the end of the forever loop.

* From **CONTROL**, drag a **pause** block to place at the beginning of your *forever* loop built in this step. Change the value to ``600``.
* From **CONTROL**, drag a **pause** block to place at the end of your *forever* loop built in this step. Change the value to ``900``.

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
brightness_2 = 0
```
## Step 6: Controlling LED 3

We'll be following Step 3 again-- let's take a look at the completed code you should have! We'll make note of any changes that need to be made.

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
brightness_3 = 0
```

## Some differences to notice...

* The **pin** has changed to ``D3`` from ``D0``. 
* The **variable** has changed to ``brightness_3``. 
* The addition of a **pause** loop with the value ``900`` heading out the *forever* loop. 
* The addition of a **pause** loop with the value ``600`` closing out the *forever* loop. 

## Midway Check! 

Let's run your code. Your LEDs should fade in and out, one at a time, up until D3, or the fourth LED on your board. Let's keep working to get all of our LEDs fading in and out!

## Step 7: Controlling LED 4

To light up D4, your 5th LED on the board positioned at 4, we'll be following Step 4 again-- here's what your completed code should look like!

```blocks
let brightness_4 = 0
loops.forever(function () {
    loops.pause(1200)
    while (brightness_4 <= 255) {
        lights.set(DigitalPin.D4, brightness_4)
        loops.pause(15)
        brightness_4 = brightness_4 + 10
    }
    while (brightness_4 >= 4) {
        lights.set(DigitalPin.D4, brightness_4)
        loops.pause(15)
        brightness_4 = brightness_4 - 10
    }
    loops.pause(300)
})
brightness_4 = 0
```

## Some differences to notice...

* The **pin** has been changed to ``D4`` instead of ``D0``.
* The **variable** has changed to ``brightness_4``.
* The addition of a **pause** loop with the value ``1200`` heading out the *forever* loop.
* The addition of a **pause** loop with the value ``300`` closing out the *forever* loop.

## Step 8: Controlling LED 5

One more LED to light up in succession! To do this, we'll be following Step 3 again. Here's a walkthrough!

* From **CONTROL**, drag a **Forever** loop into your workspace.
* From **CONTROL**, drag a **While** loop and nest it inside your forever loop.

```blocks
let brightness_5 = 0
loops.forever(function () {
    while (brightness_5 <= 255) {
    }
})
brightness_5 = 0
```

## Build the block...

* From **MATH**, drag a **(0 == 0)** into the place of the **true** of the while loop.
* From **VARIABLES**, drag a **brightness_5** block into the lefthand side of the equation.
* Change the sign from ``=`` to ``<=``.
* Type in ``255`` for the righthand side.

Now that your while loop has been set up, let's work towards what we'll be telling the loop to do.

* From **LIGHTS**, drag a **set A0 to** block into the while loop.

```blocks
let brightness_5 = 0
loops.forever(function () {
    while (brightness_5 <=255) {
        lights.set(DigitalPin.D5, brightness_5)
    }
})
brightness_5 = 0
```

## Build the block...

* From **PINS** under Advanced, drag a **D5** block to replace the A0 inside your blue block.
* From **VARIABLES** drag a **brightness_5** into the righthand side of your **set D0** block.
* From **CONTROL**, drag a **pause** block and place it under your **set D5** block inside your while loop. Change the value to ``15`` milliseconds.
* From **VARIABLES**, drag a **set item to** block and place it under your pause block.

```blocks
let brightness_5 = 0
loops.forever(function() {
    while (brightness_5 <= 255) {
        lights.set(DigitalPin.D5, brightness_5)
        loops.pause(15)
        brightness_5 = brightness_5 + 10
    }
})
brightness_5 = 0
```

## Build the block...

* Select ``brightness_5`` from the dropdown of variables to change item into your variable.
* From **MATH**, drag out a **0 + 0** block and place it inside the set item to block.
* From **VARIABLES**, drag a **brightness_5** into your lefthand side of your addition block.
* Change the value of ``0`` on the righthand side to ``10``.

And here's your second while loop!

```blocks
let brightness_5 = 0
while (brightness_5 >= 0) {
    lights.set(DigitalPin.D5, brightness_5)
    loops.pause(15)
    brightness_5 = brightness_5 - 10
}
brightness_5 = 0
```

## Build the block...

* Change the sign from ``=`` to ``>=``. 
* Change the sign of your addition to subtraction, so that it reads *brightness_5 - 10*.

```blocks
let brightness_5 = 0
loops.forever(function () {
    while (brightness_5 <= 255) {
        lights.set(DigitalPin.D5, brightness_5)
        loops.pause(15)
        brightness_5 = brightness_5 + 10
    }
    while (brightness_5 >= 0) {
        lights.set(DigitalPin.D5, brightness_5)
        loops.pause(15)
        brightness_5 = brightness_5 -10
    }
})
brightness_5 = 0
```
One more thing before we finish - let's add a pause loop to the beginning of this forever loop so that it waits for all the other LEDs to light up before lighting up!

* From **CONTROL**, drag a **pause** block into the bottom of your forever loop.
* Change the value to ``1500`` milliseconds.

Does your code look like this?

```blocks
let brightness_5 = 0 
loops.forever(function () {
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
    loops.pause(1500)
})
brightness_5 = 0
```

## Good work!

Now that you've completed your code, let's have it run and take a look at what happens. Do you see the fade in and out of each LED?


