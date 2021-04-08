import Nucleus from "./index";
import { genRandId } from "&/core/etc/rand";
import EventEmitter from "&/core/etc/events";

import { NucleusInstance } from "./instance";
export { NucleusInstance } from "./instance";

export class NucleusComponent extends EventEmitter {
    // NucleusComponent name
    public label: string;
    // Category
    public category: string;
    // HTML original content (not parsed)
    public content: string;
    // Original vars
    private vars: any = {};
    // Original style
    private style: any = {};
    // Should this not be pushed with the other instances
    public hideFromStack: boolean = false;
    // render handler
    public renderHandler: Function;
    public buildHandler: Function;

    public constructor(label: string, content: string, { style, category = "Default", vars = {}, hideFromStack = false }: any = {}) {
        super();
        this.label = label;
        this.category = category;
        this.style = style;
        this.vars = vars;
        this.content = content;
        this.hideFromStack = hideFromStack;

        (!hideFromStack) ? Nucleus.components[this.label] = this : void 0;
    };

    // Generate NucleusInstance from NucleusComponent
    public create(): NucleusInstance {
        const randId = genRandId(5);
        const el = document.createElement("div");
        el.setAttribute("id", randId);
        el.setAttribute(`data-${randId}`, "true");
        el.setAttribute("component-instance", "true");
        const compInstance = new NucleusInstance(this.label, this.content, el, { style: this.style, vars: this.vars, origin: this });
        (!this.hideFromStack) ? Nucleus.componentsInstances[randId] = compInstance : void 0;
        this.emit("instance::created", compInstance);
        return compInstance;
    };

    // Generate and add to main UI
    public createAndRender(): NucleusInstance {
        const com = this.create();
        com.render();
        return com;
    };

    // Retreive comp class by its model
    public getByModel(model: string): NucleusInstance {
        for (const comp of Object.values(Nucleus.componentsInstances)) {
            if (comp?.model == model)
                return comp;
        }
    };
};