# Multithreaded fading

Chapter 4 example code: fading multiple pins using multithreading

```blocks
let brightness5 = 0
let brightness4 = 0
loops.forever(function () {
    lights.turn(DigitalPin.D0, 1)
    loops.pause(300)
    lights.turn(DigitalPin.D0, 0)
    loops.pause(300)
})
loops.forever(function () {
    lights.turn(DigitalPin.D1, 1)
    loops.pause(500)
    lights.turn(DigitalPin.D1, 0)
    loops.pause(500)
})
loops.forever(function () {
    lights.turn(DigitalPin.D2, 1)
    loops.pause(800)
    lights.turn(DigitalPin.D2, 0)
    loops.pause(800)
})
loops.forever(function () {
    lights.turn(DigitalPin.D3, 1)
    loops.pause(1000)
    lights.turn(DigitalPin.D3, 0)
    loops.pause(1000)
})
loops.forever(function () {
    while (brightness4 < 100) {
        lights.setLevel(AnalogPin.A4, brightness4)
        loops.pause(10)
        brightness4 += 1
    }
    while (brightness4 > 0) {
        lights.setLevel(AnalogPin.A4, brightness4)
        loops.pause(10)
        brightness4 += -1
    }
})
loops.forever(function () {
    while (brightness5 > 0) {
        lights.setLevel(AnalogPin.A5, brightness5)
        loops.pause(10)
        brightness5 += -1
    }
    while (brightness5 < 100) {
        lights.setLevel(AnalogPin.A5, brightness5)
        loops.pause(10)
        brightness5 += 1
    }
})
brightness4 = 0
brightness5 = 100
```
