import { EventEmitter } from "events";

import Router from "../router";
import Controller from "./index";
import { parseStyle } from "../style";
import { genRandId } from "../etc/rand";

export class ComponentInstance {
    public id: string;
    public label: string;
    public attributes: any;
    public content: string;

    protected vars: any = {};
    private style: any = {};
    private baseContent: string;

    public DOMElem: HTMLDivElement;
    public originContainer: HTMLElement = Router.getElem();
    public childrens: any[] = [];

    public appened: boolean = false;

    private replaceStrByVar(str: string) {
        return str.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub])
                return this.vars[sub];
            return save;
        });
    }

    public rebuildContent() {
        // <([^>]+)>((?:(?!</\1).)*)</\1> : Match every tags

        // Parse style from inner body
        const style = (this.content.match(/<style>(.|\n)*?<\/style>/)) ? this.content.match(/<style>(.|\n)*?<\/style>/)[0]?.split("<style>")[1]?.split("</style>")[0] : void 0;
        this.content = (this.style) ? `<style>${(style || "") + parseStyle(this.style)}</style>${this.baseContent}` : this.baseContent;
        this.content = this.replaceStrByVar(this.content);
        this.DOMElem.innerHTML = this.content;
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

    public remove() {
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

    public getFirstChild(key: string) {
        return this.getChilds(key)[0];
    }

    public constructor(label: string, content: string, element: any, { style, vars = [], id }: any) {
        this.label = label;
        this.content = content;
        this.baseContent = content as string;
        this.vars = JSON.parse(JSON.stringify(vars));
        this.attributes = this.vars;
        this.style = style;
        this.DOMElem = element;
        this.id = id;
        this.rebuildContent();
        this.parseChildren(this.DOMElem);

        console.log("Component instance spawned:", this.label);
    };
};

export class Component {
    public id: string;
    public label: string;
    public category: string;
    public content: string;
    public attributes: any;
    private vars: any = {};
    private style: any = {};

    public constructor(label: string, content: string, { style, category = "Default", vars = {}, hideFromStack = false }: any = {}) {
        //super();
        this.id = label;
        this.label = label;
        this.category = category;
        this.attributes = vars;
        this.style = style;
        this.vars = vars;
        this.content = content;

        (!hideFromStack) ? Controller.components[this.label] = this : void 0;
    };

    public create(): ComponentInstance {
        const randId = genRandId(5);
        const el = document.createElement("div");
        el.setAttribute("id", randId);
        el.setAttribute("component-instance", "true");
        const compInstance = new ComponentInstance(this.label, this.content, el, { style: this.style, vars: this.vars });
        Controller.componentsInstances[randId] = compInstance;
        return compInstance;
    };

    public createAndAppend(): ComponentInstance {
        const com = this.create();
        com.append();
        return com;
    };
};