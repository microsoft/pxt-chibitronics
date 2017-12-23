
namespace pxsim.lights {

    export function on(pinId: number) {
        pxsim.pins.digitalWrite(pinId, 1);
    }

    export function off(pinId: number) {
        pxsim.pins.digitalWrite(pinId, 0);
    }

    export function set(pinId: number, value: number) {
        pxsim.pins.digitalWrite(pinId, value);
    }

    export function setLevel(pinId: number, value: number) {
        pxsim.pins.analogWrite(pinId, value);
    }
}