# Set Level

Chapter 4 example code: manually set levels for a single pin

```blocks
forever(function () {
   lights.setLevel(AnalogPin.A0, 0)
   pause(500)
   lights.setLevel(AnalogPin.A0, 25)
   pause(500)
   lights.setLevel(AnalogPin.A0, 50)
   pause(500)
   lights.setLevel(AnalogPin.A0, 75)
   pause(500)
   lights.setLevel(AnalogPin.A0, 100)
   pause(500)
   lights.setLevel(AnalogPin.A0, 75)
   pause(500)
   lights.setLevel(AnalogPin.A0, 50)
   pause(500)
   lights.setLevel(AnalogPin.A0, 25)
   pause(500)
})
```