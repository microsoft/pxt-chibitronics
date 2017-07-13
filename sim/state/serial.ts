
namespace pxsim.scope {

    export function writeLine(message: string): void {
        const serialState = (board() as LtcBoard).serialState;
        serialState.usesSerial = true;
        serialState.appendLine(message);
        runtime.queueDisplayUpdate();
    }

    export function writeNumber(num: number): void {
        const serialState = (board() as LtcBoard).serialState;
        serialState.usesSerial = true;
        serialState.appendLine(num.toString());
        runtime.queueDisplayUpdate();
    }
}