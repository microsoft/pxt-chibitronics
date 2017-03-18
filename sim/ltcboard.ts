/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/core/ltc.d.ts"/>

namespace pxsim {

    export interface LtcButtonPairProps {
        ID_BUTTON_D0: number;
        ID_BUTTON_D1: number;
        ID_BUTTON_D2: number;
        ID_BUTTON_D3: number;
        ID_BUTTON_D4: number;
        ID_BUTTON_D5: number;
        BUTTON_EVT_UP: number;
        BUTTON_EVT_CLICK: number;
    }

    export class LtcButtonPairState {
        d0Btn: Button;
        d1Btn: Button;
        d2Btn: Button;
        d3Btn: Button;
        d4Btn: Button;
        d5Btn: Button;

        constructor(public props: LtcButtonPairProps) {
            this.d0Btn = new Button(this.props.ID_BUTTON_D0);
            this.d1Btn = new Button(this.props.ID_BUTTON_D1);
            this.d2Btn = new Button(this.props.ID_BUTTON_D2);
            this.d3Btn = new Button(this.props.ID_BUTTON_D3);
            this.d4Btn = new Button(this.props.ID_BUTTON_D4);
            this.d5Btn = new Button(this.props.ID_BUTTON_D5);
        }
    }

    export class LtcBoard extends CoreBoard {
        // state & update logic for component services
        edgeConnectorState: EdgeConnectorState;
        thermometerState: ThermometerState;
        buttonPairState: LtcButtonPairState;
        // TODO: not singletons
        neopixelState: NeoPixelState;

        constructor() {
            super()

            // components
            this.builtinParts["buttonpair"] = this.buttonPairState = new LtcButtonPairState({
                ID_BUTTON_D0: LTC.LTC_ID_IO_D0,
                ID_BUTTON_D1: LTC.LTC_ID_IO_D1,
                ID_BUTTON_D2: LTC.LTC_ID_IO_D2,
                ID_BUTTON_D3: LTC.LTC_ID_IO_D3,
                ID_BUTTON_D4: LTC.LTC_ID_IO_D4,
                ID_BUTTON_D5: LTC.LTC_ID_IO_D5,
                BUTTON_EVT_UP: LTC.LTC_BUTTON_EVT_UP,
                BUTTON_EVT_CLICK: LTC.LTC_BUTTON_EVT_CLICK
            });
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new EdgeConnectorState({
                pins: [
                    LTC.LTC_ID_IO_D0,
                    LTC.LTC_ID_IO_D1,
                    LTC.LTC_ID_IO_D2,
                    LTC.LTC_ID_IO_D3,
                    LTC.LTC_ID_IO_D4,
                    LTC.LTC_ID_IO_D5
                ]
            });
            this.builtinParts["neopixel"] = this.neopixelState = new NeoPixelState();
            this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();

            this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView();

            this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);
        }

        receiveMessage(msg: SimulatorMessage) {
            if (!runtime || runtime.dead) return;

            switch (msg.type || "") {
                case "eventbus":
                    let ev = <SimulatorEventBusMessage>msg;
                    this.bus.queue(ev.id, ev.eventid, ev.value);
                    break;
            }
        }

        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);

            const options = (msg.options || {}) as RuntimeOptions;

            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const opts: visuals.BoardHostOpts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
            };
            const viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual
            }), opts);

            document.body.innerHTML = ""; // clear children
            document.body.appendChild(viewHost.getView());

            return Promise.resolve();
        }
    }

    export function initRuntimeWithLtcBoard() {
        U.assert(!runtime.board);
        let b = new LtcBoard();
        runtime.board = b;
        runtime.postError = (e) => {
            //led.setBrightness(255);
            runtime.updateDisplay();
        }
    }

    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithLtcBoard;
    }

    export function board() {
        return runtime.board as LtcBoard;
    }
}