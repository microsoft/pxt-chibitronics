# Multithreaded fading

Chapter 4 example code: fading multiple pins using multithreading

```blocks
let brightness5 = 0
let brightness4 = 0
forever(function () {
    lights.set(DigitalPin.D0, 1)
    pause(300)
    lights.set(DigitalPin.D0, 0)
    pause(300)
})
forever(function () {
    lights.set(DigitalPin.D1, 1)
    pause(500)
    lights.set(DigitalPin.D1, 0)
    pause(500)
})
forever(function () {
    lights.set(DigitalPin.D2, 1)
    pause(800)
    lights.set(DigitalPin.D2, 0)
    pause(800)
})
forever(function () {
    lights.set(DigitalPin.D3, 1)
    pause(1000)
    lights.set(DigitalPin.D3, 0)
    pause(1000)
})
forever(function () {
    while (brightness4 < 100) {
        lights.setLevel(AnalogPin.A4, brightness4)
        pause(10)
        brightness4 += 1
    }
    while (brightness4 > 0) {
        lights.setLevel(AnalogPin.A4, brightness4)
        pause(10)
        brightness4 += -1
    }
})
forever(function () {
    while (brightness5 > 0) {
        lights.setLevel(AnalogPin.A5, brightness5)
        pause(10)
        brightness5 += -1
    }
    while (brightness5 < 100) {
        lights.setLevel(AnalogPin.A5, brightness5)
        pause(10)
        brightness5 += 1
    }
})
brightness4 = 0
brightness5 = 100
```
