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
        this.content = (style) ? `<style>${parseStyle(style)}</style>${content}` : content;
        this.attributes = attributes;

        console.log(label, this, traits);
        editor.DomComponents.addType(label.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`), {
            model: {

            }
        });

        editor.BlockManager.add(label, this);
    };
};