import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-square")
class Avatar extends Component {
    constructor() {
        super("Avatar", body, { });
    }
};

export default new Avatar;
