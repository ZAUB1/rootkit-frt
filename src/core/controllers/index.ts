import { Component, ComponentInstance } from "./component";

const _Controller = new (class Controller {
    public components: { [id: string]: Component } = {};
    public componentsInstances: { [id: string]: ComponentInstance } = {};

    public componentTraits: { [id: string]: Trait[] } = {};
    public componentIcons: { [id: string]: string } = {};

    public componentsCategories: Component[][] = [ [], [], [], [] ];
    public componentHandlers: { [id: string]: any } = {};

    public getComponent(id: string): Component {
        if (!id || !this.components[id])
            return undefined;
        return this.components[id];
    };

    public getComponentInstance(id: string): ComponentInstance {
        if (!id || !this.componentsInstances[id])
            return undefined;
        return this.componentsInstances[id];
    };

    public constructor() {
        // Garbage collector
        setInterval(() => {
            /* Object.values(this.componentsInstances).filter(instance => {
                if (instance.append)
                    return;
                instance.remove();
                console.warn("Garbage collector deleted:", instance.label);
            }); */
        }, 3000);
    }
});

interface Trait {
    type: string;
    label: string;
    name: string;

    placeholder?: string;
    options?: object;
    min?: number;
    max?: number;
    step?: number;
    valueTrue?: string;
    valueFalse?: string;
}

export function Traits(traits: Trait[] = []) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                _Controller.componentTraits[(this as any).label] = traits;
            }
        }
        return nclass;
    }
}

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
}

export function Icon(icon: string = "fas fa-pen") {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                _Controller.componentIcons[(this as any).label] = icon;
            }
        }
        return nclass;
    }
}

export function Category(category: string = "Containers") {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                switch (category) {
                    case "Containers":
                        _Controller.componentsCategories[0].push(this as any);
                        break;
                    case "Interacts":
                        _Controller.componentsCategories[1].push(this as any);
                        break;
                    case "ApiLinked":
                        _Controller.componentsCategories[2].push(this as any);
                        break;
                }
            }
        }
        return nclass;
    }
}

export function Click(cb: Function) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                if (!_Controller.componentHandlers[(this as any).label])
                    _Controller.componentHandlers[(this as any).label] = {}
                _Controller.componentHandlers[(this as any).label].click = cb;
            }
        }
        return nclass;
    }
}

export function Appened(cb: Function) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                console.log((this as any).appendHandler);
                (this as any).appendHandler = cb;
            }
        }
        return nclass;
    }
}

export default _Controller;