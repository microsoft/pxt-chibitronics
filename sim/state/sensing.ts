
namespace pxsim.sensing {

    export function pressed(pinId: number): number {
        return pxsim.pins.digitalRead(pinId);
    }

    export function read(pinId: number): number {
        return pxsim.pins.analogRead(pinId);
    }
}