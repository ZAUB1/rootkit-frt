import { parseStyle } from "&/core/style";
import type { ComponentInstance } from "./";

export default class ComponentCompiler {
    private _instance: ComponentInstance;

    constructor(_instance: ComponentInstance) {
        // Forward instance
        this._instance = _instance;
    };

    private replaceStrByVar(str: string) {
        return str.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this._instance.vars[sub] != undefined)
                return this._instance.vars[sub];
            return save;
        });
    }

    private replaceCssByVar(str: string) {
        return str.replace(/\{ (.*?) \}/g, (sub: string, ...args: any[]): any => {
            const save = sub.toString();
            sub = sub.split("{")[1].split("}")[0].replace(/\s/g, "");
            if (this._instance.vars[sub] != undefined)
                return this._instance.vars[sub];
            return save;
        });
    }

    public rebuild() {
        let style = "<style>"
        style += (this._instance.baseContent.match(/<style>(.|\n)*?<\/style>/)) ? this._instance.baseContent.match(/<style>(.|\n)*?<\/style>/)[0]?.split("<style>")[1]?.split("</style>")[0] : "";
        style = this.replaceCssByVar(style);
        style += (this._instance.style) ? this.replaceCssByVar(parseStyle(this._instance.style)) : "";
        style += "</style>"
        style = (style || "").replace(/(\.([a-zA-Z_-]{1}[\w-_]+))/g, (sub: string, ..._): any => {
            return `#${this._instance.DOMElem.id} ${sub}`;
        });
        this._instance.content = (style || "") + this.replaceStrByVar(this._instance.baseContent);
        this._instance.DOMElem.innerHTML = this._instance.content;
        this._instance.parseChildren(this._instance.DOMElem);
    };
};