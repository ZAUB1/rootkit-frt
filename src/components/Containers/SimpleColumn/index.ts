import body from "./body.html";
import style from "./style";

import { Component } from "../../../core/controllers/component";
import { Trait } from "../../../core/controllers/decorators/editor";
import { Vars } from "../../../core/controllers/decorators/component";
import { Category, Traits } from "../../../core/controllers/decorators/editor";

export const vars: { [key: string]: any } = {
    border: "none",
    borderRadius: "none"
};

export const traits: Array<Trait> = [{
    type: "checkbox",
    name: "border",
    label: "Bordure",
    valueTrue: "1px solid grey",
    valueFalse: "none"
}, {
    type: "checkbox",
    name: "borderRadius",
    label: "Arrondis",
    valueTrue: "10px",
    valueFalse: "none"
}];

@Category("Containers")
@Vars(vars)
@Traits(traits)
class SimpleColumn extends Component {
    constructor() {
        super("Simple Column", body, { style });
    }
}

export default new SimpleColumn;