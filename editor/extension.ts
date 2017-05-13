/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />
/// <reference path="./modulator.d.ts"/>

import ModControllerConstructor = require("chibitronics-ltc-modulate");
import lf = pxt.Util.lf;

let modController: ModulationController = null;

namespace chibitronics {
    function showUploadInstructionsAsync(confirmAsync: (confirmOptions: {}) => Promise<number>, fn: string, url: string): Promise<void> {
        if (!confirmAsync) {
            return Promise.resolve();
        }
        const boardName = pxt.appTarget.appTheme.boardName;
        const htmlBody = `<ul>
        <li>${lf("Set your {0} to program mode", boardName)}</li>
        <li>${lf("Click 'Open' to play the .wav file in your computer's default music player")}</li>
        <li>${lf("If your program doesn't run on your {0}, try replaying the file from the beginning", boardName)}</li>
        </ul>`;
        return confirmAsync({
            header: lf("Upload instructions"),
            htmlBody,
            hideCancel: true,
            agreeLbl: lf("Done!"),
            timeout: 12000
        }).then(() => { });
    }

    export function initExtensionsAsync(opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug("loading chibitronics target extensions...")
        const res: pxt.editor.ExtensionResult = {
            beforeCompile: () => {
                // Play silence, in order to unblock audio.
                let audioTag = document.getElementById("modulatorAudioOutput") as HTMLAudioElement;
                audioTag.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
                audioTag.play();
            },
            deployCoreAsync: (resp: pxtc.CompileResult) => {
                //core.infoNotification(lf("Here's a tune..."));
                let lbrEnable = false;
                let modulationVersion = 2;
                let audioFormat = "wav";

                let bin = ltcIhexToBinary(resp.outfiles[pxtc.BINARY_HEX]);

                let hex = resp.outfiles[pxtc.BINARY_HEX];

                function getCanvas(): HTMLCanvasElement {
                    return document.getElementById("modulatorWavStrip") as HTMLCanvasElement;
                }
                function getAudioElement(): HTMLAudioElement {
                    return document.getElementById("modulatorAudioOutput") as HTMLAudioElement;
                }
                function getWaveFooter() {
                    return document.getElementById("modulatorWrapper");
                }

                function ltcIhexToBinary(ihex: string): Uint8Array {
                    let hex = ihex.split("\n");
                    let hexOutput: string[] = [];

                    for (let i = 0; i < hex.length; ++i) {
                        let m = /^:..(....)00(.{4,})/.exec(hex[i]);
                        if (!m) continue;

                        // Skip past the :, count, address, and record type fields, and chop off the checksum
                        let s = hex[i].slice(9, hex[i].length - 2);
                        let step = 2;
                        while (s.length >= step) {
                            let hexb = s.slice(0, step);
                            hexOutput.push(hexb);
                            s = s.slice(step)
                        }
                    }

                    let output = new Uint8Array(hexOutput.length);
                    for (let i = 0; i < hexOutput.length; i++) {
                        output[i] = parseInt(hexOutput[i], 16);
                    }
                    return output;
                }

                function renderWave(e: any) {
                    let aud = e.target;
                    let current = aud.currentTime;
                    let end = aud.duration;
                    let canvas = getCanvas();

                    if (!canvas || !canvas.getContext || !modController || !end) {
                        return;
                    }

                    let strip = canvas.getContext("2d");

                    // Resize the canvas to be the window size.
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;

                    let h = strip.canvas.height;
                    let w = strip.canvas.width;
                    strip.clearRect(0, 0, w, h);

                    let y: number;
                    // Draw scale lines at 10% interval
                    strip.lineWidth = 1.0;
                    strip.strokeStyle = "#55a";
                    strip.beginPath();
                    y = 1 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 2 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 3 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 4 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 5 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 6 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 7 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 8 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    y = 9 * (h / 10);
                    strip.moveTo(0, y);
                    strip.lineTo(w, y);
                    strip.stroke();

                    strip.strokeStyle = "#fff";
                    strip.lineWidth = 1.0;

                    let buffer = modController.getPcmData();
                    let b = Math.floor(buffer.length * ((current * 1.0) / end));
                    let lastSample = (buffer[b++] + 32768) / 65536.0; // map -32768..32768 to 0..1

                    for (let x = 1; x < canvas.width; x++) {
                        let sample = (buffer[b++] + 32768) / 65536.0;
                        if (b > buffer.length) {
                            break;
                        }
                        strip.beginPath();
                        strip.moveTo(x - 1, h - lastSample * h);
                        strip.lineTo(x, h - sample * h);
                        strip.stroke();
                        lastSample = sample;
                    }
                }

                if (modController) {
                    modController.stop();
                }

                modController = new ModControllerConstructor({
                    canvas: getCanvas(),
                    lbr: lbrEnable,
                    endCallback: function () {
                        getWaveFooter().style.visibility = "hidden";
                        getWaveFooter().style.opacity = "0";
                        pxt.log("Completed audio modulation");
                    }
                });

                let audio = getAudioElement();
                if (pxt.BrowserUtils.isIE()) {
                    // For IE, download the raw WAV data to a .wav file
                    let resolve: (thenableOrResult?: void | PromiseLike<void>) => void;
                    let reject: (error: any) => void;
                    const deferred = new Promise<void>((res, rej) => {
                        resolve = res;
                        reject = rej;
                    });
                    const data = new Uint8Array(modController.getRawWavData(bin, lbrEnable, modulationVersion));
                    const fn = resp.downloadFileBaseName + ".wav";
                    pxt.debug('saving ' + fn)
                    const url = pxt.BrowserUtils.browserDownloadUInt8Array(
                        data,
                        fn,
                        "audio/wav",
                        resp.userContextWindow,
                        reject
                    );
                    showUploadInstructionsAsync(resp.confirmAsync, fn, url)
                        .then(() => resolve());
                    return deferred;
                } else {
                    // For all other browsers, play the sound directly in the browser
                    modController.transcodeToAudioTag(bin,
                        audio,
                        audioFormat,
                        lbrEnable,
                        modulationVersion);
                    resp.saveOnly = true;

                    audio.ontimeupdate = renderWave;
                    getWaveFooter().style.visibility = "visible";
                    getWaveFooter().style.opacity = "1";

                    return Promise.resolve();
                }
            }
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}
pxt.editor.initExtensionsAsync = chibitronics.initExtensionsAsync;