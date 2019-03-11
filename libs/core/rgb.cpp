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

    static unsigned char rgb_led_count;
    static struct pixels *rgb_buffer;

    /**
     * Sets an RGB sticker led to a specific red, green, blue color.
     * @param index the led index
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
    //% parts="rgbled"
    void setRGBStickerLed(uint32_t index, int r, int g, int b) {
        // Add more LEDs to our back buffer, if necessary
        if ((index+1) > rgb_led_count) {

            // [Re-]allocate the pixel buffer
            rgb_buffer = (struct pixels *)realloc((void *)rgb_buffer, (index + 1) * 3);
            if (!rgb_buffer) {
                return;
            }

            // Ensure any gaps in LEDs are turned off, and not filled
            // with random uninitialized memory.
            unsigned int clear_idx;
            for (clear_idx = rgb_led_count; clear_idx < index; clear_idx++) {
                rgb_buffer[clear_idx].r = 0;
                rgb_buffer[clear_idx].g = 0;
                rgb_buffer[clear_idx].b = 0;
            }

            // Update the total LED count.
            rgb_led_count = index + 1;
        }

        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            return;
        }

        rgb_buffer[index].r = r;
        rgb_buffer[index].g = g;
        rgb_buffer[index].b = b;

        ledShow(LED_BUILTIN_RGB, rgb_buffer, rgb_led_count);
    }
}