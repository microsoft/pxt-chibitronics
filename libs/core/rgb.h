#ifndef __RGB_H
#define __RGB_H

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
    void setRGBLed(int r, int g, int b);
}

#endif