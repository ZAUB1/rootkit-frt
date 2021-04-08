import Router from "&/core/nucleus-router";
import EventEmitter, { COMP_EVENTS } from "&/core/nucleus/etc/events";

import type { NucleusComponent } from "../component";

import ComponentDOM from "./dom";
import ComponentEvents from "./events";
import ComponentCompiler from "./compiler";

export class NucleusInstance extends EventEmitter {
    public id: string;
    public label: string;
    public attributes: any;
    public content: string;
    public model: string;

    public vars: any = {};
    public style: any = {};
    public baseContent: string;

    public DOMElem: HTMLDivElement;
    public originContainer: HTMLElement = Router.getElem();
    public childrens: any[] = [];

    public appened: boolean = false;

    public origin: NucleusComponent;
    public parent: NucleusInstance;
    public parentOriginId: string;
    public models: { [id: string]: NucleusInstance | HTMLElement } = {};

    private dom: ComponentDOM;
    public events: ComponentEvents;
    private compiler: ComponentCompiler;

    public rebuild() {
        console.time(`build-${this.id}${this.label ? ' (' + this.label + ')' : ''}`);
        // Parse style from inner body
        this.compiler.rebuild();
        this.dom.spawnSubComps(this.DOMElem);
        this.events.regenEventHandlers();
        this.origin.buildHandler ? this.origin.buildHandler(this) : void 0;
        console.timeEnd(`build-${this.id}${this.label ? ' (' + this.label + ')' : ''}`);
    };

    public parseChildren(elem: any) {
        if (!elem.children.length)
            this.childrens.push(elem);
        for (let i = 0; i < elem.children.length; i++) {
            this.parseChildren(elem.children[i]);
            this.childrens.push(elem);
        }
    };

    public render() {
        this.originContainer.appendChild(this.DOMElem);
        this.appened = true;
        this.origin.renderHandler && this.origin.renderHandler(this);
    };

    public renderTo(comp: NucleusInstance): void
    public renderTo(container: HTMLElement): void
    public renderTo(elem: NucleusInstance | HTMLElement): void {
        this.originContainer = (elem instanceof NucleusInstance) ? elem.DOMElem : elem;
        this.render();
    };

    public moveTo(container: HTMLElement) {
        this.remove();
        this.renderTo(container);
    };

    public remove(): void {
        if (this.parent)
            return this.parent.remove();
        this.originContainer.removeChild(this.DOMElem);
        this.appened = false;
    };

    public getVar(key: string) {
        if (this.vars[key] == undefined)
            return false;
        return this.vars[key];
    };

    public setVarNoBuild(key: string, value: any) {
        if (this.vars[key] == undefined)
            return;
        this.vars[key] = value;
    };

    public setVar(key: string, value: any) {
        this.setVarNoBuild(key, value);
        this.rebuild();
    };

    public getChilds(key: string = "*") {
        if (key == "*")
            return this.childrens;
        const childs = [];
        for (const child of this.childrens) {
            if (child.nodeName.toLowerCase() == key)
                childs.push(child);
        }
        return childs;
    };

    public getCompByModel(model: string): NucleusInstance | HTMLElement {
        if (!model)
            return undefined;
        return this.models[model];
    }

    public getFirstChild(key: string) {
        return this.getChilds(key)[0];
    }

    public setChildsAttrs(el: HTMLElement, prop: string, value: string) {
        if (!el)
            return;
        el.setAttribute(prop, value);
        if (!el.children.length)
            return;
        for (const child of el.children as any)
            this.setChildsAttrs(child as HTMLElement, prop, value);
    }

    public constructor(label: string, content: string, element: any, { style, vars = [], origin }: any) {
        super();

        // Initiate subs
        this.dom = new ComponentDOM(this);
        this.events = new ComponentEvents(this);
        this.compiler = new ComponentCompiler(this);

        this.label = label;
        this.content = content;
        this.baseContent = content as string;
        this.vars = JSON.parse(JSON.stringify(vars));
        this.attributes = this.vars;
        this.style = style;
        this.DOMElem = element;
        this.id = this.DOMElem.id;
        this.origin = origin;
        this.rebuild();
    };
};