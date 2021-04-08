import body from "./body.html";
// import style from "./style";


import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/editor/decorators";
@Category("Interacts")
@Icon("fas fa-square")
class Navbar extends NucleusComponent {
    constructor() {
        super("Navbar", body, { });
    }
};

export default new Navbar;

