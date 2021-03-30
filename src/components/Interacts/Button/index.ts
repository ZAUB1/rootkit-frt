import body from "./body.html";
import style from "./style";

import { Component, ComponentInstance } from "../../../core/controllers/component";
import { Vars, Click } from "../../../core/controllers/decorators/component";
import { Icon, Category, Traits } from "../../../core/controllers/decorators/editor";

@Vars({
    body: "Text...",
    backgroundColor: "#d7d7d7",
    borderRadius: "0px"
})
@Icon("fas fa-hockey-puck")
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
@Click((_this: ComponentInstance) => {
})
class Button extends Component {
    constructor() {
        super("Button", body, { style });
    }
};

export default new Button;