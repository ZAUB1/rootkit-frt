import body from "./body.html";
import style from "./style";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";

@Category("Interacts")
@Icon("fas fa-caret-down")
class Dropdown extends Component {
    constructor() {
        super("Dropdown", body, { });
    }
};

export default new Dropdown;
