# Set Level

Chapter 4 example code: manually set levels for a single pin

```blocks
loops.forever(function () {
   lights.setLevel(AnalogPin.A0, 0)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 25)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 50)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 75)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 100)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 75)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 50)
   loops.pause(500)
   lights.setLevel(AnalogPin.A0, 25)
   loops.pause(500)
})
```