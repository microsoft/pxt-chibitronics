namespace pxsim.input {
    export function onPinPressed(pinId: number, handler: RefAction) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.isTouched();

        pxtcore.registerWithDal(pin.id, LTC.LTC_BUTTON_EVT_CLICK, handler);
    }

    export function onPinReleased(pinId: number, handler: RefAction) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.isTouched();
        
        pxtcore.registerWithDal(pin.id, LTC.LTC_BUTTON_EVT_UP, handler);
    }

    export function pinIsPressed(pinId: number): boolean {
        let pin = getPin(pinId);
        if (!pin) return false;
        return pin.isTouched();
    }
}

namespace pxsim {
    export function getPin(id: number) {
        /* Canonicalize pins, converting D0-D15 into 0-15 */
        if ((id >= 0x80) && (id <= 0x8f))
            id -= 0x80;
        /* Canonicalize pins, converting A0-A15 into 0-15 */
        if ((id >= 0xa0) && (id <= 0xaf))
            id -= 0xa0;
        return board().edgeConnectorState.getPin(id);
    }
}

namespace pxsim.pins {
    export function digitalReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Digital | PinFlags.Input;
        //console.log("Reading value from pin " + pin.id + ": " + pin.value);
        return pin.value > 100 ? 1 : 0;
    }

    export function digitalWritePinOn(pinId: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Digital | PinFlags.Output;
        pin.value = 1;
        runtime.queueDisplayUpdate();
    }

    export function digitalWritePinOff(pinId: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Digital | PinFlags.Output;
        pin.value = 0;
        runtime.queueDisplayUpdate();
    }

    export function setPull(pinId: number, pull: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.pull = pull;
    }

    export function analogReadPin(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Analog | PinFlags.Input;
        return pin.value || 0;
    }

    export function analogWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.value = value ? 1 : 0;
        runtime.queueDisplayUpdate();
    }

    export function analogSetPeriod(pinId: number, micros: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.period = micros;
        runtime.queueDisplayUpdate();
    }

    export function servoWritePin(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;

        analogSetPeriod(pinId, 20000);
        pin.servoAngle = value;
    }

    export function servoSetPulse(pinId: number, micros: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        // TODO
    }

    export function analogSetPitchPin(pinId: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        board().edgeConnectorState.pins.filter(p => !!p).forEach(p => p.pitch = false);
        pin.pitch = true;
    }

    export function analogPitch(frequency: number, ms: number) {
        // update analog output
        let pins = board().edgeConnectorState.pins;
        let pin = pins.filter(pin => !!pin && pin.pitch)[0] || pins[0];
        pin.mode = PinFlags.Analog | PinFlags.Output;
        if (frequency <= 0) {
            pin.value = 0;
            pin.period = 0;
        } else {
            pin.value = 512;
            pin.period = 1000000 / frequency;
        }
        runtime.queueDisplayUpdate();

        let cb = getResume();
        AudioContextManager.tone(frequency, 1);
        if (ms <= 0) cb();
        else {
            setTimeout(() => {
                AudioContextManager.stop();
                pin.value = 0;
                pin.period = 0;
                pin.mode = PinFlags.Unused;
                runtime.queueDisplayUpdate();
                cb()
            }, ms);
        }
    }
}