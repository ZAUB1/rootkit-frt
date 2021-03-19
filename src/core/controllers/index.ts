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
    return function (constructor: Function) {
        _Controller.componentTraits[constructor.name] = traits;
    }
}

export default _Controller;