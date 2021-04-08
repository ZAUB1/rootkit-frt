import body from "./body.html";
import style from "./style";

import { NucleusComponent } from "&/core/nucleus/component";
import { Icon, Trait } from "&/core/editor/decorators";
import { Vars } from "&/core/nucleus/decorators/component";
import { Category, Traits } from "&/core/editor/decorators";

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
@Icon("far fa-circle")
class SimpleColumn extends NucleusComponent {
    constructor() {
        super("Circle", body, { style });
    }
}

export default new SimpleColumn;