# Carousel Animation

```blocks
let index = 0
let item = 0
forever(() => {
    item = index % 7
    lights.set(item, 1)
    lights.set(item - 1, 0)
    index += 1
    pause(100)
})
```