import body from "./body.html";

import { Component } from "../../core/controllers/component";
import { Traits, Vars } from "../../core/controllers";

@Traits([{
    type: "text",
    label: "Body",
    name: "body",
    placeholder: "Text.."
}, {
    type: "select",
    label: "Weight",
    name: "weight",
    placeholder: "Normal",
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
        { id: "arial", name: "Arial" },
        { id: "halvetica", name: "Halvetica" },
    ],
}, {
    type: "select",
    label: "Decoration",
    name: "decoration",
    options: [
        { id: "none", name: "--" },
        { id: "underline", name: "Underline" }
    ],
}, {
    type: "checkbox",
    label: "Capitalize",
    name: "capitalize",
    valueTrue: "uppercase",
    valueFalse: "none",
}])
@Vars({
    weight: "normal",
    color: "black",
    size: 20,
    font: "Arial",
    decoration: "none",
    capitalize: "none",
    body: "Text.."
})
class Text extends Component {
    constructor() {
        super("Text", body);
    }
}

export default new Text;