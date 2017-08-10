# Hello World 
### @description Using Chibi Scope to print out a simple message string for @boardname@ 

### ~avatar avatar 
Let's use the Chibi Scope to create a message printout! 
### ~

## Materials: 
* 1 Chibi Scope 
* 3 Crocodile Clips 
* 1 @boardname@ 

## Duration: ~25 minutes 

## Step 1: Setting up your Chibi Scope

Refer to this link to set up for Chibi Scope so that you can program with it and allow text strings to form! 
[Chibi Scope Setup](/docs/chibi-setup.md)

## Step 2: Hello World!  

* Open @homeurl@ in your browser.
* From **CONTROL**, drag an **on start** loop and place it inside your workspace. 
* From **SCOPE**, place a **say message** inside your on start loop. 
* Type in *Hello, World!* 

```blocks
scope.writeLine("Hello World!")
```
Run your code - do you see the message appear on your Chibi Scope? 

Let's work on making your Chibi Scope display more! 

## Step 3: What's your name?

* From **SCOPE**, place a **say message** below your Hello World! block. 
* Instead of **adding text**, leave the box **blank**. This creates a line break for your Chibi Scope. 

```blocks
scope.writeLine("Hello World!")
scope.writeLine("")
``` 

* From **SCOPE**, grab another **say message** and place it inside. 
* This time, type *My name is...* and insert your name! 
* Finish this off with another blank message box. 

```blocks 
scope.writeLine("Hello World!")
scope.writeLine("")
scope.writeLine("My name is...")
scope.writeLine("")
``` 

**Let's make our code do more!!** 

## Step 4: Test... Test... Test...

* From **CONTROL**, drag a **forever** loop into your workspace. 
* From **SCOPE**, add a **say message** to your forever loop. 
* Type **Test...** into your message block. 

If you try running it now, what happens? The code prints out REALLY fast without any control. Let's add some space in between each print-out so that you can read at a manageable speed! 

* From **CONTROL**, grab a **pause** block and place it under your message block. Change the value to ``2000``. 

```blocks 
loops.forever(function () {
    scope.writeLine("Test...")
    loops.pause(2000)
})
scope.writeLine("Hello World!")
scope.writeLine("")
scope.writeLine("My name is...")
scope.writeLine("")
``` 

## Good work! Congratulations on finishing your first Chibi Scope Activity. 
