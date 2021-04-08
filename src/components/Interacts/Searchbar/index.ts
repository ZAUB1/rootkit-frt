import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/editor/decorators";
@Category("Interacts")
@Icon("fas fa-square")
class Searchbar extends NucleusComponent {
    constructor() {
        super("Searchbar", body, { });
    }
};

export default new Searchbar;
