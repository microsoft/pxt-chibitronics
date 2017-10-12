# The awesome full list of book snippets

Pile up all the code snippets from the book in ``block`` or ``blocks`` fence code blocks.

* launch local server
* go to ``/book/vol-1-snippets?downloadScreenshots=1``

### Blink

```blocks
loops.forever(function () {
    lights.turn(DigitalPin.D0, 1)
    loops.pause(500)
    lights.turn(DigitalPin.D0, 0)
    loops.pause(500)
})
```

### Long short blink

```blocks
loops.forever(function () {
    lights.turn(DigitalPin.D0, 1)
    loops.pause(500)
    lights.turn(DigitalPin.D0, 0)
    loops.pause(100)
})
```
