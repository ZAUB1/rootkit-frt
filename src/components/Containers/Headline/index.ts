import body from "./body.html";
import style from "./style";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Icon, Trait } from "../../../core/puzzle/decorators";
import { Vars } from "../../../core/nucleus/decorators/component";
import { Category, Traits } from "../../../core/puzzle/decorators";

@Category("Containers")
@Icon("fas fa-box")
class Headline extends NucleusComponent {
    constructor() {
        super("Headline", body, { style });
    }
}

export default new Headline;