# About

Welcome to the **Microsoft MakeCode** editor for the **@boardname@**!

## @boardname@

Here's the amazing new **Love to Code** system with the @boardname@ from **[chibitronics.com](https://chibitronics.com/lovetocode/)**!

![](https://chibitronics.com/wp-content/uploads/2017/05/09_doneprogramming.png)

## Programming: [Blocks](/blocks) or [JavaScript](/javascript)

You can program the @boardname@ using [Blocks](/blocks) or [JavaScript](/javascript) in your web browser:

```block
loops.forever(function () {
    lights.on(DigitalPin.D0)
    loops.pause(300)
    lights.off(DigitalPin.D0)
    loops.pause(300)
})
```
```typescript
loops.forever(function () {
    lights.on(DigitalPin.D0)
    loops.pause(300)
    lights.off(DigitalPin.D0)
    loops.pause(300)
})
```

The editor works in [most modern browsers](/browsers) and needs no installation. It even works [offline](/offline) once it's loaded.

## Compile and flash: Your program!

Compilation to machine code from [Blocks](/blocks) or [JavaScript](/javascript) happens in the browser.

When you have your code ready, you connect your @boardname@ to a computer using a [USB-to-audio cable](https://chibitronics.com/programming-chibi-chip/). Check to see if the **PROG light** on your board is red.  If it isn’t, press the **PROG button** until the light stays red. Press the **Upload** at the bottom of the page to move your code onto the @boardname@.

## Simulator: Test your code

You can run your code using the **@boardname@** simulator. It all works nicely inside the web browser. The simulator has support for the LED's, buttons, and digital I/O pins.

```sim
loops.forever(function () {
    lights.on(DigitalPin.D0)
    lights.off(DigitalPin.D1)
    lights.on(DigitalPin.D2)
    lights.off(DigitalPin.D3)
    lights.on(DigitalPin.D4)
    lights.off(DigitalPin.D5)
    loops.pause(700)
    lights.off(DigitalPin.D0)
    lights.on(DigitalPin.D1)
    lights.off(DigitalPin.D2)
    lights.on(DigitalPin.D3)
    lights.off(DigitalPin.D4)
    lights.on(DigitalPin.D5)
    loops.pause(700)
})

```

```package
light
```
