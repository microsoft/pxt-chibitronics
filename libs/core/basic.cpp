#include "pxt.h"
#include "ChibiOS.h"

/**
 * Provides access to basic micro:bit functionality.
 */
//% color=#FFAB19 weight=100 icon="\uf00a"
namespace loops {

    static void forever_stub(void *a) {
      setThreadName("forever_stub");
      while (true) {
        runAction0((Action)a);
        threadSleep(MS2ST(20));
      }
    }

    /**
     * Repeats the code forever in the background. On each iteration, allows other codes to run.
     * @param body code to execute
     */
    //% help=basic/forever weight=55 blockGap=8 blockAllowMultiple=1
    //% blockId=device_forever block="forever" icon="\uf01e"
    void forever(Action a) {
      if (a != 0) {
        incr(a);
        thread_t *thr = (thread_t *)malloc(400);
        createThread((void *)thr, 400, 20, forever_stub, (void *)a);

        /* Mark thr->p_flags as CH_FLAG_MODE_HEAP, so ChibiOS will call free()
         * on the memory after it exits.
         */
        ((uint8_t *)thr)[0x1d] = 1;
      }
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=basic/pause weight=54
    //% async block="pause %pause ms"
    //% blockId=device_pause icon="\uf110"
    void pause(int ms) {
      delay(ms);
    }
}