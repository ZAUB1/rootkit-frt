import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Traits } from "../../../core/controllers/decorators/editor";
import { Vars } from "../../../core/controllers/decorators/component";

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
class Tooltip extends Component {
    constructor() {
        super("Tooltip", body, { });
    }
};

export default new Tooltip;

