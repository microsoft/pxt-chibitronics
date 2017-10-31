#include "pxt.h"
#include "ltc.h"
#include "pins.h"
#include "ChibiOS.h"

#define POLL_PIN_STACK_SIZE 256

namespace sensing
{

#define EVENT_TYPE_NONE 0
#define EVENT_TYPE_LOW 1
#define EVENT_TYPE_HIGH 2
#define EVENT_TYPE_BOTH 3

struct InputEvent
{
    Action body;
    // PPPccTTs
    //  PPP - Pin number (0-5)
    //  cc  - Counter for debounce
    //  TT  - EVENT_TYPE flag
    //  s   - current state
    uint8_t event_mask;
};
static struct InputEvent *events = NULL;
static uint8_t event_count = 0;

static uint8_t make_event_mask(uint8_t pin, uint8_t counter, uint8_t type, uint8_t state)
{
    return ((pin << 5) & (7 << 5)) | ((counter << 3) & (3 << 3)) | ((type << 1) & (3 << 1)) | ((state << 0) & (1 << 0));
}

// This simulates interrupts by simply polling the pins.
// At 10ms intervals, it ought to be good enough for realtime
// interaction.
static void pinPollThread(void *ptr)
{
    (void)ptr;
    while (1)
    {
        delay(10);
        for (int eventNo = 0; eventNo < event_count; eventNo++)
        {
            uint8_t mask = events[eventNo].event_mask;
            uint8_t pin = (mask >> 5) & 7;
            uint8_t counter = (mask >> 3) & 3;
            uint8_t type = (mask >> 1) & 3;
            uint8_t state = (mask >> 0) & 1;

            // Ignore pins without events.
            if (!events[eventNo].body)
            {
                ;
            }

            // If the state matches the recorded state, don't change anything.
            else if ((!!digitalRead(pin)) == (!!state))
            {
                counter = 0;
            }

            // The state is different, so increment the debounce counter.
            else if (counter++ >= 3)
            {
                state = !state;
                counter = 0;

                if ((state && (type & EVENT_TYPE_LOW)) || (!state && (type & EVENT_TYPE_HIGH)))
                    runAction0(events[eventNo].body);
            }
            events[eventNo].event_mask = make_event_mask(pin, counter, type, state);
        }
    }
}

static void spawnPinPollThread(void)
{
    static int sp = 0;
    printf("Sp:%d\n", ++sp);

    // Don't re-spawn the thread.
    if (events)
        return;

    // Allocate space for the thread and create it.
    thread_t *thr = (thread_t *)malloc(POLL_PIN_STACK_SIZE);
    createThread((void *)thr, POLL_PIN_STACK_SIZE, 20, pinPollThread, (void *)0);
    /* Mark thr->p_flags as CH_FLAG_MODE_HEAP, so ChibiOS will call free()
         * on the memory after it exits.
         */
    ((uint8_t *)thr)[0x1d] = 1;
}

static void registerEvent(DigitalPin dpin, uint8_t type, Action body)
{
    if (!body)
        return;

    int pin = (int)dpin;
    if ((pin >= (int)DigitalPin::D0) && (pin <= (int)DigitalPin::D5))
    {
        pin &= ~0x7;
    }
    else if ((pin >= (int)AnalogPin::A0) && (pin <= (int)AnalogPin::A5))
    {
        pin &= ~0x7;
    }
    else if ((pin >= 0) && (pin <= 5))
    {
        pin &= ~0x7;
    }
    else
    {
        return;
    }

    spawnPinPollThread();

    // Switch the pin to an input, and rely on the Schmitt trigger.
    pinMode(pin, (int)PinMode::Input);

    event_count++;
    events = (InputEvent *)realloc((void *)events, sizeof(*events) * event_count);
    incr(body);
    events[event_count - 1].body = body;
    events[event_count - 1].event_mask = make_event_mask(pin, 0, type, 0);
}

/**
     * Do something when a pin is touched (while also touching the GND pin).
     * @param name the pin that needs to be pressed, eg: DigitalPin.P0
     * @param body the code to run when the pin is pressed
     */
//% help=input/on-pin-pressed weight=90
//% blockId=device_pin_event block="on pin %name|pressed"
void onPinPressed(DigitalPin dpin, Action body)
{
    registerEvent(dpin, EVENT_TYPE_LOW, body);
}

/**
     * Do something when a pin is released (while also touching the GND pin).
     * @param name the pin that needs to be released, eg: DigitalPin.P0
     * @param body the code to run when the pin is released
     */
//% help=input/on-pin-released weight=84
//% blockId=device_pin_released block="on pin %name|released"
void onPinReleased(DigitalPin dpin, Action body)
{
    registerEvent(dpin, EVENT_TYPE_HIGH, body);
}


/**
     * Do something when a pin is touched or released again (while also touching the GND pin).
     * @param name the pin that needs to be pressed, eg: DigitalPin.P0
     * @param body the code to run when the pin is pressed or released
     */
//% help=input/on-pin-changed weight=83
//% blockId=device_pin_changed block="on pin %name|changed"
void onPinChanged(DigitalPin dpin, Action body)
{
    registerEvent(dpin, EVENT_TYPE_BOTH, body);
}
}