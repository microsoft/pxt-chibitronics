
namespace pxsim.lights {

    export function digitalWritePinOn(pinId: number) {
        pxsim.pins.digitalWritePinOn(pinId);
    }

    export function digitalWritePinOff(pinId: number) {
        pxsim.pins.digitalWritePinOff(pinId);
    }

    export function analogWritePin(pinId: number, value: number) {
        pxsim.pins.analogWritePin(pinId, value);
    }
}