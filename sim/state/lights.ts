
namespace pxsim.lights {

    export function on(pinId: number) {
        pxsim.pins.digitalWritePin(pinId, 1);
    }

    export function off(pinId: number) {
        pxsim.pins.digitalWritePin(pinId, 0);
    }

    export function set(pinId: number, value: number) {
        pxsim.pins.analogWritePin(pinId, value);
    }
}