import Router from "&/core/router";
import Controller from "&/core/controllers";
import { parseStyle } from "&/core/style";
import EventEmitter, { COMP_EVENTS } from "&/core/etc/events";

import { Component } from "../component";
import { camelToSnake } from "&/core/etc/str";

const DOM_EVENTS = [ "click", "mouseover", "contextmenu" ];
const SPE_OPERAT = [ "for", "if" ];

export class ComponentInstance extends EventEmitter {
    public id: string;
    public label: string;
    public attributes: any;
    public content: string;
    public model: string;

    public vars: any = {};
    private style: any = {};
    private baseContent: string;

    public DOMElem: HTMLDivElement;
    public originContainer: HTMLElement = Router.getElem();
    public childrens: any[] = [];

    public appened: boolean = false;

    public origin: Component;
    public parent: ComponentInstance;
    public parentOriginId: string;
    private models: { [id: string]: ComponentInstance | HTMLElement } = {};

    private replaceStrByVar(str: string) {
        return str.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub] != undefined)
                return this.vars[sub];
            return save;
        });
    }

    private replaceCssByVar(str: string) {
        return str.replace(/\{ (.*?) \}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub] != undefined)
                return this.vars[sub];
            return save;
        });
    }

    private spawnSubComps(el: HTMLElement): void {
        const tagNames = Object.keys(Controller.components).map(tag => tag.toLowerCase());
        for (const child of el.children as any) {
            // Special components for loops and conditions handling
            const opName = child.nodeName.toLowerCase().split("nuc-")[1];
            if (SPE_OPERAT.includes(opName)) {
                if (opName == "for") {
                    const [ite, _, array, iterator] = Object.values(child.attributes).map((val: Attr) => val.name);
                    if (!this.vars[array])
                        continue;
                    let pos = 0;
                    let res = "";
                    const baseContent = child.innerHTML as string;
                    for (const _ite of this.vars[array]) {
                        const comp = new Component("",
                            baseContent.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => sub.replace(new RegExp(`${ite}.`, "g"), "")),
                            { hideFromStack: true }).create();
                        comp.vars = _ite;
                        iterator ? comp.vars[iterator.split("[")[1].split("]")[0]] = pos++ : void 0;
                        comp.rebuildContent();
                        res += comp.content;
                    }
                    child.outerHTML = res;
                }
                continue;
            }

            // Is tag a component ?
            if (!tagNames.includes(child.nodeName.toLowerCase())) {
                const model = child.attributes.getNamedItem("nuc-model")?.value;
                (model) ? this.models[model] = child as HTMLElement : void 0;

                this.spawnSubComps(child as HTMLElement);
                continue;
            }

            // Create component
            const nodeName = child.nodeName.toLowerCase();
            const comp: Component = Controller.components[`${nodeName.charAt(0).toUpperCase()}${nodeName.slice(1, nodeName.length)}`];
            const compInstance = comp.create();

            // Look for model
            compInstance.model = child.attributes.getNamedItem("nuc-model")?.value;
            compInstance.model ? this.models[compInstance.model] = compInstance : void 0;

            // Look for default vars
            const keys = Object.keys(compInstance.vars);
            for (const key of keys) {
                const childVal = child.attributes.getNamedItem(camelToSnake(key));
                if (!childVal)
                    continue;
                compInstance.vars[key] = childVal.value;
            }

            // Saving parent
            compInstance.parent = this;
            compInstance.parentOriginId = this.id;
            compInstance.rebuild();
            compInstance.renderTo(child as HTMLElement);
            this.spawnSubComps(compInstance.DOMElem);
        }
    };

    public rebuild() {
        let style = "<style>"
        style += (this.baseContent.match(/<style>(.|\n)*?<\/style>/)) ? this.baseContent.match(/<style>(.|\n)*?<\/style>/)[0]?.split("<style>")[1]?.split("</style>")[0] : "";
        style = this.replaceCssByVar(style);
        style += (this.style) ? this.replaceCssByVar(parseStyle(this.style)) : "";
        style += "</style>"
        style = (style || "").replace(/(\.([a-zA-Z_-]{1}[\w-_]+))/g, (sub: string, ..._): any => {
            return `#${this.DOMElem.id} ${sub}`;
        });
        this.content = (style || "") + this.replaceStrByVar(this.baseContent);
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

    public render() {
        this.originContainer.appendChild(this.DOMElem);
        this.appened = true;
        this.origin.renderHandler && this.origin.renderHandler(this);
    };

    public renderTo(comp: ComponentInstance): void
    public renderTo(container: HTMLElement): void
    public renderTo(elem: ComponentInstance | HTMLElement): void {
        this.originContainer = (elem instanceof ComponentInstance) ? elem.DOMElem : elem;
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

    public getCompByModel(model: string): ComponentInstance | HTMLElement {
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

    public constructor(label: string, content: string, element: any, { style, vars = [], origin }: any) {
        super();
        this.label = label;
        this.content = content;
        this.baseContent = content as string;
        this.vars = JSON.parse(JSON.stringify(vars));
        this.attributes = this.vars;
        this.style = style;
        this.DOMElem = element;
        this.id = this.DOMElem.id;
        this.origin = origin;
        this.rebuildContent();

        for (const eventName of DOM_EVENTS)
            this.DOMElem.addEventListener(eventName, (ev) => { this.emitEventListener(eventName, ev) });
    };
};