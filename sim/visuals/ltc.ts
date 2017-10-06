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
            stroke:#ffcc00;
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
        font-size:8px;
        fill:#2b1100;
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
        .no-drag {
            user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
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

    const pinsUponXs = [174.0, 190.0, 217.0];
    const pinTXTmid = pinsUponXs[0] - bigPinWidth / 2.0;
    const pin5Vmid = pinsUponXs[1] - bigPinWidth / 2.0;
    const pinGND3mid = pinsUponXs[2] - bigPinWidth / 2.0;   
    const pinMids = [pin0mid, pin1mid, pin2mid, pin3mid].concat(pins4onMids).concat([pinGNDmid, pin3Vmid, pinGND2mid]);
    const pinNames = ["GND0", "D0", "D1", "D2", "D3", "D4", "D5", "GND1", "+3V"];
    const pinMidsUp = [pinTXTmid, pin5Vmid, pinGND3mid];
    const pinNamesUp = ["TXT", "+5V", "GND2"];
    const pinTitles = [
        "GND",
        "D0, ANALOG IN, LED 0",
        "D1, ANALOG IN, LED 1",
        "D2, ANALOG IN, LED 2",
        "D3, ANALOG IN, LED 3",
        "D4, ANALOG IN, LED 4",
        "D5, ANALOG IN, LED 5",
        "+3V",
        "GND",
        "TXT",
        "+5V",
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
            pin: "#ffcc00",
            pinTouched: "#FFA500",
            pinActive: "#4ddc64",
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
        private leds: SVGRectElement[];
        private rgbLed: SVGCircleElement;
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

        private scopeElement: SVGSVGElement;
        private scopeTextNode0: SVGTextElement;
        private scopeTextNode1: SVGTextElement;
        private scopeTextNode2: SVGTextElement;
        private scopeTextNode3: SVGTextElement;

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
            const pinsUpY = -30;
            pinNamesUp.forEach((nm, i) => {
                let x = pinMidsUp[i];
                this.pinNmToCoord[nm] = [x, pinsUpY];
            });
        }

        private updateTheme() {
            let theme = this.props.theme;

            this.pinGradients.forEach(lg => svg.setGradientColors(lg, theme.pin, theme.pinActive));
        }

        public updateState() {
            let state = this.board;
            if (!state) return;
            let theme = this.props.theme;

            this.updatePins();
            this.updateTemperature();
            this.updateRgbLed();
            this.updateSerial();

            if (!runtime || runtime.dead) svg.addClass(this.element, "grayscale");
            else svg.removeClass(this.element, "grayscale");
        }

        private updatePin(pin: Pin, index: number) {
            if (!pin) return;
            let text = this.pinTexts[index];
            let v = "";
            if (pin.mode & PinFlags.Analog) {
                v = Math.floor(100 - (pin.value || 0) / 1023 * 100) + "%";
                if (text) text.textContent = (pin.period ? "~" : "") + Math.floor((pin.value || 0) / 1023 * 100) + "%";
                const svgled = this.leds[index];
                if (svgled) {
                    if (pin.value > 0) {
                        let pinVal = Math.floor(pin.value / 1023 * 60) + 40;
                        svgled.style.stroke = `rgb(235,235,235)`;
                        svgled.style.strokeWidth = `${pinVal / 100 * 2}`;
                        svg.fill(svgled, `hsl(72, 100%, ${pinVal}%)`);
                        svg.filter(svgled, `url(#ledglow)`);
                    } else {
                        svg.filter(svgled, null);
                        svgled.style.fill = "#EEFF44";
                        svgled.style.strokeWidth = "0.2835173";
                    }
                }
            }
            else if (pin.mode & PinFlags.Digital) {
                v = pin.value > 0 ? "0%" : "100%";
                if (text) text.textContent = pin.value > 0 ? "ON" : "OFF";
                const svgled = this.leds[index];
                if (svgled) {
                    if (pin.value > 0) {
                        svgled.style.stroke = `rgb(235,235,235)`;
                        svgled.style.strokeWidth = "1.5";
                        svg.fill(svgled, `rgb(255,255,255)`)
                        svg.filter(svgled, `url(#ledglow)`);
                    } else {
                        svg.filter(svgled, null);
                        svgled.style.fill = "#EEFF44";
                        svgled.style.strokeWidth = "0.2835173";
                    }
                }
            }
            else if (pin.mode & PinFlags.Touch) {
                v = pin.touched ? "0%" : "100%";
                if (text) text.textContent = "";
            } else {
                v = "100%";
                if (text) text.textContent = "";
            }
            if (v) svg.setGradientValue(this.pinGradients[index], v);
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
                this.thermometerText = svg.child(this.g, "text", { class: 'sim-text no-drag', x: 58, y: 130 }) as SVGTextElement;
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

        private updateRgbLed() {
            let state = this.board;
            if (!state) return;

            const rgb = state.neopixelState.getColors(0, NeoPixelMode.RGB)[0];

            if (this.rgbLed) {
                if (!rgb || (rgb.length >= 3 && rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0)) {
                    // Clear the pixel
                    svg.fill(this.rgbLed, `#e6e6e6`);
                    svg.filter(this.rgbLed, null);
                    this.rgbLed.style.strokeWidth = "0.28349999";
                    this.rgbLed.style.stroke = "#58595b";
                } else {
                    let hsl = visuals.rgbToHsl(rgb);
                    let [h, s, l] = hsl;
                    let lx = Math.max(l * 1.3, 85);
                    // at least 10% luminosity
                    l = l * 90 / 100 + 10;
                    this.rgbLed.style.stroke = `hsl(${h}, ${s}%, ${Math.min(l * 3, 75)}%)`
                    this.rgbLed.style.strokeWidth = "1.5";
                    svg.fill(this.rgbLed, `hsl(${h}, ${s}%, ${lx}%)`)
                    svg.filter(this.rgbLed, `url(#neopixelglow)`);
                    let transform = l / 100 * 0.5;
                    this.rgbLed.style.transform = `scale(${0.9 + transform})`;
                    this.rgbLed.style.transformOrigin = "211.30725px 43.049255px";
                }
            }
        }

        private updateSerial() {
            let state = this.board;
            if (!state || !state.serialState) return;

            if (state.serialState.usesSerial && !this.scopeElement) {
                // Show Scope
                svg.hydrate(this.element, {
                    "version": "1.0", 
                    "viewBox": `0 -140 230 250`,
                    "class": "sim", 
                    "x": "112.5px",
                    "y": "200px",
                    "width": "100%",
                    "height": "100%"
                });
                const scopeG = svg.child(this.element, "g", {
                    transform: ""
                })
                this.scopeElement = new DOMParser().parseFromString(SCOPE_SVG, "image/svg+xml").querySelector("svg") as SVGSVGElement;
                svg.hydrate(this.scopeElement, {
                    "version": "1.0",
                    "viewBox": `0 0 200 250`,
                    "class": "sim",
                    "x": "80px",
                    "y": "-140px",
                    "width": "200px", 
                    "height": "220px",
                });
                scopeG.appendChild(this.scopeElement);
                this.scopeTextNode0 = this.scopeElement.getElementById('SCOPE_text0') as SVGTextElement;
                this.scopeTextNode1 = this.scopeElement.getElementById('SCOPE_text1') as SVGTextElement;
                this.scopeTextNode2 = this.scopeElement.getElementById('SCOPE_text2') as SVGTextElement;
                this.scopeTextNode3 = this.scopeElement.getElementById('SCOPE_text3') as SVGTextElement;

                const whiteWire = this.mkWirePart([137, -30], [147, 5], "blue");
                const redWire = this.mkWirePart([153, -30], [167, 5], "red");
                const blackWire = this.mkWirePart([171, -30], [192, 5], "black");
                this.element.appendChild(whiteWire.el);
                this.element.appendChild(redWire.el);
                this.element.appendChild(blackWire.el);
            }
            if (state.serialState.usesSerial) {
                if (state.serialState.lines.length > 0) {
                    this.scopeTextNode0.textContent = state.serialState.lines[0];
                }
                if (state.serialState.lines.length > 1) {
                    this.scopeTextNode1.textContent = state.serialState.lines[1];
                }
                if (state.serialState.lines.length > 2) {
                    this.scopeTextNode2.textContent = state.serialState.lines[2];
                }
                if (state.serialState.lines.length > 3) {
                    this.scopeTextNode3.textContent = state.serialState.lines[3];
                }
            }
        }

        private mkWirePart(p1: [number, number], p2: [number, number], clr: string): visuals.SVGAndSize<SVGGElement> {
            let g = <SVGGElement>svg.elt("g");
            clr = visuals.mapWireColor(clr);
            let e1 = this.mkCrocEnd(p1, true, clr);
            let s = this.mkWirePartSeg(p1, p2, clr);
            let e2 = this.mkCrocEnd(p2, false, clr);
            g.appendChild(s.el);
            g.appendChild(e1.el);
            g.appendChild(e2.el);
            let l = Math.min(e1.x, e2.x);
            let r = Math.max(e1.x + e1.w, e2.x + e2.w);
            let t = Math.min(e1.y, e2.y);
            let b = Math.max(e1.y + e1.h, e2.y + e2.h);
            return {el: g, x: l, y: t, w: r - l, h: b - t};
        }

        private mkWirePartSeg(p1: [number, number], p2: [number, number], clr: string): visuals.SVGAndSize<SVGPathElement> {
            //TODO: merge with mkCurvedWireSeg
            const coordStr = (xy: [number, number]): string => {return `${xy[0]}, ${xy[1]}`};
            let [x1, y1] = p1;
            let [x2, y2] = p2
            let yLen = (y2 - y1);
            let c1: [number, number] = [x1, y1 + yLen * .8];
            let c2: [number, number] = [x2, y2 - yLen * .8];
            let e = <SVGPathElement>svg.mkPath("sim-bb-wire", `M${coordStr(p1)} C${coordStr(c1)} ${coordStr(c2)} ${coordStr(p2)}`);
            (<any>e).style["stroke"] = clr;
            return {el: e, x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x1 - x2), h: Math.abs(y1 - y2)};
        }

        private mkCrocEnd(p: [number, number], top: boolean, clr: string): SVGElAndSize {
            //TODO: merge with mkOpenJumperEnd()
            const PIN_DIST = 7;
            let k = PIN_DIST * 0.24;
            const plasticWidth = k * 4;
            const plasticLength = k * 10.0;
            const metalWidth = k * 3.5;
            const metalHeight = k * 3.5;
            const pointScalar = .15;
            const baseScalar = .3;
            const taperScalar = .7;
            const strokeWidth = PIN_DIST / 4.0;
            let [cx, cy] = p;
            let o = top ? -1 : 1;
            let g = svg.elt("g")

            let el = svg.elt("polygon");
            let h1 = plasticLength;
            let w1 = plasticWidth;
            let x1 = cx - w1 / 2;
            let y1 = cy - (h1 / 2);
            let mkPnt = (xy: Coord) => `${xy[0]},${xy[1]}`;
            let mkPnts = (...xys: Coord[]) => xys.map(xy => mkPnt(xy)).join(" ");
            const topScalar = top ? pointScalar : baseScalar;
            const midScalar = top ? taperScalar : (1 - taperScalar);
            const botScalar = top ? baseScalar : pointScalar;
            svg.hydrate(el, {
                points: mkPnts(
                    [x1 + w1 * topScalar, y1], //TL
                    [x1 + w1 * (1 - topScalar), y1], //TR
                    [x1 + w1, y1 + h1 * midScalar], //MR
                    [x1 + w1 * (1 - botScalar), y1 + h1], //BR
                    [x1 + w1 * botScalar, y1 + h1], //BL
                    [x1, y1 + h1 * midScalar]) //ML
            });
            svg.hydrate(el, {rx: 0.5, ry: 0.5, class: "sim-bb-wire-end"});
            (<any>el).style["stroke-width"] = `${strokeWidth}px`;

            let el2 = svg.elt("rect");
            let h2 = metalWidth;
            let w2 = metalHeight;
            let cy2 = cy + o * (h1 / 2 + h2 / 2);
            let x2 = cx - w2 / 2;
            let y2 = cy2 - (h2 / 2);
            svg.hydrate(el2, {x: x2, y: y2, width: w2, height: h2, class: "sim-bb-wire-bare-end"});

            g.appendChild(el2);
            g.appendChild(el);
            return {el: g, x: x1 - strokeWidth, y: Math.min(y1, y2), w: w1 + strokeWidth * 2, h: h1 + h2};
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
            this.style.textContent = MB_STYLE + visuals.WIRES_CSS;

            this.defs = <SVGDefsElement>svg.child(this.element, "defs", {});
            this.g = <SVGGElement>svg.elt("g");
            this.element.appendChild(this.g);

            // filters
            let glow = svg.child(this.defs, "filter", { id: "filterglow", x: "-5%", y: "-5%", width: "120%", height: "120%" });
            svg.child(glow, "feGaussianBlur", { stdDeviation: "5", result: "glow" });
            let merge = svg.child(glow, "feMerge", {});
            for (let i = 0; i < 3; ++i) svg.child(merge, "feMergeNode", { in: "glow" })

            let neopixelglow = svg.child(this.defs, "filter", { id: "neopixelglow", x: "-200%", y: "-200%", width: "400%", height: "400%" });
            svg.child(neopixelglow, "feGaussianBlur", { stdDeviation: "4", result: "coloredBlur" });
            let neopixelmerge = svg.child(neopixelglow, "feMerge", {});
            svg.child(neopixelmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(neopixelmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(neopixelmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(neopixelmerge, "feMergeNode", { in: "SourceGraphic" })

            let ledglow = svg.child(this.defs, "filter", { id: "ledglow", x: "-200%", y: "-200%", width: "400%", height: "400%" });
            svg.child(ledglow, "feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" });
            let ledglowmerge = svg.child(ledglow, "feMerge", {});
            svg.child(ledglowmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(ledglowmerge, "feMergeNode", { in: "coloredBlur" })
            svg.child(ledglowmerge, "feMergeNode", { in: "SourceGraphic" })

            this.pins = [
                'pin0',
                'pin1',
                'pin2',
                'pin3',
                'pin4',
                'pin5'
            ].map((p, pi) => {
                let pin = this.element.getElementById(p) as SVGRectElement;
                return svg.child(this.g, "rect", { x: pin.getAttribute("x"), y: pin.getAttribute("y"), width: pin.getAttribute("width"), height: pin.getAttribute("height"), rx: 0, ry: 0, class: "sim-pin sim-pin-touch" });
            });
            this.leds = [
                "led_d0",
                "led_d1",
                "led_d2",
                "led_d3",
                "led_d4",
                "led_d5"
            ].map((p, pi) => this.element.getElementById(p) as SVGRectElement);
            this.rgbLed = this.element.getElementById("led_rgb") as SVGCircleElement;

            this.pins.forEach((p, i) => svg.hydrate(p, { title: pinTitles[i + 1] }));
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
            ].map(x => <SVGTextElement>svg.child(this.g, "text", { class: "sim-text-pin no-drag", x: x + 7, y: 125, textAnchor: "middle" }));
        }

        private attachEvents() {
            this.pins.slice().forEach((pin, index) => {
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
                            let v = (cursor.y - 74) / 34 * 1023;
                            pin.value = Math.max(0, Math.min(1023, Math.floor(1023 - v)));
                        }
                        this.updatePin(pin, index);
                    },
                    // start
                    ev => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.addClass(svgpin, "touched");
                        if (pin.mode & PinFlags.Input) {
                            let cursor = svg.cursorPoint(pt, this.element, ev);
                            let v = (cursor.y - 74) / 34 * 1023;
                            if (pin.mode & PinFlags.Digital) {
                                pin.value = pin.value == 0 ? 1 : 0;
                            } else {
                                pin.value = Math.max(0, Math.min(1023, Math.floor(1023 - v)));
                            }
                        }
                        this.updatePin(pin, index);
                    },
                    // stop
                    (ev: MouseEvent) => {
                        let state = this.board;
                        let pin = state.edgeConnectorState.pins[index];
                        let svgpin = this.pins[index];
                        svg.removeClass(svgpin, "touched");
                        this.updatePin(pin, index);
                        return false;
                    });
            })
            this.pins.slice().forEach((btn, index) => {
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
        }
    }
}