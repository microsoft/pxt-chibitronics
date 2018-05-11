# Fade with While Loop

Chapter 4 example code: fading using a while loop

```blocks
let brightness = 0
forever(function () {
   while (brightness < 100) {
     lights.setLevel(AnalogPin.A0, brightness)
     pause(10)
     brightness += 1
   }
   while (brightness > 0) {
     lights.setLevel(AnalogPin.A0, brightness)
     pause(10)
     brightness += -1
   }
})
```