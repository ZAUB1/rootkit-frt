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
        }, {
            type: "color",
            label: "Color",
            name: "color",
            cb: (_this: any, el: any) => {
                _this.rebuildContent(el);
            }
        }, {
            type: "number",
            label: "Size",
            name: "size",
            placeholder: "1px-200px",
            min: 1,
            max: 200,
            step: 3,
            cb: (_this: any, el: any) => {
                _this.rebuildContent(el);
            }
        }, {
            type: "select",
            label: "Font",
            name: "font",
            options: [
                "Arial",
                "Halvetica"
            ],
            cb: (_this: any, el: any) => {
                _this.rebuildContent(el);
            }
        }, {
            type: "select",
            label: "Decoration",
            name: "decoration",
            options: [
                { id: "none", name: " " },
                { id: "underline", name: "Underline" }
            ],
            cb: (_this: any, el: any) => {
                _this.rebuildContent(el);
            }
        }, {
            type: "checkbox",
            label: "Capitalize",
            name: "capitalize",
            valueTrue: "uppercase",
            valueFalse: "none",
            cb: (_this: any, el: any) => {
                _this.rebuildContent(el);
            }
        }],
        vars: {
            weight: "normal",
            color: "black",
            size: 20,
            font: "Arial",
            decoration: "none",
            capitalize: "none"
        }
    }
);