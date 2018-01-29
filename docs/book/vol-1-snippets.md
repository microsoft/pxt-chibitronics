# The awesome full list of book snippets

Pile up all the code snippets from the book in ``block`` or ``blocks`` fence code blocks.

* launch local server
* go to ``/book/vol-1-snippets?screenshots=1`` and it will start download all the snippets.
* if you need to render another language, add a query argument ``lang=ISO`` where ISO is the language code, e.g. ``/book/vol-1-snippets?screenshots=1&lang=fr``

If you want to get these snippets compiled as part of the build, add a link to this page from ``SUMMARY.md``.

### Blink

```blocks
loops.forever(function () {
    lights.set(DigitalPin.D0, 1)
    loops.pause(500)
    lights.set(DigitalPin.D0, 0)
    loops.pause(500)
})
```

### Long short blink

```blocks
loops.forever(function () {
    lights.set(DigitalPin.D0, 1)
    loops.pause(500)
    lights.set(DigitalPin.D0, 0)
    loops.pause(100)
})
```
