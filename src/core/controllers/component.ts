import { EventEmitter } from "events";

import { editor } from "../editor";
import { parseStyle } from "../style";

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

    public rebuildContent(el: any) {
        let content = this.baseContent.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this.vars[sub])
                return this.vars[sub];
            return save;
        });

        this.content = (this.style) ? `<style>${parseStyle(this.style)}</style>${content}` : content;
        this.content = `<${this.label.toLowerCase()}>${this.content}</${this.label.toLowerCase()}>`
        el.innerHTML = this.content;
    };

    private updateAttributesHandler(_: any) {
        let foundTrait;
        const el = _.view.el;
        const attributes = _.changed.attributes;
        const attrKeys = Object.keys(attributes);
        const attrVals = Object.values(attributes);
        const orAttrVals = Object.values(this.attributes);

        for (let i = 0; i < attrVals.length; i++) {
            if (attrVals[i] != orAttrVals[i])
                foundTrait = this.traits.find((trait: any) => trait.name == attrKeys[i]);
        }

        if (!foundTrait)
            return;

        this.vars[foundTrait.name] = attributes[foundTrait.name];
        this.attributes = attributes;
        foundTrait.cb(this, el);
    };

    public constructor(label: string, content: string | object, attributes: object = {}, { style, traits = [], category = "Default", vars = {} }: any = {}) {
        super();
        this.id = label;
        this.label = label;
        this.category = category;
        this.vars = vars;
        this.style = style;
        this.traits = traits;
        this.baseContent = content as string;
        this.attributes = vars;

        if (typeof content == "string") {
            content = content.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
                const save = sub.toString();
                sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
                if (this.vars[sub])
                    return this.vars[sub];
                return save;
            });

            this.content = (style) ? `<style>${parseStyle(style)}</style>${content}` : content;
            this.content = `<${label.toLowerCase()}>${this.content}</${label.toLowerCase()}>`
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
                        this.on("change:attributes", (_: any) => _this.updateAttributesHandler(_));
                    }
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