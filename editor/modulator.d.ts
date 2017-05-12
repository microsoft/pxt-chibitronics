declare class ModulationController {
    constructor(params?: any);
    transcodeToAudioTag(array: any, tag: any, audioType: any, lbr: boolean, version: number): void;

    getPcmData(): any;
    stop(): void;
    isRunning(): boolean;
    getRawWavData(array: any, lbr: boolean, version: number): any[];
}

declare interface ModulationControllerConstructor {
    new(params?: any) : ModulationController;
}

declare module "chibitronics-ltc-modulate" {
    let m: ModulationControllerConstructor;
    export = m;
}