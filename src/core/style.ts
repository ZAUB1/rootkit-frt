import { camelToSnake } from "./etc/str";

export const styleString = (style: any, className: string): any => {
    let vals = "";
    const keys = Object.keys(style);
    for (let k of keys) {
        const v = style[k];
        if (typeof v == "object") {
            switch (k) {
                case "hover":
                    vals += `}.${camelToSnake(className)}:${k}{`;
                    vals += styleString(style[k], className);
                    continue;
                default:
                    vals += `.${k}{`
                    vals += styleString(style[k], className);
                    vals += "}"
            }
        } else {
            vals += `${camelToSnake(k)}:${v};`;
        }
    }
    return vals;
}

// Turn JS Object in css minified stylesheet
export const parseStyle = (styleSheet: any) => {
    let style = "";
    const classes = Object.keys(styleSheet);
    for (const _class of classes) {
        if (_class.includes("_")) {
            const splitted = _class.split("_");
            switch (splitted[0]) {
                case "":
                    style += `${splitted[1]}{`
                    break;
                case "media":
                    style += `@media(${splitted[1].replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${splitted[2]}){`
                    break;
            }
        } else {
            style += `.${camelToSnake(_class)}{`;
        }
        style += styleString(styleSheet[_class], _class);
        style += "}";
    }
    return style;
};