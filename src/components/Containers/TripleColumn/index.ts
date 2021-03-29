import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../../core/controllers/component";
import { Vars } from "../../../core/controllers/decorators/component";
import { Category, Traits } from "../../../core/controllers/decorators/editor";
import { traits, vars } from "../SimpleColumn";

@Vars(vars)
@Traits(traits)
@Category("Containers")
class TripleColumn extends Component {
    constructor() {
        super("Triple Column", body, { style });
    }
}

export default new TripleColumn;