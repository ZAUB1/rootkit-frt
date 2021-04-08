import type { Trait } from "../editor/decorators";
import type { NucleusComponent, NucleusInstance } from "./component";

const _Nucleus = new (class Nucleus {
    // Holding all components classes in key value pair
    public components: { [id: string]: NucleusComponent } = {};
    // All component instances created since t(0) stored by id / value
    public componentsInstances: { [id: string]: NucleusInstance } = {};

    // NucleusComponent editors cateogiers
    public componentsCategories: NucleusComponent[][] = [ [], [], [], [] ];
    // Event handler (stored by original brower event name)
    public componentHandlers: { [id: string]: any } = {};

    public getComponent(id: string): NucleusComponent {
        if (!id || !this.components[id])
            return undefined;
        return this.components[id];
    };

    public getComponentInstance(id: string): NucleusInstance {
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

export default _Nucleus;