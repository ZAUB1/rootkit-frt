import body from "./body.html";
import { Component } from "../../core/controllers/component";

export default new Component(
    "Text",
    body,
    { class: 'gjs-fonts gjs-f-text' },
    {
        traits: [{
            type: "select",
            label: "Weight",
            name: "weight",
            options: [
                { id: "normal", name: "Normal" },
                { id: "bold", name: "Bold" }
            ],
            cb: (_this: any, el: any) => {
                _this.rebuildContent(el);
            }
        }],
        vars: {
            weight: "bold"
        }
    }
);