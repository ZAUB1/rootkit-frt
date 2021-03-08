import { EventEmitter } from "events";

import Controller from "./index";
import { editor } from "../editor";
import { parseStyle } from "../style";

class ComponentInstance {
    public id: string;
    public label: string;
    public attributes: any;
    public content: string | object;
    private vars: any = {};
    private style: any = {};
    private traits: any = {};
    private baseContent: string;
    public DOMElem: any;

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
        this.content = (this.style) ? `<style>${parseStyle(this.style)}</style>${this.baseContent}` : this.baseContent;
        this.content = `<${this.label.toLowerCase()}>${this.replaceStrByVar(this.content)}</${this.label.toLowerCase()}>`
        this.DOMElem.innerHTML = this.content;
    };

    public updateAttributesHandler(changed: any) {
        const changedKeys = Object.keys(changed);
        const changedVals = Object.values(changed);
        for (let i = 0; i < changedKeys.length; i++) {
            const changedKey = changedKeys[i];
            if (this.vars[changedKey])
                this.vars[changedKey] = changedVals[i];
            const foundTrait = this.traits.find((trait: any) => trait.name == changedKey);
            if (!foundTrait)
                continue;
            (foundTrait.cb) ? foundTrait.cb(this) : void 0;
        }
    };

    public constructor(label: string, content: string | object, element: any, { style, traits = [], vars = [], id }: any) {
        this.label = label;
        this.content = content;
        this.baseContent = content as string;
        this.vars = JSON.parse(JSON.stringify(vars));
        this.attributes = this.vars;
        this.style = style;
        this.traits = traits;
        this.DOMElem = element;
        this.id = id;
        this.rebuildContent();

        console.log("Component instance spawned")
    };
};

export class Component extends EventEmitter {
    public id: string;
    public label: string;
    public category: string;
    public content: string | object;
    public attributes: any;

    public constructor(label: string, content: string | object, attributes: object = {}, { style, traits = [], category = "Default", vars = {} }: any = {}) {
        super();
        this.id = label;
        this.label = label;
        this.category = category;
        this.attributes = vars;

        if (typeof content == "string")
            this.content = (style) ? `<style>${parseStyle(style)}</style>${content}` : content;
        else
            this.content = content;

        traits = traits.map((trait: any) => {
            return {
                changeProp: 1,
                ...trait
            }
        });

        const baseModel = editor.DomComponents.getType("default");
        if (typeof content == "string") {
            const _this = this;
            editor.DomComponents.addType(label.toLowerCase(), {
                model: {
                    defaults: {
                        ...baseModel,
                        traits: traits,
                    },
                    init() {
                        setTimeout(() => {
                            Controller.components[this.ccid] = new ComponentInstance(_this.label, _this.content, this.view.el, { style, traits, vars, id: this.ccid });
                        }, 0)
                    },
                    updated() {
                        if (!this._changing)
                            return;
                        Controller.components[this.ccid].updateAttributesHandler(this.changed);
                        Controller.components[this.ccid].rebuildContent();
                    }
                },
                isComponent: (el: any) => {
                    if (el && el.classList && el.classList.contains(label.toLowerCase()))
                        return { type: label.toLowerCase() }
                },
                view: {
                    removed() {
                        console.log(this.el.id)
                        delete Controller.components[this.el.id];
                    }
                }
            });
        }

        editor.BlockManager.add(label, {
            id: this.id,
            label: this.label,
            content: this.content,
            category: this.category,
            attributes: attributes
        });
    };
};