import Controller from "../";

export function Vars(vars: { [key: string]: any } = {}) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).vars = vars;
            }
        }
        return nclass;
    }
};

export function Click(cb: Function) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                if (!Controller.componentHandlers[(this as any).label])
                    Controller.componentHandlers[(this as any).label] = {}
                Controller.componentHandlers[(this as any).label].click = cb;
            }
        }
        return nclass;
    }
};

export function Rendered(cb: Function) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).renderHandler = cb;
            }
        }
        return nclass;
    }
};