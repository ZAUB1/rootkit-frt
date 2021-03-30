import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Traits } from "../../../core/controllers/decorators/editor";
import { Vars } from "../../../core/controllers/decorators/component";


@Vars({
    body: "Text",
    backgroundColor: "#d7d7d7",
    borderRadius: "0px",
    logo: "Logo",
    link: "Liens"
})
@Icon("fas fa-square")
@Category("Interacts")
@Traits([{
    type: "text",
    name: "logo",
    label: "Logo",
}, {
    type: "text",
    name: "link",
    label: "Liens",
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
class NavbarHeader extends Component {
    constructor() {
        super("Navbar Header", body, { });
    }
};

export default new NavbarHeader;
