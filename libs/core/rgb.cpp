#include "pxt.h"
#include "ltc.h"
#include "rgb.h"

struct pixels {
    uint8_t g;
    uint8_t r;
    uint8_t b;
} __attribute__((packed));

extern "C" void ledShow(uint32_t pin, void *pixels, uint32_t num_leds);

// We're limited by memory, and also by current.  Limit us to 20 LEDs for now.
#define EXTERNAL_LED_LIMIT 20

/**
 * Provides access to basic RGB LED functionality.
 */
//% color=#CF63CF weight=80 icon="\uf00a"
namespace rgb {

    /**
     * Get a persistent memory buffer big enough to hold
     * at least @count LEDs.
     * @param count the minimum number of LEDs
     * Note that you can call this function with a larger @count
     * and the resulting buffer will still contain previous values,
     * but new values will be 0-filled.
     */
    static struct pixels *getRgbBuffer(unsigned char count) {
        static unsigned char rgb_led_count;
        static struct pixels *rgb_buffer;

        // Don't allow us to exceed this hard limit.
        if (count > EXTERNAL_LED_LIMIT)
            return NULL;

        // Add more LEDs to our back buffer, if necessary
        if ((count+1) > rgb_led_count) {

            // [Re-]allocate the pixel buffer
            rgb_buffer = (struct pixels *)realloc((void *)rgb_buffer, (count + 1) * sizeof(*rgb_buffer));
            if (!rgb_buffer) {
                return NULL;
            }

            // Ensure any gaps in LEDs are turned off, and not filled
            // with random uninitialized memory.
            unsigned int clear_idx;
            for (clear_idx = rgb_led_count; clear_idx <= count; clear_idx++) {
                rgb_buffer[clear_idx].r = 0;
                rgb_buffer[clear_idx].g = 0;
                rgb_buffer[clear_idx].b = 0;
            }

            // Update the total LED count.
            rgb_led_count = count + 1;
        }

        return rgb_buffer;
    }

    static bool colorIsValid(int r, int g, int b) {
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            return false;
        }
        return true;
    }

    /**
     * Set the rgb led to a specific red, green, blue color.
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
     //% parts="rgbled"
    void setRGBLed(int r, int g, int b) {

        if (!colorIsValid(r, g, b)) {
            return;
        }

        // The onboard RGB LED is the first LED of the offboard
        // RGB buffer.  Treat it like a chain of 1.
        struct pixels *pixels = getRgbBuffer(1);
        if (!pixels)
            return;

        pixels[0].r = r;
        pixels[0].g = g;
        pixels[0].b = b;
        ledShow(LED_BUILTIN_RGB, pixels, 1);
    }

    /**
     * Sets an RGB sticker led to a specific red, green, blue color.
     * @param index the led index
     * @param red the red color
     * @param green the green color
     * @param blue the blue color
     */
    //% parts="rgbled"
    void setRGBStickerLed(uint32_t index, int r, int g, int b) {

        if (!colorIsValid(r, g, b)) {
            return;
        }

        // Note that RGB Sticker LEDs are 1-indexed, because the
        // onboard LED is index 0.  For example, if you call
        // setRGBStickerLed(0, 255, 255, 255), then this will
        // set the first offboard LED to full-white.
        struct pixels *pixels = getRgbBuffer(index + 1);
        if (!pixels)
            return;

        pixels[index + 1].r = r;
        pixels[index + 1].g = g;
        pixels[index + 1].b = b;

        ledShow(LED_BUILTIN_RGB, pixels, index + 1);
    }
}