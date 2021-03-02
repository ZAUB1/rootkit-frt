export const styleString = (style: any): any => {
    let vals = "";
    const keys = Object.keys(style);
    for (let k of keys) {
        const v = style[k];
        if (typeof v == "object") {
            vals += `.${k}{`
            vals += styleString(style[k]);
            vals += "}"
        } else {
            k = k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
            vals += `${k}:${v};`;
        }
    }
    return vals;
}

export const parseStyle = (styleSheet: any) => {
    let style = "";
    const classes = Object.keys(styleSheet);
    for (const _class of classes) {
        if (_class.includes("_")) {
            const splitted = _class.split("_");
            switch (splitted[0]) {
                case "media":
                    style += `@media(${splitted[1].replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${splitted[2]}){`
                    break;
            }
        } else {
            const formattedName = _class.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
            style += `.${(_class.match(/[A-Z]/g)) ? formattedName : _class}{`;
        }
        style += styleString(styleSheet[_class]);
        style += "}";
    }
    return style;
};