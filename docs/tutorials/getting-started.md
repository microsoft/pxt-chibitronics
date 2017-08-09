# Getting Started 

### Step 1 

Welcome to the @boardname@! Let's work on completing your first challenge for the hardware. Let's place  a **set D0 on** block from **LIGHTS** inside a **forever** loop found in **CONTROL**. 

```blocks 
loops.forever(function() {
    lights.on(DigitalPin.D0)
})
``` 
Try to upload your code now. What does this do?
You've coded your LED to turn on! 
We don't want this forever shining, however, so let's add more code to make this first project a little bit more than simple. 

### Step 2 

Use the **pause** block located in **CONTROL**, and drag it under your **set D0** pin. Let's create a pause in this function so that after it turns on it will think a little bit! Let's change the value of the block to ``900``. This represents 900 milliseconds. 

```blocks 
loops.forever(function(){
    lights.on(DigitalPin.D0)
    loops.pause(900)
})
``` 

### Step 3 

Now that we have a pause, let's think about what we can do next. We can ask the code to turn off the LED after turning it on and pausing! Take a **set D0 off** block from **LIGHTS** and place it in your forever loop. 

```blocks 
loops.forever(function(){
    lights.on(DigitalPin.D0)
    loops.pause(900)
    lights.off(DigitalPin.D0)
})
```

### Step 4 

We just need to add one more thing- a last pause block so that you can create a blinking effect. Take another **pause** block to add into your loop. Set the value of the block to ``900``. 

```blocks 
loops.forever*function(){
    lights.on(DigitalPin.D0)
    loops.pause(900)
    lights.off(DigitalPin.D0)
    loops.pause(900)
}
``` 

### Step 5 

Let's run your code on your @boardname@. Congratulations, you've finished coding your first activity! Does your LED blink on and off?