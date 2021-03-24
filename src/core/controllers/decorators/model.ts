import Controller from "../";
import { ComponentInstance } from "../instance";

export function ModelEventHandler(model: string, event: string, cb: Function) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).on("instance::created", (_this: ComponentInstance) => {
                    const comp = _this.getCompByModel(model);
                    comp?.on(event, () => { cb(comp) });
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
                (this as any).on("instance::created", (_this: ComponentInstance) => { cb(_this) });
            }
        }
        return nclass;
    }
}