import body from "./body.html";
import style from "../SimpleColumn/style";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Vars } from "../../../core/nucleus/decorators/component";
import { Category, Icon, Traits } from "../../../core/puzzle/decorators";
import { traits, vars } from "../SimpleColumn";

@Vars(vars)
@Traits(traits)
@Category("Containers")
@Icon("fas fa-dice-three")
class TripleColumn extends NucleusComponent {
    constructor() {
        super("Triple Column", body, { style });
    }
}

export default new TripleColumn;