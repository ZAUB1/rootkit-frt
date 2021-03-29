import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../../core/controllers/component";
import { Vars } from "../../../core/controllers/decorators/component";
import { Category, Traits } from "../../../core/controllers/decorators/editor";
import { traits, vars } from "../SimpleColumn";

@Category("Containers")
@Vars(vars)
@Traits(traits)
class DoubleColumn extends Component {
    constructor() {
        super("Double Column", body, { style });
    }
}

export default new DoubleColumn;