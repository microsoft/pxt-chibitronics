/// <reference path="../node_modules/pxt-core/localtypings/blockly.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxt.editor {

    export class FieldColorWheel extends Blockly.FieldSlider implements Blockly.FieldCustom {
        public isFieldCustom_ = true;

        private params: any;

        /**
         * Class for a color wheel field.
         * @param {number|string} value The initial content of the field.
         * @param {Function=} opt_validator An optional function that is called
         *     to validate any constraints on what the user entered.  Takes the new
         *     text as an argument and returns either the accepted text, a replacement
         *     text, or null to abort the change.
         * @extends {Blockly.FieldNumber}
         * @constructor
         */
        constructor(value_: any, params: any, opt_validator?: () => void) {
            super(String(value_), '0', '255', null, '10', 'Color', opt_validator);
            this.params = params;
        }

        /**
         * Set the gradient CSS properties for the given node and channel
         * @param {Node} node - The DOM node the gradient will be set on.
         * @private
         */
        setBackground_(node: Element) {
            let gradient = this.createColourStops_().join(',');
            goog.style.setStyle(node, 'background',
                '-moz-linear-gradient(left, ' + gradient + ')');
            goog.style.setStyle(node, 'background',
                '-webkit-linear-gradient(left, ' + gradient + ')');
            goog.style.setStyle(node, 'background',
                '-o-linear-gradient(left, ' + gradient + ')');
            goog.style.setStyle(node, 'background',
                '-ms-linear-gradient(left, ' + gradient + ')');
            goog.style.setStyle(node, 'background',
                'linear-gradient(left, ' + gradient + ')');
            if (this.params['sliderWidth'])
                goog.style.setStyle(node, 'width',
                    `${this.params['sliderWidth']}px`)
        };

        createColourStops_() {
            let stops: string[] = [];
            for (let n = 0; n <= 255; n += 20) {
                stops.push(this.colorWheel(n));
            }
            return stops;
        };

        colorWheel(wheelPos: number): string {
            wheelPos = 255 - wheelPos;
            if (wheelPos < 85) {
                return this.hex(255 - wheelPos * 3, 0, wheelPos * 3);
            }
            if (wheelPos < 170) {
                wheelPos -= 85;
                return this.hex(0, wheelPos * 3, 255 - wheelPos * 3);
            }
            wheelPos -= 170;
            return this.hex(wheelPos * 3, 255 - wheelPos * 3, 0);
        }

        private hex(red: number, green: number, blue: number): string {
            return `#${this.componentToHex(red & 0xFF)}${this.componentToHex(green & 0xFF)}${this.componentToHex(blue & 0xFF)}`;
        }
        private componentToHex(c: number) {
            let hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
    }
}

export = pxt.editor.FieldColorWheel;