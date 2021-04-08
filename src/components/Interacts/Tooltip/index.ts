import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon, Traits } from "../../../core/puzzle/decorators";
import { Vars } from "../../../core/nucleus/decorators/component";

@Vars({
    borderRadius: "5px",
    backgroundColor: "grey",
    tooltips: [
        { name: "tooltip", position: "bottom" }
    ]
})
@Icon("fas fa-square")
@Category("Interacts")
@Traits([{
    type: "checkbox",
    name: "borderRadius",
    label: "Bords arrondis",
    valueTrue: "5px",
    valueFalse: "0px"
}])
class Tooltip extends NucleusComponent {
    constructor() {
        super("Tooltip", body, { });
    }
};

export default new Tooltip;