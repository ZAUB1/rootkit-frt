import body from "./body.html";
import style from "../SimpleColumn/style";

import { Component } from "../../../core/controllers/component";
import { Vars } from "../../../core/controllers/decorators/component";
import { Category, Icon, Traits } from "../../../core/controllers/decorators/editor";
import { traits, vars } from "../SimpleColumn";

@Vars(vars)
@Traits(traits)
@Category("Containers")
@Icon("fas fa-dice-three")
class TripleColumn extends Component {
    constructor() {
        super("Triple Column", body, { style });
    }
}

export default new TripleColumn;