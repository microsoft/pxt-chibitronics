# Fade with While Loop

Chapter 4 example code: fading using a while loop

```blocks
let brightness = 0
loops.forever(function () {
   while (brightness < 100) {
     lights.set(AnalogPin.A0, brightness)
     loops.pause(10)
     brightness += 1
   }
   while (brightness > 0) {
     lights.set(AnalogPin.A0, brightness)
     loops.pause(10)
     brightness += -1
   }
})
```