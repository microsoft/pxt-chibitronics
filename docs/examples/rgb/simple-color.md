# Rainbow Tape

This simple demo enables you to set a static color on RGB pixels.

Humans think in decimal, Computers think in binary. So:
- When picking a brightness, a human might prefer a scale of 1-100
- When picking a brightness, a computer might prefer a scale of 0-255

The Chibi Chip is a computer, so we tell it brightnesses on a scale of 0-255.

```blocks
let dimLevel = 1
rgb.setColor(rgb.dim(Colors.Red, dimLevel))
```