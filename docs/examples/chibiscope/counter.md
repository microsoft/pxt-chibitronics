# Counter 
## @description Use Chibi Scope to count up! 

## ~avatar avatar 
Let's use the Chibi Scope to create an automatic counter! 
## ~ 

## Materials 
* 1 Chibi Scope 
* 3 Crocodile clips 
* 1 @boardname@ 

## Duration: ~20 minutes 

## Step 1: Setting up your Chibi Scope

Use this link to setup the [Chibi Scope](/scope-setup) so you can program with it and display your text strings!

## Step 2: Setup! 

* Open [MakeCode](@homeurl@) in your browser.
* From **CONTROL**, drag an **on start** loop and place it inside your workspace. 
* In **VARIABLES**, click **Make a Variable** and name it ``count``. 
* From **VARIABLES**, drag a **set item to** block and place it inside your loop. 
* Change the variable name from ``item`` to ``count``. 

```blocks
let count = 0 
count = 0  
```

## Step 3: Creating the counter 
* From **CONTROL**, drag a **forever** loop into your workspace. 
* From **SCOPE**, drag out a **say number** block and place it into your loop. 
* From **VARIABLES**, drag a **count** block and place it inside your **say number block**. 

```blocks
let count = 0 
loops.forever (function () {
    scope.writeNumber(count)
})
count = 0 
``` 

* From **VARIABLES**, drag a **change item to** block and place it inside your forever loop. 
* Change the value to ``1``. 
* From **CONTROL**, add a pause block to your forever loop and change the value to ``75`` milliseconds. 

```blocks
let count = 0
loops.forever(function () {
    scope.writeNumber(count)
    count += 1 
    loops.pause(75)
})
count = 0 
```

## Give it a try!

Run your code. Does your counter work? Great job on completing this activity! 

