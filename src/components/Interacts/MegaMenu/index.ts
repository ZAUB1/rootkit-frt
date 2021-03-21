import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Vars } from "../../../core/controllers";

@Category("Interacts")
@Icon("fas fa-square")
class MegaMenu extends Component {
    constructor() {
        super("MegaMenu", body, { });
    }
};

export default new MegaMenu;
