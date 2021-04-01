import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-hockey-puck", "crimson")
class Input extends Component {
    constructor() {
        super("Input", body, { });
    }
};

export default new Input;
