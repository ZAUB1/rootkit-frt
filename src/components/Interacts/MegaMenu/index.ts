import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-square")
class MegaMenu extends Component {
    constructor() {
        super("Mega Menu", body, { });
    }
};

export default new MegaMenu;
