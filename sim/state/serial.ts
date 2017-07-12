
namespace pxsim.scope {

    export function writeLine(message: string): void {
        const serialState = (board() as LtcBoard).serialState;
        serialState.usesSerial = true;
        serialState.appendLine(message);
        runtime.queueDisplayUpdate();
        console.log(message);
    }

}