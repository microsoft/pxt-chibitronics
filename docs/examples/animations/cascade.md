#Light Cascade
### @description Create a cascade effect of LEDs from left to right 

### ~avatar avatar 
    Using variables and while loops, create a cascade effect of your LEDs! 
### ~

# Duration: 1 hour 

## Blocks 

```cards 
while (true){ 

}
```

## Step 1: Creating your Variables 

In this step, we'll be creating 5 different variables to control each LED. We'll be controlling each separate from each other! 

Variables act as placeholders of values that can be substituted many times into a function. 

* From **VARIABLES**, click **Make a Variable** and name it ``brightness_0``. 
* Repeat the following process 5 more times, naming your variables ``brightness_1``, ``brightness_2``, ``brightness_3``, ``brightness_4``, and ``brightness_5``. 

```block
(brightness_0) 
(brightness_1)
(brightness_2)
(brightness_3)
(brightness_4)
(brightness_5) 
``` 

## Step 2: Setting up your Variables 

The next thing we need to do is define a value for our variables. This allows the system to run code using your variable in place of a value.

* From **CONTROL**, drag an **on start** block into your workspace. 
* From **VARIABLES**, drag a **set item to** block into your **on start** loop. 

```blocks 
let brightness_0 = 0 
brightness_0 = 0
```

## Build the block... 
* From the dropdown, select ``brightness_0`` in place of **item**. 

By setting ``brightness_0``, this tells any code that uses the variable that the starting value is 0. Let's repeat this step with our other 5 variables you created earlier! 

```blocks 
let brightness_0 = 0 
let brightness_1 = 0 
let brightness_2 = 0 
let brightness_3 = 0 
let brightness_4 = 0 
let brightness_5 = 0
brightness_0 = 0
brightness_1 = 0 
brightness_2 = 0
brightness_3 = 0 
brightness_4 = 0 
brightness_5 = 0 
``` 

## Step 3: Controlling LED 0 

Now that your variables have been properly defined and set up, let's get to the coding of the your LED lights! We'll be starting out with the LED on the farthest left. When coding this LED, make sure that the function calls upon ``D0``. 

* From **CONTROL**, drag a **Forever** loop into your workspace. 
* From **CONTROL**, drag a **While** loop and nest it inside your forever loop. 

```blocks 
loops.forever(function () {
    while (brightness_0 <= 255){
    }
})
``` 

## Build the block... 

* From **MATH**, drag a **(0 == 0)** into the place of the **true** of the while loop. 
* From **VARIABLES**, drag a **brightness_0** block into the lefthand side of the equation. 
* Change the sign from ``=`` to ``<=``. 
* Type in ``255`` for the righthand side. 

Now that your while loop has been set up, let's work towards what we'll be telling the loop to do. 

* From **LIGHTS**, drag a **set A0 to** block into the while loop. 

```blocks 
loops.forever(function (){
    while (brightness_0 <=255){
        lights.set(DigitalPin.D0, brightness_0)
    }
})
```

## Build the block... 
* From **PINS** under Advanced, drag a **D0** block to replace the A0 inside your blue block. 
* From **VARIABLES** drag a **brightness_0** into the righthand side of your **set D0** block. 

* From **CONTROL**, drag a **pause** block and place it under your **set D0** block inside your while loop. Change the value to ``15`` miliseconds. 
* From **VARIABLES**, drag a **set item to** block and place it under your pause block. 

```blocks 
brightness_0 = brightness_0 + 10
```
##Build the block...  
* Select ``brightness_0`` from the dropdown of variables to change item into your variable. 
* From **MATH**, drag out a **0 + 0** block and place it inside the set item to block.
* From **VARIABLES**, drag a **brightness_0** into your lefthand side of your addition block. 
* Change the value of ``0`` on the righthand side to ``10``. 

Let's run the code now- what do you see? Does your first LED light up in a fade in pattern? To make it disappear, we'll need to create the same kind of while loop, but run it on a different condition. Follow the steps previously to create an identical block, but we'll need to change some values so that instead of fading in, your LED fades out. 

When you create your second while loop, make sure it's still in your forever loop under your previous while loop. 

After following the code steps above, here's what your block should look like! There are some differences in the steps above compared to the steps below, so let's see what needs to be modified by looking at our block below and the instructions as well. 

```blocks
while (brightness_0 >= 0){
    lights.set(DigitalPin.D0, brightness_0)
    loops.pause(15)
    brightness_0 = brightness_0 - 10 
}
```
## Build the block... 
* Change the sign from ``=`` to ``>=``. 
* Change the sign of your addition to subtraction, so that it reads *brightness_0 - 10*. 

Run your code now- does your LED fade in and out? Here's what your compiled code from Step 3 alone should look like! 

```blocks
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
})
```

We'll be repeating Step 3 for every variable and every LED, so that we can have each light up. However, we'll be making changes to each, as well as adding pause blocks along the way to time the flashing of each LED so that they come in succession. 

Before moving on to our 2nd LED (D1), let's add one more thing to our code. 

* Inside the forever loop and under your while loops, add a pause block and type in ``1500`` for the value instead of ``100``. 

```blocks
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
```

This may seem like a long time to wait, but to make sure it stays off and turns on only after every LED has lit up, we need to have the loop pause temporarily until 1500 miliseconds (1.5 seconds) have passed. 

## Step 4: Controlling LED 1 

Following step 3, let's create the same forever loop with two while loops. In our code below, we won't be going step by step through how to step up each while loop, but we'll show you what needs to change in each loop! 

```blocks 
loops.forever(function () {
    while (brightness_1 <= 255) {
        lights.set(DigitalPin.D1, brightness_1)
        loops.pause(15)
        brightness_1 = brightness_1 + 10 
    }
})
``` 
## Some differences to notice... 
* The **pin**, unlike Step 3, has been changed to ``D1`` instead of ``D0``. 
* The **variable**, unlike Step 4, has changed to ``brightness_1`` instead of ``brightness_0``. 

```blocks
while (brightness_1 >= 0) {
        lights.set(DigitalPin.D1, brightness_1)
        loops.pause(15) 
        brightness_1 = brightness_1 -10 
    }
```


