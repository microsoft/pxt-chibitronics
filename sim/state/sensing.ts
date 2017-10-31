
namespace pxsim.sensing {

    export function pressed(pinId: number): number {
        return pxsim.pins.digitalRead(pinId);
    }

    export function read(pinId: number): number {
        return pxsim.pins.analogRead(pinId);
    }

    export function onPinEvent(pin: number, evid: number, handler: RefAction): void {
        pxtcore.registerWithDal(pin, evid, handler);
    }
}