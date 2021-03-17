import body from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";

export default new Component(
    "Button",
    body,
    {
        style,
        vars: {
            body: "Text...",
            fontColor: "rgba(0, 0, 0, .87)",
            backColor: "#d7d7d7"
        },
        traits: [{
            type: "text",
            name: "body",
            label: "Content"
        }, {
            type: "color",
            name: "fontColor",
            label: "Font color"
        }]
    }
);