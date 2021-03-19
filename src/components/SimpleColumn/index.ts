import body from "./body.html";
import style from "./style";

import { Component } from "../../core/controllers/component";
import { Category } from "../../core/controllers";

@Category("Containers")
class SimpleColumn extends Component {
    constructor() {
        super("Simple Column", body, { style });
    }
}

export default new SimpleColumn;