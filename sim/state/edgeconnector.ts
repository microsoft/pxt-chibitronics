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
    export function digitalRead(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Digital | PinFlags.Input;
        //console.log("Reading value from pin " + pin.id + ": " + pin.value);
        return pin.value > 100 ? 1 : 0;
    }

    export function digitalWrite(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Digital | PinFlags.Output;
        pin.value = value;
        runtime.queueDisplayUpdate();
    }

    export function setPinMode(pinId: number, pull: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.pull = pull;
    }

    export function setAnalogPinMode(pinId: number, pull: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.pull = pull;
    }

    export function analogRead(pinId: number): number {
        let pin = getPin(pinId);
        if (!pin) return -1;
        pin.mode = PinFlags.Analog | PinFlags.Input;
        return pin.value || 0;
    }

    export function analogWrite(pinId: number, value: number) {
        let pin = getPin(pinId);
        if (!pin) return;
        pin.mode = PinFlags.Analog | PinFlags.Output;
        pin.value = value;
        runtime.queueDisplayUpdate();
    }
}