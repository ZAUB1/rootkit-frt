import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon, Vars } from "../../../core/controllers";

@Category("Interacts")
@Icon("fas fa-square")
class Tooltip extends Component {
    constructor() {
        super("Tooltip", body, { });
    }
};

export default new Tooltip;

