import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-exclamation", "#e5383b")
class Tooltip extends Component {
    constructor() {
        super("Tooltip", body, { });
    }
};

export default new Tooltip;

