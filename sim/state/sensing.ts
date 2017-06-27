
namespace pxsim.sensing {

    export function pressed(pinId: number): number {
        return pxsim.pins.digitalReadPin(pinId);
    }

    export function read(pinId: number): number {
        return pxsim.pins.analogReadPin(pinId);
    }
}