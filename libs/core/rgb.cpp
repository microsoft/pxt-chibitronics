#include "pxt.h"
#include "ltc.h"

#define ARRAY_SIZE(x) (sizeof(x) / sizeof(*x))

struct pixels {
    uint8_t g;
    uint8_t r;
    uint8_t b;
} __attribute__((packed));

extern void ledShow(uint32_t pin, void *pixels, uint32_t num_leds);

/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#CF63CF weight=80 icon="\uf00a" 
namespace rgb {

    /**
     * Set the rgb led to a specific red, green, blue color.
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
     //% parts="rgbled"
    void setRGBLed(int r, int g, int b) {
        struct pixels pixels[1];
        unsigned int i;

        for (i = 0; i < ARRAY_SIZE(pixels); i++) {
            pixels[i].r = r;
            pixels[i].g = g;
            pixels[i].b = b;
        }
        ledShow(LED_BUILTIN_RGB, pixels, ARRAY_SIZE(pixels));
    }
}