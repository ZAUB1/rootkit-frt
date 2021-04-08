import body from "./body.html";
import style from "./style";

import { NucleusComponent, NucleusInstance } from "../../../core/nucleus/component";
import { Vars, Click } from "../../../core/nucleus/decorators/component";
import { Icon, Category, Traits } from "../../../core/puzzle/decorators";

@Vars({
    body: "Text...",
    backgroundColor: "#d7d7d7",
    borderRadius: "5px"
})
@Icon("fas fa-square")
@Category("Interacts")
@Traits([{
    type: "text",
    name: "body",
    label: "Contenu",
}, {
    type: "color",
    name: "backgroundColor",
    label: "Couleur du fond"
}, {
    type: "checkbox",
    name: "borderRadius",
    label: "Bords arrondis",
    valueTrue: "5px",
    valueFalse: "0px"
}])
@Click((_this: NucleusInstance) => {
})
class Button extends NucleusComponent {
    constructor() {
        super("Button", body, { style });
    }
};

export default new Button;