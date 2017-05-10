
namespace pxsim.sensing {

    export function digitalReadPin(pinId: number): number {
        return pxsim.pins.digitalReadPin(pinId);
    }

    export function analogReadPin(pinId: number): number {
        return pxsim.pins.analogReadPin(pinId);
    }
}