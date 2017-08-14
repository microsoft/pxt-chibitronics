# Getting Started

### Step 1

Welcome to the @boardname@! Let's start with your first coding challenge on the board. Grab a **forever** loop found in **CONTROL** and place a **set D0 on** block from **LIGHTS** inside of it.

```blocks
loops.forever(function() {
    lights.on(DigitalPin.D0)
})
```

Try to upload your code now. Did you see what happened?
You made your LED to turn on with code!
Well, we don't want it shining forever, so, let's add more code to make your first project a little more interesting.

### Step 2

Find the **pause** block located in **CONTROL**, and drag it under your **set D0** pin. Let's create a pause in this function so that after it turns on, it has a little time to think! Let's change the value of the block to ``900``. This means 900 milliseconds, just a little less than a whole second.

```blocks
loops.forever(function() {
    lights.on(DigitalPin.D0)
    loops.pause(900)
})
```

### Step 3

Now that we have a pause, what could we do next? We can ask the board to turn off the LED after turning it on and pausing! Take a **set D0 off** block from **LIGHTS** and place it in your **forever** loop.

```blocks
loops.forever(function() {
    lights.on(DigitalPin.D0)
    loops.pause(900)
    lights.off(DigitalPin.D0)
})
```

### Step 4

Alright, we just need to add one more thing: a last pause block to create a blinking effect. Take another **pause** block and add it to your loop at the end. Set the value of the block to ``900`` just like before.

```blocks
loops.forever(function() {
    lights.on(DigitalPin.D0)
    loops.pause(900)
    lights.off(DigitalPin.D0)
    loops.pause(900)
})
```

### Step 5

Let's upload and run the code on your @boardname@. Congratulations, you've finished coding your first activity! Is the LED blinking on and off?