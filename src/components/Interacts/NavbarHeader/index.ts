import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
@Category("Interacts")
@Icon("fas fa-square")
class NavbarHeader extends Component {
    constructor() {
        super("Navbar Header", body, { });
    }
};

export default new NavbarHeader;
