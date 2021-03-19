import { Component, ComponentInstance } from "./component";

const _Controller = new (class Controller {
    public components: { [id: string]: Component } = {};
    public componentsInstances: { [id: string]: ComponentInstance } = {};
    public componentTraits: { [id: string]: Trait[] } = {};

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

export default _Controller;