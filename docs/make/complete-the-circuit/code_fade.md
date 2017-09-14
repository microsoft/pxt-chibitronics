# Fading LED 
## @description Making your LED fade in and our for @boardname@ 

## ~avatar avatar 
    Let's code our LED to make the light fade in and out! 
## ~ 

# Duration: 30 minutes

## Blocks 

```cards 
pins.analogWrite(AnalogPin.A0, 1023)
```

## Step 1: Setting up the loop 

1. Open [MakeCode](@homeurl@) in your browser. 
2. From **CONTROL**, drag a **forever** loop into your workspace. 

## Step 2: Coding your starting value for your pin 

1. From **PINS** under **ADVANCED**, drag an **analog write** and place it inside your forever loop. 
2. Replace ``1023`` with the **map of** block found in **MATH** inside of the **analog write** block. 

```block
loops.forever(function () {
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``5``. 

By changing the map value inside the map of block to 1023, we are enabling the pin to be set to a maximum of 1023. This lets the program know that we are planning to run a value through the function. 

## Step 3: Creating the next step up! 

1. From **CONTROL**, drag a **pause** block and place it under the code created in the first two steps. 
2. From **PINS** under **ADVANCED**, drag an **analog write** and place it inside your forever loop. 
3. Replace ``1023`` with the **map of** block found in **MATH** inside of the **analog write** block. 

```block
loops.forever(function () {
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``10``. 

## Step 4: Setting the maximum brightness for your pin

1. From **CONTROL**, drag a **pause** block and place it under your latest addition of code. 
2. From **PINS** under **ADVANCED**, drag an **analog write** and place it under your latest addition of code. 
3. Replace ``1023`` with the **map of** block found in **MATH** inside of the **analog write** block. 

```block
loops.forever(function () {
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        15
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``15``. 

## Step 5: Bringing your code back down from the maximum value 

1. From **CONTROL**, drag a **pause** block and place it under your latest addition of code.  
2. From **PINS** under **ADVANCED**, drag an **analog write** and place it under your latest addition of code.  
3. Replace ``1023`` with the **map of** block found in **MATH** inside of the **analog write** block. 

```block
loops.forever(function () {
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        15
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``10``. 

## Step 6: Bringing your LED down to where it started 

1. From **CONTROL**, drag a **pause** block and place it under your latest addition of code. 
2. From **PINS** under **ADVANCED**, drag an **analog write** and place it inside your latest addition of code.  
3. Replace ``1023`` with the **map of** block found in **MATH** inside of the **analog write** block. 

```block
loops.forever(function () {
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        15
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``10``. 

## Step 7: Restoring balance in your @boardname@ by bringing it back to its start value

1. From **CONTROL**, drag a **pause** block and place it under your latest addition of code. 
2. From **PINS** under **ADVANCED**, drag an **analog write** and place it inside your latest addition of code. 
3. Replace ``1023`` with the **map of** block found in **MATH** inside of the **analog write** block. 

```block
loops.forever(function () {
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        15
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        10
    ))
    loops.pause(100)
    pins.analogWrite(AnalogPin.A1, Math.map(
        1023, 
        0, 
        1023, 
        0, 
        5
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``5``. 

## Finished! 

Run your code on your circuit after uploading your finished work to @boardname@! When you hold down the switch, do you see the LED fading from dim to bright? 


