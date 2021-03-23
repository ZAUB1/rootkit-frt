import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../../core/controllers/component";
import { Category } from "../../../core/controllers/decorators/editor";

@Category("Containers")
class DoubleColumn extends Component {
    constructor() {
        super("Double Column", body, { style });
    }
}

export default new DoubleColumn;