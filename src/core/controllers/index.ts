import { Trait } from "./decorators/editor";
import { Component, ComponentInstance } from "./component";

const _Controller = new (class Controller {
    // Holding all components classes in key value pair
    public components: { [id: string]: Component } = {};
    // All component instances created since t(0) stored by id / value
    public componentsInstances: { [id: string]: ComponentInstance } = {};

    // Component editors cateogiers
    public componentsCategories: Component[][] = [ [], [], [], [] ];
    // Event handler (stored by original brower event name)
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
                if (instance.render)
                    return;
                instance.remove();
                console.warn("Garbage collector deleted:", instance.label);
            }); */
        }, 3000);
    }
});

export default _Controller;