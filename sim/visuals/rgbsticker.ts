namespace pxsim.visuals {
    export class RGBSticker {
        protected root: SVGSVGElement;
        protected leds: SVGCircleElement[];

        protected left: number;
        protected top: number;

        constructor() {
            this.root = pxsim.svg.parseString(RGB_STICKER_SVG);
            this.leds = toArray(this.root.getElementsByTagName("circle")).reverse();
        }

        getSVG() {
            return this.root;
        }

        setLED(index: number, color: [number, number, number]) {
            if (index >= this.leds.length) return;
            const led = this.leds[index];

            let hsl = visuals.rgbToHsl(color);
            let [h, s, l] = hsl;
            let lx = Math.max(l * 1.3, 85);
            // at least 10% luminosity
            l = l * 90 / 100 + 10;
            led.style.stroke = `hsl(${h}, ${s}%, ${Math.min(l * 3, 75)}%)`
            led.style.strokeWidth = "1.5";
            svg.fill(led, `hsl(${h}, ${s}%, ${lx}%)`)
            svg.filter(led, `url(#smallneopixelglow)`);
        }

        moveTo(left: number, top: number) {
            this.root.setAttribute("x", left + "");
            this.root.setAttribute("y", top + "");
            this.left = left;
            this.top = top;
        }

        groundLocation(): [number, number] {
            return [(this.left || 0) + 100, (this.top | 0) + 50];
        }

        powerLocation(): [number, number] {
            return [(this.left || 0) + 100, (this.top | 0) + 20];
        }

        dataLocation(): [number, number] {
            return [(this.left || 0) + 5, (this.top | 0) + 20];
        }

        createDataPath(pinLocation: [number, number]) {
            const end = this.dataLocation();
            const bendY = pinLocation[1] + ((this.top - pinLocation[1]) / 2);
            const path: [number, number][] = [
                pinLocation,
                [pinLocation[0], bendY],
                [this.left - 20, bendY],
                [this.left - 20, end[1]],
                end
            ];
            return createCopperTapePath(path);
        }
    }

    export function createCopperTapePath(points: [number, number][]) {
        const p: SVGPathElement = svg.elt("path") as SVGPathElement;
        let d = `M ${points[0][0]} ${points[0][1]}`
        for (let i = 1; i < points.length; i++) {
            d += ` L ${points[i][0]} ${points[i][1]}`
        }
        // d += " z";

        p.setAttribute("d", d);
        p.setAttribute("stroke-width", "5px");
        p.setAttribute("stroke", "#ffd42a");
        p.setAttribute("fill", "none");

        return p;
    }

    function toArray<U extends Element>(c: NodeListOf<U>): U[] {
        const res: U[] = [];

        for (let i = 0; i < c.length; i++) {
            res.push(c.item(i));
        }

        return res;
    }

    function translateX(point: [number, number], value: number): [number, number] {
        return [point[0] + value, point[1]];
    }

    function translateY(point: [number, number], value: number): [number, number] {
        return [point[0], point[1] + value];
    }
}