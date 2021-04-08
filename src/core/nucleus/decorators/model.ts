import Nucleus from "..";
import type { NucleusInstance } from "../instance";

export function ModelEventHandler(model: string, event: string, cb: (comp: NucleusInstance | HTMLElement) => void) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).on("instance::created", (_this: NucleusInstance) => {
                    let comp = _this.getCompByModel(model);
                    (comp instanceof HTMLElement) ?
                        _this.events.addElementEventHandler(model, event, cb) :
                        (comp as NucleusInstance)?.on(event, () => { cb.call(_this, comp) });
                });
            }
        }
        return nclass;
    }
}

export function ModelCreated(model: string, cb: Function) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).on("instance::created", (_this: NucleusInstance) => { cb(_this) });
            }
        }
        return nclass;
    }
}