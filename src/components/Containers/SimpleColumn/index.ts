import body from "./body.html";
import style from "./style";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Icon, Trait } from "../../../core/puzzle/decorators";
import { Vars } from "../../../core/nucleus/decorators/component";
import { Category, Traits } from "../../../core/puzzle/decorators";

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
@Icon("fas fa-dice-one")
class SimpleColumn extends NucleusComponent {
    constructor() {
        super("Simple Column", body, { style });
    }
}

export default new SimpleColumn;