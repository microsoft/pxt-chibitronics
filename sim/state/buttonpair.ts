namespace pxsim.input {
    export function onButtonPressed(button: number, handler: RefAction): void {
        let b = board().buttonPairState;
        //TODO: Fix this
        //pxtcore.registerWithDal(button, LTC.LTC_BUTTON_EVT_CLICK, handler);
    }

    export function buttonIsPressed(button: number): boolean {
        let b = board().buttonPairState;
        if (button == b.d0Btn.id) return b.d0Btn.pressed;
        if (button == b.d1Btn.id) return b.d1Btn.pressed;
        if (button == b.d2Btn.id) return b.d2Btn.pressed;
        if (button == b.d3Btn.id) return b.d3Btn.pressed;
        if (button == b.d4Btn.id) return b.d4Btn.pressed;
        if (button == b.d5Btn.id) return b.d5Btn.pressed;
        return false;
    }
}
