import Controller from "./index";
import { genRandId } from "../etc/rand";
import EventEmitter from "../etc/events";

import { ComponentInstance } from "./instance";
export { ComponentInstance } from "./instance";

export class Component extends EventEmitter {
    public id: string;
    public label: string;
    public category: string;
    public content: string;
    public attributes: any;
    private vars: any = {};
    private style: any = {};
    public hideFromStack: boolean = false;
    public appendHandler: Function;

    public constructor(label: string, content: string, { style, category = "Default", vars = {}, hideFromStack = false }: any = {}) {
        super();
        this.id = label;
        this.label = label;
        this.category = category;
        this.attributes = vars;
        this.style = style;
        this.vars = vars;
        this.content = content;
        this.hideFromStack = hideFromStack;

        (!hideFromStack) ? Controller.components[this.label] = this : void 0;
    };

    public create(): ComponentInstance {
        const randId = genRandId(5);
        const el = document.createElement("div");
        el.setAttribute("id", randId);
        el.setAttribute("component-instance", "true");
        const compInstance = new ComponentInstance(this.label, this.content, el, { style: this.style, vars: this.vars, origin: this });
        (!this.hideFromStack) ? Controller.componentsInstances[randId] = compInstance : void 0;
        this.emit("instance::created", compInstance);
        return compInstance;
    };

    public createAndAppend(): ComponentInstance {
        const com = this.create();
        com.append();
        return com;
    };

    public getByModel(model: string): ComponentInstance {
        for (const comp of Object.values(Controller.componentsInstances)) {
            if (comp?.model == model)
                return comp;
        }
    };
};