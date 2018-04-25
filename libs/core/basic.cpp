#include "pxt.h"
#include "ChibiOS.h"
#include "rgb.h"

/**
 * Provides access to basic functionality.
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
    //% help=control/forever weight=55 blockAllowMultiple=1 afterOnStart=true
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
      } else {
        // The following forces the compiler / linker to include ledShow() in the base hexfile. Without this, ledShow()
        // gets optimized away for some reason and is not part of the hexfile, which makes MakeCode programs crash on
        // the board. We should never reach this point, but even if we do, it will be a no-op inside setRGBLed().
        // TODO: find out why removing this else{} causes programs to crash on the board
        rgb::setRGBLed(-1, -1, -1);
      }
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=control/pause weight=54
    //% async block="pause %ms=timePicker|ms"
    //% blockId=device_pause icon="\uf110" ms.defl="500"
    void pause(int ms) {
      delay(ms);
    }
}