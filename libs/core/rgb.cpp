#include "pxt.h"
#include "ltc.h"
#include "rgb.h"

struct pixels {
    uint8_t g;
    uint8_t r;
    uint8_t b;
} __attribute__((packed));

extern "C" void ledShow(uint32_t pin, void *pixels, uint32_t num_leds);

/**
 * Provides access to basic RGB LED functionality.
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
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            return;
        }

        struct pixels pixels[1];
        pixels[0].r = r;
        pixels[0].g = g;
        pixels[0].b = b;
        ledShow(LED_BUILTIN_RGB, pixels, 1);
    }

    /**
     * Sets an RGB sticker led to a specific red, green, blue color.
     * @param name the pin name
     * @param index the lef index
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
    //% parts="rgbled"
    void setRGBStickerLed(int name, int index, int r, int g, int b) {
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            return;
        }
    }
}