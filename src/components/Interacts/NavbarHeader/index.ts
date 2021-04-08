import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon, Traits } from "../../../core/puzzle/decorators";
import { Vars } from "../../../core/nucleus/decorators/component";


@Vars({
    body: "Text",
    backgroundColor: "red",
    borderRadius: "0px",
    logo: "Logo",
    link1: "Lien 1",
    link2: "Lien 2",
    link3: "Lien 3",
})
@Icon("fas fa-square")
@Category("Interacts")
@Traits([{
    type: "text",
    name: "logo",
    label: "Logo",
}, {
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
    type: "color",
    name: "backgroundColor",
    label: "Couleur de fond"
}])
class NavbarHeader extends NucleusComponent {
    constructor() {
        super("Navbar Header", body, { });
    }
};

export default new NavbarHeader;
