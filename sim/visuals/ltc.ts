namespace pxsim.visuals {
    const MB_STYLE = `
        svg.sim {
            margin-bottom:1em;
        }
        svg.sim.grayscale {
            -moz-filter: grayscale(1);
            -webkit-filter: grayscale(1);
            filter: grayscale(1);
        }
        .sim-button {
            pointer-events: none;
        }

        .sim-button-outer:hover {
            stroke:grey;
            stroke-width: 3px;
        }
        .sim-button-nut {
            fill:#704A4A;
            pointer-events:none;
        }
        .sim-button-nut:hover {
            stroke:1px solid #704A4A;
        }
        .sim-pin:hover {
            stroke:#D4AF37;
            stroke-width:2px;
        }
        .sim-pin {
            text-anchor: middle;
        }

        .sim-pin-touch.touched:hover {
            stroke:darkorange;
        }

        .sim-led-back:hover {
            stroke:#a0a0a0;
            stroke-width:3px;
        }
        .sim-led:hover {
            stroke:#ff7f7f;
            stroke-width:3px;
        }

        .sim-led-light.lit:hover {
            stroke: purple;
        }

        .sim-systemled {
            fill:#333;
            stroke:#555;
            stroke-width: 1px;
        }

        .sim-light-level-button {
            stroke:#fff;
            stroke-width: 3px;
        }

        .sim-antenna {
            stroke:#555;
            stroke-width: 2px;
        }

        .sim-text {
        font-family:"Lucida Console", Monaco, monospace;
        font-size:25px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-text-pin {
        text-anchor: middle;
        font-family:"Lucida Console", Monaco, monospace;
        font-size:10px;
        fill:#fff;
        pointer-events: none;
        }

        .sim-thermometer {
            stroke:#aaa;
            stroke-width: 3px;
        }

        /* animations */
        .sim-theme-glow {
            animation-name: sim-theme-glow-animation;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            animation-iteration-count: infinite;
            animation-duration: 1.25s;
        }
        @keyframes sim-theme-glow-animation {
            from { opacity: 1; }
            to   { opacity: 0.75; }
        }

        .sim-flash {
            animation-name: sim-flash-animation;
            animation-duration: 0.1s;
        }

        @keyframes sim-flash-animation {
            from { fill: yellow; }
            to   { fill: default; }
        }

        .sim-flash-stroke {
            animation-name: sim-flash-stroke-animation;
            animation-duration: 0.4s;
            animation-timing-function: ease-in;
        }

        @keyframes sim-flash-stroke-animation {
            from { stroke: yellow; }
            to   { stroke: default; }
        }

        /* wireframe */
        .sim-wireframe * {
            fill: none;
            stroke: black;
        }
        .sim-wireframe .sim-display,
        .sim-wireframe .sim-led,
        .sim-wireframe .sim-led-back,
        .sim-wireframe .sim-head,
        .sim-wireframe .sim-theme,
        .sim-wireframe .sim-button-group,
        .sim-wireframe .sim-button-label,
        .sim-wireframe .sim-button,
        .sim-wireframe .sim-text-pin
        {
            visibility: hidden;
        }
        .sim-wireframe .sim-label
        {
            stroke: none;
            fill: #777;
        }
        .sim-wireframe .sim-board {
            stroke-width: 2px;
        }
    `;
    const pins4onXs = [66.7, 79.1, 91.4, 103.7, 164.3, 176.6];
    const pins4onMids = pins4onXs.map(x => x + 5);
    const littlePinDist = pins4onMids[1] - pins4onMids[0];
    const bigPinWidth = 50;
    const pin0mid = pins4onXs[0] - bigPinWidth / 2.0;
    const pin3mid = pin0mid - bigPinWidth / 2.0;
    const pin1mid = pins4onMids[3] + bigPinWidth / 2.0;
    const pin2mid = pins4onMids[8] + bigPinWidth / 2.0;
    const pin3Vmid = pins4onMids[13] + bigPinWidth / 2.0;
    const pinGNDmid = pins4onMids[pins4onMids.length - 1] + bigPinWidth / 2.0;
    const pinGND2mid = pinGNDmid + bigPinWidth / 2.0;
    const pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
    const pinNames = ["GND0", "D0", "D1", "D2", "D3", "D4", "D5", "GND1", "+3V"];
    const pinTitles = [
        "GND",
        "D0, ANALOG IN, LED 0",
        "D1, ANALOG IN, LED 1",
        "D2, ANALOG IN, LED 2",
        "D3, ANALOG IN, LED 3",
        "D4, ANALOG IN, LED 4",
        "D5, ANALOG IN, LED 5",
        "+3V",
        "GND"
    ];
    const MB_WIDTH = 225;
    const MB_HEIGHT = 120;
    export interface IBoardTheme {
        accent?: string;
        display?: string;
        pin?: string;
        pinTouched?: string;
        pinActive?: string;
        ledOn?: string;
        ledOff?: string;
        buttonOuter?: string;
        buttonUp?: string;
        buttonDown?: string;
        virtualButtonOuter?: string;
        virtualButtonUp?: string;
        virtualButtonDown?: string;
        lightLevelOn?: string;
        lightLevelOff?: string;
    }

    export var themes: IBoardTheme[] = ["#3ADCFE", "#FFD43A", "#3AFFB3", "#FF3A54"].map(accent => {
        return {
            accent: accent,
            display: "#00d0ff",
            pin: "#D4AF37",
            pinTouched: "#FFA500",
            pinActive: "#FF5500",
            ledOn: "#ff7f7f",
            ledOff: "#202020",
            buttonOuter: "#979797",
            buttonUp: "#000",
            buttonDown: "#FFA500",
            virtualButtonOuter: "#333",
            virtualButtonUp: "#fff",
            lightLevelOn: "yellow",
            lightLevelOff: "#555"
        }
    });

    export function randomTheme(): IBoardTheme {
        return themes[Math.floor(Math.random() * themes.length)];
    }

    export interface IBoardProps {
        runtime?: pxsim.Runtime;
        theme?: IBoardTheme;
        disableTilt?: boolean;
        wireframe?: boolean;
    }

    export class LtcBoardSvg implements BoardView {
        public element: SVGSVGElement;
        private style: SVGStyleElement;
        private defs: SVGDefsElement;
        private g: SVGGElement;

        private logos: SVGElement[];
        private head: SVGGElement; private headInitialized = false;
        private headText: SVGTextElement;
        private display: SVGElement;
        private buttons: SVGElement[];
        private buttonsOuter: SVGElement[];
        private buttonABText: SVGTextElement;
        private pins: SVGElement[];
        private pinLabels: SVGElement[];
        private pinGradients: SVGLinearGradientElement[];
        private pinTexts: SVGTextElement[];
        private ledsOuter: SVGElement[];
        private leds: SVGElement[];
        private systemLed: SVGCircleElement;
        private antenna: SVGPolylineElement;
        private lightLevelButton: SVGCircleElement;
        private lightLevelGradient: SVGLinearGradientElement;
        private lightLevelText: SVGTextElement;
        private thermometerGradient: SVGLinearGradientElement;
        private thermometer: SVGRectElement;
        private thermometerText: SVGTextElement;
        private shakeButton: SVGCircleElement;
        private shakeText: SVGTextElement;
        public board: pxsim.LtcBoard;
        private pinNmToCoord: Map<Coord> = {};

        constructor(public props: IBoardProps) {
            this.recordPinCoords();
            this.buildDom();
            if (props && props.wireframe)
                svg.addClass(this.element, "sim-wireframe");

            if (props && props.theme)
                this.updateTheme();

            if (props && props.runtime) {
                this.board = this.props.runtime.board as pxsim.LtcBoard;
                this.board.updateSubscribers.push(() => this.updateState());
                this.updateState();
                
                this.attachEvents();
            }
        }

        public getView(): SVGAndSize<SVGSVGElement> {
            return {
                el: this.element,
                y: 0,
                x: 0,
                w: MB_WIDTH,
                h: MB_HEIGHT
            };
        }

        public getCoord(pinNm: string): Coord {
            return this.pinNmToCoord[pinNm];
        }

        public highlightPin(pinNm: string): void {
            //TODO: for instructions
        }

        public getPinDist(): number {
            return littlePinDist * 1.7;
        }

        public recordPinCoords() {
            const pinsY = 356.7 + 40;
            pinNames.forEach((nm, i) => {
                let x = pinMids[i];
                this.pinNmToCoord[nm] = [x, pinsY];
            });
        }

        private updateTheme() {
            let theme = this.props.theme;

            /*
            svg.fill(this.display, theme.display);
            svg.fills(this.leds, theme.ledOn);
            svg.fills(this.ledsOuter, theme.ledOff);
            */
            
            /*
            svg.fills(this.buttonsOuter.slice(0, 2), theme.buttonOuter);
            svg.fills(this.buttons.slice(0, 2), theme.buttonUp);
            svg.fill(this.buttonsOuter[2], theme.virtualButtonOuter);
            svg.fill(this.buttons[2], theme.virtualButtonUp);
            svg.fills(this.logos, theme.accent);
            if (this.shakeButton) svg.fill(this.shakeButton, theme.virtualButtonUp);
            */
            this.pinGradients.forEach(lg => svg.setGradientColors(lg, theme.pin, theme.pinActive));
        }

        public updateState() {
            let state = this.board;
            if (!state) return;
            let theme = this.props.theme;

/*
            let bpState = state.buttonPairState;
            let buttons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            buttons.forEach((btn, index) => {
                svg.fill(this.buttons[index], btn.pressed ? theme.buttonDown : theme.buttonUp);
            });
*/
            this.updatePins();
            this.updateTemperature();

            if (!runtime || runtime.dead) svg.addClass(this.element, "grayscale");
            else svg.removeClass(this.element, "grayscale");
        }

        private updatePin(pin: Pin, index: number) {
            if (!pin) return;
            let text = this.pinTexts[index];
            let v = "";
            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) text.textContent = (pin.period ? "~" : "") + (pin.value || 0) + "";
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 0 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 0 ? "1" : "0";
            }
            else if (pin.mode & PinFlags.Touch) {
                v = pin.touched ? "0%" : "100%";
                if (text) text.textContent = "";
            } else {
                v = "100%";
                if (text) text.textContent = "";
            }
            if (v) svg.setGradientValue(this.pinGradients[index + 1], v);
        }

        private updateTemperature() {
            let state = this.board;
            if (!state || !state.thermometerState.usesTemperature) return;

            let tmin = -5;
            let tmax = 50;
            if (!this.thermometer) {
                let gid = "gradient-thermometer";
                this.thermometerGradient = svg.linearGradient(this.defs, gid);
                this.thermometer = <SVGRectElement>svg.child(this.g, "rect", {
                    class: "sim-thermometer",
                    x: 120,
                    y: 110,
                    width: 20,
                    height: 160,
                    rx: 5, ry: 5,
                    fill: `url(#${gid})`
                });
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text', x: 58, y: 130 }) as SVGTextElement;
                this.updateTheme();

                let pt = this.element.createSVGPoint();
                svg.buttonEvents(this.thermometer,
                    (ev) => {
                        let cur = svg.cursorPoint(pt, this.element, ev);
                        let t = Math.max(0, Math.min(1, (260 - cur.y) / 140))
                        state.thermometerState.temperature = Math.floor(tmin + t * (tmax - tmin));
                        this.updateTemperature();
                    }, ev => { }, ev => { })
            }

            let t = Math.max(tmin, Math.min(tmax, state.thermometerState.temperature))
            let per = Math.floor((state.thermometerState.temperature - tmin) / (tmax - tmin) * 100)
            svg.setGradientValue(this.thermometerGradient, 100 - per + "%");
            this.thermometerText.textContent = t + "°C";
        }

        private lastFlashTime: number = 0;
        public flashSystemLed() {
            if (!this.systemLed)
                this.systemLed = <SVGCircleElement>svg.child(this.g, "circle", { class: "sim-systemled", cx: 300, cy: 20, r: 5 })
            let now = Date.now();
            if (now - this.lastFlashTime > 150) {
                this.lastFlashTime = now;
                svg.animate(this.systemLed, "sim-flash")
            }
        }

        private updatePins() {
            let state = this.board;
            if (!state) return;

            state.edgeConnectorState.pins.forEach((pin, i) => this.updatePin(pin, i));
        }


        private buildDom() {
            this.element = new DOMParser().parseFromString(BOARD_SVG, "image/svg+xml").querySelector("svg") as SVGSVGElement;
            svg.hydrate(this.element, {
                "version": "1.0",
                "viewBox": `0 0 ${MB_WIDTH} ${MB_HEIGHT}`,
                "class": "sim",
                "x": "0px",
                "y": "0px",
                "width": MB_WIDTH + "px",
                "height": MB_HEIGHT + "px",
            });
            this.style = <SVGStyleElement>svg.child(this.element, "style", {});
            this.style.textContent = MB_STYLE;

            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);

            // filters
            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            // outline
            //svg.path(this.g, "sim-board", "M498,31.9C498,14.3,483.7,0,466.1,0H31.9C14.3,0,0,14.3,0,31.9v342.2C0,391.7,14.3,406,31.9,406h434.2c17.6,0,31.9-14.3,31.9-31.9V31.9z M14.3,206.7c-2.7,0-4.8-2.2-4.8-4.8c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C19.2,204.6,17,206.7,14.3,206.7z M486.2,206.7c-2.7,0-4.8-2.2-4.8-4.8c0-2.72.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8C491,204.6,488.8,206.7,486.2,206.7z");

            // script background
            //this.display = svg.path(this.g, "sim-display", "M333.8,310.3H165.9c-8.3,0-15-6.7-15-15V127.5c0-8.3,6.7-15,15-15h167.8c8.3,0,15,6.7,15,15v167.8C348.8,303.6,342.1,310.3,333.8,310.3z");
            
            //this.display = svg.child(this.g, "rect", { class: "sim-display", x: 0, y: 0, width: 460, height: 150, rx: 10, ry: 10});

            /*
            this.logos = [];
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "115,56.7 173.1,0 115,0" }));
            this.logos.push(svg.path(this.g, "sim-theme", "M114.2,0H25.9C12.1,2.1,0,13.3,0,27.7v83.9L114.2,0z"));
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "173,27.9 202.5,0 173,0" }));
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "54.1,242.4 54.1,274.1 22.4,274.1" }));
            this.logos.push(svg.child(this.g, "polygon", { class: "sim-theme", points: "446.2,164.6 446.2,132.8 477.9,132.8" }));
            */

            // leds
            /*
            this.leds = [];
            this.ledsOuter = [];
            let left = 70, top = 110, ledoffw = 50, ledoffh = 44;
            let ledtop = top;
            for (let j = 0; j < 6; ++j) {
                let ledleft = j * ledoffw + left;
                let k = j;
                this.ledsOuter.push(svg.child(this.g, "rect", { class: "sim-led-back sim-led-light-back", x: ledleft, y: ledtop, width: 10, height: 10, rx: 2, ry: 2 }));
                this.leds.push(svg.child(this.g, "rect", { class: "sim-led sim-led-light", x: ledleft - 2, y: ledtop - 2, width: 14, height: 14, rx: 3, ry: 3, title: `D${j}` }));
            }*/

            // head
            /*
            this.head = <SVGGElement>svg.child(this.g, "g", { class: "sim-head" });
            svg.child(this.head, "circle", { cx: 258, cy: 75, r: 100, fill: "transparent" })
            this.logos.push(svg.path(this.head, "sim-theme sim-theme-glow", "M269.9,50.2L269.9,50.2l-39.5,0v0c-14.1,0.1-24.6,10.7-24.6,24.8c0,13.9,10.4,24.4,24.3,24.7v0h39.6c14.2,0,24.8-10.6,24.8-24.7C294.5,61,284,50.3,269.9,50.2 M269.7,89.2L269.7,89.2l-39.3,0c-7.7-0.1-14-6.4-14-14.2c0-7.8,6.4-14.2,14.2-14.2h39.1c7.8,0,14.2,6.4,14.2,14.2C283.9,82.9,277.5,89.2,269.7,89.2"));
            this.logos.push(svg.path(this.head, "sim-theme sim-theme-glow", "M230.6,69.7c-2.9,0-5.3,2.4-5.3,5.3c0,2.9,2.4,5.3,5.3,5.3c2.9,0,5.3-2.4,5.3-5.3C235.9,72.1,233.5,69.7,230.6,69.7"));
            this.logos.push(svg.path(this.head, "sim-theme sim-theme-glow", "M269.7,80.3c2.9,0,5.3-2.4,5.3-5.3c0-2.9-2.4-5.3-5.3-5.3c-2.9,0-5.3,2.4-5.3,5.3C264.4,77.9,266.8,80.3,269.7,80.3"));
            this.headText = <SVGTextElement>svg.child(this.g, "text", { x: 310, y: 100, class: "sim-text" })
            */

            // https://www.microbit.co.uk/device/pins
            // GND, D0, D1, D2, D3, D4, D5, GND, 3.3V
            
            this.pins = [
                13,
                37,
                61,
                85,
                109,
                133,
                157,
                181,
                202
            ].map((p, pi) => svg.child(this.g, "rect", {x: p, y: 75, width: 14, height: 34, rx: 1, ry: 1, class: "sim-pin sim-pin-touch"}));

            /*
            this.pinLabels = [
                10,
                60,
                110,
                160,
                210,
                260,
                310,
                370,
                420
            ].map((p, pi) => svg.child(this.g, "text", {x: p+15, y: 140, rx: 4, ry: 4, class: "sim-pin sim-pin-touch", font: "fixed-width"}));
            let pinTexts = ["GND", "D0", "D1", "D2", "D3", "D4", "D5", "GND", "+3V"]
            this.pinLabels.map((p, pi) => p.appendChild(document.createTextNode(pinTexts[pi])));          
*/
            this.pins.forEach((p, i) => svg.hydrate(p, { title: pinTitles[i] }));
            this.pinGradients = this.pins.map((pin, i) => {
                let gid = "gradient-pin-" + i
                let lg = svg.linearGradient(this.defs, gid)
                pin.setAttribute("fill", `url(#${gid})`);
                return lg;
            })

            this.pinTexts = [
                37,
                61,
                85,
                109,
                133,
                157
            ].map(x => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin", x: x+7, y: 100, textAnchor: "middle" }));

/*
            this.buttonsOuter = []; this.buttons = [];

            const outerBtn = (left: number, top: number) => {
                const btnr = 4;
                const btnw = 56.2;
                const btnn = 6;
                const btnnm = 10
                let btng = svg.child(this.g, "g", { class: "sim-button-group" });
                this.buttonsOuter.push(btng);
                svg.child(btng, "rect", { class: "sim-button-outer", x: left, y: top, rx: btnr, ry: btnr, width: btnw, height: btnw });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnnm, cy: top + btnw - btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnw - btnnm, r: btnn });
                svg.child(btng, "circle", { class: "sim-button-nut", cx: left + btnw - btnnm, cy: top + btnnm, r: btnn });
            }

            outerBtn(25.9, 176.4);
            this.buttons.push(svg.path(this.g, "sim-button", "M69.7,203.5c0,8.7-7,15.7-15.7,15.7s-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7S69.7,194.9,69.7,203.5"));
            outerBtn(418.1, 176.4);
            this.buttons.push(svg.path(this.g, "sim-button", "M461.9,203.5c0,8.7-7,15.7-15.7,15.7c-8.7,0-15.7-7-15.7-15.7c0-8.7,7-15.7,15.7-15.7C454.9,187.8,461.9,194.9,461.9,203.5"));
            outerBtn(417, 250);
            this.buttons.push(svg.child(this.g, "circle", { class: "sim-button", cx: 446, cy: 278, r: 16.5 }));
            (<any>this.buttonsOuter[2]).style.visibility = "hidden";
            (<any>this.buttons[2]).style.visibility = "hidden";

            svg.path(this.g, "sim-label", "M35.7,376.4c0-2.8,2.1-5.1,5.5-5.1c3.3,0,5.5,2.4,5.5,5.1v4.7c0,2.8-2.2,5.1-5.5,5.1c-3.3,0-5.5-2.4-5.5-5.1V376.4zM43.3,376.4c0-1.3-0.8-2.3-2.2-2.3c-1.3,0-2.1,1.1-2.1,2.3v4.7c0,1.2,0.8,2.3,2.1,2.3c1.3,0,2.2-1.1,2.2-2.3V376.4z");
            svg.path(this.g, "sim-label", "M136.2,374.1c2.8,0,3.4-0.8,3.4-2.5h2.9v14.3h-3.4v-9.5h-3V374.1z");
            svg.path(this.g, "sim-label", "M248.6,378.5c1.7-1,3-1.7,3-3.1c0-1.1-0.7-1.6-1.6-1.6c-1,0-1.8,0.6-1.8,2.1h-3.3c0-2.6,1.8-4.6,5.1-4.6c2.6,0,4.9,1.3,4.9,4.3c0,2.4-2.3,3.9-3.8,4.7c-2,1.3-2.5,1.8-2.5,2.9h6.1v2.7h-10C244.8,381.2,246.4,379.9,248.6,378.5z");

            svg.path(this.g, "sim-button-label", "M48.1,270.9l-0.6-1.7h-5.1l-0.6,1.7h-3.5l5.1-14.3h3.1l5.2,14.3H48.1z M45,260.7l-1.8,5.9h3.5L45,260.7z");
            svg.path(this.g, "sim-button-label", "M449.1,135.8h5.9c3.9,0,4.7,2.4,4.7,3.9c0,1.8-1.4,2.9-2.5,3.2c0.9,0,2.6,1.1,2.6,3.3c0,1.5-0.8,4-4.7,4h-6V135.8zM454.4,141.7c1.6,0,2-1,2-1.7c0-0.6-0.3-1.7-2-1.7h-2v3.4H454.4z M452.4,144.1v3.5h2.1c1.6,0,2-1,2-1.8c0-0.7-0.4-1.8-2-1.8H452.4z")

            svg.path(this.g, "sim-label", "M352.1,381.1c0,1.6,0.9,2.5,2.2,2.5c1.2,0,1.9-0.9,1.9-1.9c0-1.2-0.6-2-2.1-2h-1.3v-2.6h1.3c1.5,0,1.9-0.7,1.9-1.8c0-1.1-0.7-1.6-1.6-1.6c-1.4,0-1.8,0.8-1.8,2.1h-3.3c0-2.4,1.5-4.6,5.1-4.6c2.6,0,5,1.3,5,4c0,1.6-1,2.8-2.1,3.2c1.3,0.5,2.3,1.6,2.3,3.5c0,2.7-2.4,4.3-5.2,4.3c-3.5,0-5.5-2.1-5.5-5.1H352.1z")
            svg.path(this.g, "sim-label", "M368.5,385.9h-3.1l-5.1-14.3h3.5l3.1,10.1l3.1-10.1h3.6L368.5,385.9z")
            svg.path(this.g, "sim-label", "M444.4,378.3h7.4v2.5h-1.5c-0.6,3.3-3,5.5-7.1,5.5c-4.8,0-7.5-3.5-7.5-7.5c0-3.9,2.8-7.5,7.5-7.5c3.8,0,6.4,2.3,6.6,5h-3.5c-0.2-1.1-1.4-2.2-3.1-2.2c-2.7,0-4.1,2.3-4.1,4.7c0,2.5,1.4,4.7,4.4,4.7c2,0,3.2-1.2,3.4-2.7h-2.5V378.3z")
            svg.path(this.g, "sim-label", "M461.4,380.9v-9.3h3.3v14.3h-3.5l-5.2-9.2v9.2h-3.3v-14.3h3.5L461.4,380.9z")
            svg.path(this.g, "sim-label", "M472.7,371.6c4.8,0,7.5,3.5,7.5,7.2s-2.7,7.2-7.5,7.2h-5.3v-14.3H472.7z M470.8,374.4v8.6h1.8c2.7,0,4.2-2.1,4.2-4.3s-1.6-4.3-4.2-4.3H470.8z")
            */
        }

        private attachEvents() {
            this.pins.slice(1, 6).forEach((pin, index) => {
                if (!this.board.edgeConnectorState.pins[index]) return;
                let pt = this.element.createSVGPoint();
                svg.buttonEvents(pin,
                    // move
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // start
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.addClass(svgpin, "touched");
                        let svgled = this.leds[index];
                        svg.addClass(svgled, "lit");
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (400 - cursor.y) / 40 * 1023
                            pin.value = Math.max(0, Math.min(1023, Math.floor(v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // stop
                    (ev: MouseEvent) => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.removeClass(svgpin, "touched");
                        let svgled = this.leds[index];
                        svg.removeClass(svgled, "lit");
                        this.updatePin(pin, index);
                        return false;
                    });
            })
            this.pins.slice(1, 6).forEach((btn, index) => {
                btn.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = true;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    state.edgeConnectorState.pins[index].touched = false;
                    this.updatePin(state.edgeConnectorState.pins[index], index);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, LTC.LTC_BUTTON_EVT_UP);
                    this.board.bus.queue(state.edgeConnectorState.pins[index].id, LTC.LTC_BUTTON_EVT_CLICK);
                })
            })

            /*
            let bpState = this.board.buttonPairState;
            let stateButtons = [bpState.aBtn, bpState.bBtn, bpState.abBtn];
            this.buttonsOuter.slice(0, 2).forEach((btn, index) => {
                btn.addEventListener(pointerEvents.down, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = true;
                    svg.fill(this.buttons[index], this.props.theme.buttonDown);
                })
                btn.addEventListener(pointerEvents.leave, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUp);
                })
                btn.addEventListener(pointerEvents.up, ev => {
                    let state = this.board;
                    stateButtons[index].pressed = false;
                    svg.fill(this.buttons[index], this.props.theme.buttonUp);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_UP);
                    this.board.bus.queue(stateButtons[index].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
                })
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.down, ev => {
                let state = this.board;
                stateButtons[0].pressed = true;
                stateButtons[1].pressed = true;
                stateButtons[2].pressed = true;
                svg.fill(this.buttons[0], this.props.theme.buttonDown);
                svg.fill(this.buttons[1], this.props.theme.buttonDown);
                svg.fill(this.buttons[2], this.props.theme.buttonDown);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.leave, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);
            })
            this.buttonsOuter[2].addEventListener(pointerEvents.up, ev => {
                let state = this.board;
                stateButtons[0].pressed = false;
                stateButtons[1].pressed = false;
                stateButtons[2].pressed = false;
                svg.fill(this.buttons[0], this.props.theme.buttonUp);
                svg.fill(this.buttons[1], this.props.theme.buttonUp);
                svg.fill(this.buttons[2], this.props.theme.virtualButtonUp);

                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_UP);
                this.board.bus.queue(stateButtons[2].id, DAL.MICROBIT_BUTTON_EVT_CLICK);
            })
            */
        }
    }
}