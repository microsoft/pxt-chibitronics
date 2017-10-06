# Coding your Circuit 
### @description Coding your circuit for @boardname@ 

### ~avatar avatar 
    Let's use @boardname@'s pin connection to create an electric flow to power your circuit! 
### ~ 

# Duration: 15 minutes 

## Blocks 

```cards 
lights.set(AnalogPin.A0, 100) 
```
## Step 1: Setting up your loop 

1. Open [MakeCode](@homeurl@) in your browser. 
2. From **CONTROL**, drag a **forever** loop into your workspace. 

## Step 2: Coding your pin connection 

From **LIGHTS**, drag a **set A0 to 100** block out and place it into your forever loop. 

```block
loops.forever(function () {
    lights.set(AnalogPin.A0, 100)
})
```
### Build the Block... 

Change the pin value of the **set** block from ``A0`` to ``A1``.

```block
lights.set(AnalogPin.A1, 100)
```

So, now we have:

```blocks
loops.forever(function () {
    lights.set(AnalogPin.A1, 100)
})
```

## Finished!

Good work! By setting the value to a high number such as 100, it means that the current of power will be strong enough to light up a LED. Using your paper fold switch, try to turn your LED on and off. Does it work?
