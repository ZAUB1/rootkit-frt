import Router from "../../router";
import Controller from "../index";
import { parseStyle } from "../../style";
import EventEmitter, { COMP_EVENTS } from "../../etc/events";

import { Component } from "../component";

const DOM_EVENTS = [ "click", "mouseover", "contextmenu" ];

export class ComponentInstance extends EventEmitter {
    public id: string;
    public label: string;
    public attributes: any;
    public content: string;
    public model: string;

    protected vars: any = {};
    private style: any = {};
    private baseContent: string;

    public DOMElem: HTMLDivElement;
    public originContainer: HTMLElement = Router.getElem();
    public childrens: any[] = [];

    public appened: boolean = false;

    public origin: Component;
    public parent: ComponentInstance;
    private models: { [id: string]: ComponentInstance } = {};

    private replaceStrByVar(str: string) {
        return str.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub])
                return this.vars[sub];
            return save;
        });
    }

    private replaceCssByVar(str: string) {
        return str.replace(/\{ (.*?) \}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub])
                return this.vars[sub];
            return save;
        });
    }

    private spawnSubComps(el: HTMLElement): void {
        const tagNames = Object.keys(Controller.components).map(tag => tag.toLowerCase());
        for (const child of el.children) {
            // Is tag a component ?
            if (!tagNames.includes(child.nodeName.toLowerCase())) {
                this.spawnSubComps(child as HTMLElement);
                continue;
            }

            // Create component
            const nodeName = child.nodeName.toLowerCase();
            const comp: Component = Controller.components[`${nodeName.charAt(0).toUpperCase()}${nodeName.slice(1, nodeName.length)}`];
            const compInstance = comp.create();

            // Look for model
            compInstance.model = child.attributes.getNamedItem("model")?.value;
            compInstance.model ? this.models[compInstance.model] = compInstance : void 0;

            // Look for default vars
            const keys = Object.keys(compInstance.vars);
            for (const key of keys) {
                const childVal = child.attributes.getNamedItem(key);
                if (!childVal)
                    continue;
                compInstance.vars[childVal.name] = childVal.value;
            }

            // Saving parent
            compInstance.parent = this;
            compInstance.rebuild();
            compInstance.appendTo(child as HTMLElement);
            return this.spawnSubComps(compInstance.DOMElem);
        }
    };

    public rebuild() {
        const style = (this.content.match(/<style>(.|\n)*?<\/style>/)) ? this.content.match(/<style>(.|\n)*?<\/style>/)[0]?.split("<style>")[1]?.split("</style>")[0] : void 0;
        this.content = (this.style) ? `<style>${(style || "") + this.replaceCssByVar(parseStyle(this.style))}</style>${this.baseContent}` : this.baseContent;
        this.content = this.replaceStrByVar(this.content);
        this.DOMElem.innerHTML = this.content;

        this.parseChildren(this.DOMElem);
    };

    public rebuildContent() {
        // Parse style from inner body
        this.rebuild();
        this.spawnSubComps(this.DOMElem);
    };

    private parseChildren(elem: any) {
        if (!elem.children.length)
            this.childrens.push(elem);
        for (let i = 0; i < elem.children.length; i++) {
            this.parseChildren(elem.children[i]);
            this.childrens.push(elem);
        }
    };

    public append() {
        this.originContainer.appendChild(this.DOMElem);
        this.appened = true;
        this.origin.appendHandler && this.origin.appendHandler(this);
    };

    public appendTo(comp: ComponentInstance): void
    public appendTo(container: HTMLElement): void
    public appendTo(elem: ComponentInstance | HTMLElement): void {
        this.originContainer = (elem instanceof ComponentInstance) ? elem.DOMElem : elem;
        this.append();
    };

    public moveTo(container: HTMLElement) {
        this.remove();
        this.appendTo(container);
    };

    public remove(): void {
        if (this.parent)
            return this.parent.remove();
        this.originContainer.removeChild(this.DOMElem);
        this.appened = false;
    };

    public getVar(key: string) {
        if (!this.vars[key])
            return false;
        return this.vars[key];
    };

    public setVar(key: string, value: any) {
        if (!this.vars[key])
            return;
        this.vars[key] = value;
        this.rebuildContent();
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

    public getCompByModel(model: string): ComponentInstance {
        if (!model)
            return undefined;
        return this.models[model];
    }

    public getFirstChild(key: string) {
        return this.getChilds(key)[0];
    }

    private emitEventListener(event: string, ..._: any) {
        this.emit(event, ..._);
        Controller?.componentHandlers
        && Controller?.componentHandlers[this.label]
        && Controller.componentHandlers[this.label][event] 
            ? Controller.componentHandlers[this.label][event](this, ..._) : void 0;
    }

    public constructor(label: string, content: string, element: any, { style, vars = [], id, origin }: any) {
        super();
        this.label = label;
        this.content = content;
        this.baseContent = content as string;
        this.vars = JSON.parse(JSON.stringify(vars));
        this.attributes = this.vars;
        this.style = style;
        this.DOMElem = element;
        this.id = id;
        this.origin = origin;
        this.rebuildContent();

        for (const eventName of DOM_EVENTS)
            this.DOMElem.addEventListener(eventName, (ev) => { this.emitEventListener(eventName, ev) });

        console.log("Component instance spawned:", this.label);
    };
};