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
        }, {
            type: "color",
            label: "Color",
            name: "color",
        }, {
            type: "number",
            label: "Size",
            name: "size",
            placeholder: "1px-200px",
            min: 1,
            max: 200,
            step: 3,
        }, {
            type: "select",
            label: "Font",
            name: "font",
            options: [
                "Arial",
                "Halvetica"
            ],
        }, {
            type: "select",
            label: "Decoration",
            name: "decoration",
            options: [
                { id: "none", name: " " },
                { id: "underline", name: "Underline" }
            ],
        }, {
            type: "checkbox",
            label: "Capitalize",
            name: "capitalize",
            valueTrue: "uppercase",
            valueFalse: "none",
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