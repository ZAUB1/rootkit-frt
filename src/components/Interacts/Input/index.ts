import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-square")
class InputField extends Component {
    constructor() {
        super("Input Field", body, { });
    }
};

export default new InputField;
