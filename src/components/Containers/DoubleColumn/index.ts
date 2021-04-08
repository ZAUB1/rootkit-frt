import body from "./body.html";
import style from "../SimpleColumn/style";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Vars } from "../../../core/nucleus/decorators/component";
import { Category, Icon, Traits } from "../../../core/editor/decorators";
import { traits, vars } from "../SimpleColumn";

@Category("Containers")
@Vars(vars)
@Traits(traits)
@Icon("fas fa-dice-two")
class DoubleColumn extends NucleusComponent {
    constructor() {
        super("Double Column", body, { style });
    }
}

export default new DoubleColumn;