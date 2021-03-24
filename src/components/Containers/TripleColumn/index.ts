import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../../core/controllers/component";
import { Category } from "../../../core/controllers/decorators/editor";

@Category("Containers")
class TripleColumn extends Component {
    constructor() {
        super("Triple Column", body, { style });
    }
}

export default new TripleColumn;