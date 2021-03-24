import { Trait } from "./decorators/editor";
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

export default _Controller;