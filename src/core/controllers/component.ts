import { EventEmitter } from "events";

import Controller from "./index";
import { editor } from "../editor";
import { parseStyle } from "../style";

function clone(obj: any) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export class Component extends EventEmitter {
    public id: string;
    public label: string;
    public category: string;
    public content: string | object;
    public attributes: any;
    private vars: any = {};
    private style: any = {};
    private traits: any = {};
    private baseContent: string;

    private replaceStrByVar(str: string) {
        return str.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub])
                return this.vars[sub];
            return save;
        });
    }

    public rebuildContent(el: any) {
        this.content = (this.style) ? `<style>${parseStyle(this.style)}</style>${this.baseContent}` : this.baseContent;
        this.content = `<${this.label.toLowerCase()}>${this.replaceStrByVar(this.content)}</${this.label.toLowerCase()}>`
        el.innerHTML = this.content;
    };

    private updateAttributesHandler(_: any) {
        let foundTrait;
        const el = _.view.el;
        const attributes = _.changed.attributes || _.attributes;
        const attrKeys = Object.keys(attributes);
        const attrVals = Object.values(attributes);
        const orAttrVals = Object.values(this.attributes);

        for (let i = 0; i < attrVals.length; i++) {
            if (attrVals[i] != orAttrVals[i]) {
                foundTrait = this.traits.find((trait: any) => trait.name == attrKeys[i]);
                break;
            }
        }

        if (!foundTrait)
            return;

        this.vars[foundTrait.name] = attributes[foundTrait.name];
        this.attributes = attributes;
        (foundTrait.cb) ? foundTrait.cb(this, el) : this.rebuildContent(el);
    };

    public constructor(label: string, content: string | object, attributes: object = {}, { style, traits = [], category = "Default", vars = {} }: any = {}) {
        super();
        this.id = label;
        this.label = label;
        this.category = category;
        this.style = style;
        this.traits = traits;
        this.baseContent = content as string;

        // Vars init
        this.vars = vars;
        this.attributes = vars;

        if (typeof content == "string") {
            this.content = (style) ? `<style>${parseStyle(style)}</style>${content}` : content;
            this.content = `<${label.toLowerCase()}>${this.replaceStrByVar(this.content)}</${label.toLowerCase()}>`
        } else {
            this.content = content;
        }

        const baseModel = editor.DomComponents.getType("default");
        if (typeof content == "string") {
            const _this = this;
            editor.DomComponents.addType(label.toLowerCase(), {
                model: {
                    defaults: {
                        ...baseModel,
                        traits,
                        attributes: this.attributes
                    },
                    init() {
                        // This is what's creating the multiple instances
                        // Along with this which clones the goddamn thing
                        // The _this must be cloned when init() is called by grapes
                        // So I fuck it all up by storing the instances
                        this._this = _this;
                        Controller.components[this.ccid] = Object.assign(Object.create(Object.getPrototypeOf(_this)), _this);
                        this.on("change:attributes", (_: any) => {
                            _this.updateAttributesHandler(_);
                            _this.emit(`attributes::changed::${this.ccid}`, _);
                        });
                    },
                },
                isComponent: (el: any) => {
                    if (el && el.classList && el.classList.contains(label.toLowerCase()))
                        return { type: label.toLowerCase() }
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