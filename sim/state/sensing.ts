
namespace pxsim.sensing {

    export function pressed(pinId: number): number {
        return pxsim.pins.digitalRead(pinId);
    }

    export function read(pinId: number): number {
        return pxsim.pins.analogRead(pinId);
    }

    export function onPinPressed(pin: number, handler: RefAction): void {
        pxtcore.registerWithDal(pin, LTC.LTC_BUTTON_EVT_DOWN, handler);
    }

    export function onPinReleased(pin: number, handler: RefAction): void {
        pxtcore.registerWithDal(pin, LTC.LTC_BUTTON_EVT_UP, handler);
    }

    export function onPinChanged(pin: number, handler: RefAction): void {
        pxtcore.registerWithDal(pin, LTC.LTC_BUTTON_EVT_CLICK, handler);
    }
}