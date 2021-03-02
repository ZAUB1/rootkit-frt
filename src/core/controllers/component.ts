import { editor } from "../editor";
import { parseStyle } from "../style";

export class Component {
    public id: string;
    public label: string;
    public content: string | object;
    public attributes: any;

    public constructor(label: string, content: string | object, attributes?: object, style?: object) {
        this.id = label;
        this.label = label;
        this.content = (style) ? `<style>${parseStyle(style)}</style>${content}` : content;
        this.attributes = attributes;

        console.log(label, this);
        editor.BlockManager.add(label, this);
    };
};