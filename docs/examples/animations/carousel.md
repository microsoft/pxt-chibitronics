# Carousel Animation

```blocks
let index = 0
let item = 0
loops.forever(() => {
    item = index % 7
    lights.on(item)
    lights.off(item - 1)
    index += 1
    loops.pause(100)
})
```