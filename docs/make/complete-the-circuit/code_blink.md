# Blinking Circuit
### @description Making your LED blink for @boardname@ 

### ~avatar avatar 
    Let's create a blinking LED using the map function on MakeCode! 
### ~ 

# Duration: 20 minutes

## Blocks 

```cards 
pins.analogWrite(AnalogPin.A0, 1023)
```

## Step 1: Setting up the loop 

1. Open [MakeCode](@homeurl@) in your browser. 
2. From **CONTROL**, drag a **forever** loop into your workspace. 

## Step 2: Coding the low light value for your pin 

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

## Step 3: Coding the high light value for your pin 

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
        30
    ))
})
```

## Build the block...
* Change the pin to ``A1``. 
* Change the value of *map* to ``1023``.
* Change the value of *to high* to ``30``. 

Although the code looks the same as step 2, you'll notice that the *to high* value has changed to 30. This allows the circuit to alternate between the signal of 5, and the signal of 30, creating a low light and high light contrast.

## Finished! 

Run your code on your @boardname@. When you hold down the switch, do you see your LED blinking from bright to dark? Play around with the values for more or less contrast between the two light settings!  

