import { editor } from "../editor";
import { parseStyle } from "../style";

export class Component {
    public id: string;
    public label: string;
    public content: string | object;
    public attributes: any;

    public constructor(label: string, content: string | object, attributes: object = {}, { style, traits }: any = {}) {
        this.id = label;
        this.label = label;
        if (typeof content == "string") {
            this.content = (style) ? `<style>${parseStyle(style)}</style>${content}` : content;
            this.content = `<${label.toLowerCase()}>${this.content}</${label.toLowerCase()}>`
        } else {
            this.content = content;
        }
        this.attributes = attributes;
        const baseModel = editor.DomComponents.getType("default");
        editor.DomComponents.addType(label.toLowerCase(), {
            model: {
                defaults: {
                    ...baseModel,
                    traits: traits || []
                }
            }
        });
        editor.BlockManager.add(label, this);
    };
};