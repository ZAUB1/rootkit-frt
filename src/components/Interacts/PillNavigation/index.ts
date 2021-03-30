import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Traits } from "../../../core/controllers/decorators/editor";
import { Vars } from "../../../core/controllers/decorators/component";


@Vars({
    body: "Text",
    backgroundColor: "#d7d7d7",
    borderRadius: "0px",
    link1: "Lien 1",
    link2: "Lien 2",
    link3: "Lien 3",
    link4: "Lien 4",
})
@Icon("fas fa-square")
@Category("Interacts")
@Traits([{
    type: "text",
    name: "link1",
    label: "Lien",
}, {
    type: "text",
    name: "link2",
    label: "Lien",
}, {
    type: "text",
    name: "link3",
    label: "Lien",
}, {
    type: "text",
    name: "link4",
    label: "Lien",
}, {
    type: "color",
    name: "backgroundColor",
    label: "Couleur de fond"
}, {
    type: "checkbox",
    name: "borderRadius",
    label: "Bords arrondis",
    valueTrue: "5px",
    valueFalse: "0px"
}])
class PillNavigation extends Component {
    constructor() {
        super("Pill Navigation", body, { });
    }
};

export default new PillNavigation;
