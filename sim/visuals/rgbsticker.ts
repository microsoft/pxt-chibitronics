namespace pxsim.visuals {
    export class RGBSticker {
        protected root: SVGSVGElement;
        protected led: SVGCircleElement;

        protected left: number;
        protected top: number;

        constructor() {
            this.root = pxsim.svg.parseString(RGB_STICKER_SVG);
            this.led = this.root.getElementsByTagName("circle").item(0);
        }

        getSVG() {
            return this.root;
        }

        setLED(color: [number, number, number]) {
            let hsl = visuals.rgbToHsl(color);
            let [h, s, l] = hsl;
            let lx = Math.max(l * 1.3, 85);
            // at least 10% luminosity
            l = l * 90 / 100 + 10;
            this.led.style.stroke = `hsl(${h}, ${s}%, ${Math.min(l * 3, 75)}%)`
            this.led.style.strokeWidth = "1.5";
            svg.fill(this.led, `hsl(${h}, ${s}%, ${lx}%)`)
            svg.filter(this.led, `url(#smallneopixelglow)`);
        }

        moveTo(left: number, top: number) {
            this.root.setAttribute("x", left + "");
            this.root.setAttribute("y", top + "");
            this.left = left;
            this.top = top;
        }
    }

    export class RGBStickerStrip {
        protected stickers: RGBSticker[];
        protected root: SVGGElement;

        protected wireRoot: SVGGElement;
        protected stickerRoot: SVGGElement;

        protected groundWire: SVGPathElement;
        protected dataWire: SVGPathElement;
        protected powerWire: SVGPathElement;

        protected left: number;
        protected top: number;

        protected bottomSticker: SVGElement;
        protected dataSourceLocation: [number, number];
        protected groundSourceLocation: [number, number];
        protected powerSourceLocation: [number, number];

        get right() {
            return (this.left || 0) + this.stickers.length * 25;
        }

        constructor() {
            this.stickers = [];

            this.root = svg.elt("g") as SVGGElement;
            this.stickerRoot = svg.child(this.root, "g") as SVGGElement;
            this.wireRoot = svg.child(this.root, "g") as SVGGElement;
        }

        moveTo(left: number, top: number) {
            this.left = left;
            this.top = top;

            this.updateTransform();
        }

        getSVG() {
            return this.root;
        }

        setLED(index: number, color: [number, number, number]) {
            let didGrow = false;
            while (this.stickers.length < index + 1) {
                const newSticker = new RGBSticker();
                this.stickerRoot.insertBefore(newSticker.getSVG(), this.bottomSticker);
                newSticker.moveTo(25 * this.stickers.length, 0);
                this.stickers.push(newSticker);
                this.bottomSticker = newSticker.getSVG();
                didGrow = true;
            }

            if (didGrow) {
                this.updateAllPaths();
            }

            this.stickers[index].setLED(color);
        }

        groundLocation(): [number, number] {
            // The end of the ground copper tape path
            return [this.right - 10, (this.top | 0) + 55];
        }

        powerLocation(): [number, number] {
            // The end of the power copper tape path
            return [this.left + 5, (this.top | 0) + 35];
        }

        dataLocation(): [number, number] {
            // The end of the data copper tape path
            return [this.right, (this.top | 0) + 20];
        }

        setDataPinLocation(point: [number, number]) {
            this.dataSourceLocation = point;
            this.updateDataPath();
        }

        setGroundPinLocation(point: [number, number]) {
            this.groundSourceLocation = point;
            this.updateGroundPath();
        }

        setPowerPinLocation(point: [number, number]) {
            this.powerSourceLocation = point;
            this.updatePowerPath();
        }

        protected updateAllPaths() {
            this.updateDataPath();
            this.updateGroundPath();
            this.updatePowerPath();
        }

        protected updateGroundPath() {
            if (!this.groundSourceLocation) return;
            if (this.groundWire) this.wireRoot.removeChild(this.groundWire);

            const end = this.groundLocation();
            const path: [number, number][] = [
                this.groundSourceLocation,
                [this.groundSourceLocation[0], this.groundSourceLocation[1] - 18],
                [this.left - 25, this.groundSourceLocation[1] - 18],
                [this.left - 25, end[1]],
                end
            ];

            this.groundWire = createCopperTapePath(path);
            this.wireRoot.appendChild(this.groundWire);
        }

        protected updateDataPath() {
            if (!this.dataSourceLocation) return;
            if (this.dataWire) this.wireRoot.removeChild(this.dataWire);

            const end = this.dataLocation();
            const path: [number, number][] = [
                this.dataSourceLocation,
                [this.dataSourceLocation[0] + 15, this.dataSourceLocation[1]],
                [this.dataSourceLocation[0] + 15, this.dataSourceLocation[1] + 100],
                [this.left - 5, this.dataSourceLocation[1] + 100],
                [this.left - 5, end[1]],
                end
            ];

            this.dataWire = createCopperTapePath(path);
            this.wireRoot.appendChild(this.dataWire);
        }

        protected updatePowerPath() {
            if (!this.powerSourceLocation) return;
            if (this.powerWire) this.wireRoot.removeChild(this.powerWire);

            const end = this.powerLocation();
            const path: [number, number][] = [
                this.powerSourceLocation,
                [this.powerSourceLocation[0], this.powerSourceLocation[1] - 12],
                [this.left - 15, this.powerSourceLocation[1] - 12],
                [this.left - 15, end[1]],
                end
            ];

            this.powerWire = createCopperTapePath(path);
            this.wireRoot.appendChild(this.powerWire);
        }

        protected updateTransform() {
            this.stickerRoot.setAttribute("transform", `translate(${this.left} ${this.top})`)
        }
    }

    function createCopperTapePath(points: [number, number][]) {
        const p: SVGPathElement = svg.elt("path") as SVGPathElement;
        let d = `M ${points[0][0]} ${points[0][1]}`
        for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i][0]} ${points[i][1]}`
        }

        p.setAttribute("d", d);
        p.setAttribute("stroke-width", "5px");
        p.setAttribute("stroke", "#ffd42a");
        p.setAttribute("fill", "none");

        return p;
    }
}