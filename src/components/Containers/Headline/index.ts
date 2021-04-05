import body from "./body.html";
import style from "./style";

import { Component } from "../../../core/controllers/component";
import { Icon, Trait } from "../../../core/controllers/decorators/editor";
import { Vars } from "../../../core/controllers/decorators/component";
import { Category, Traits } from "../../../core/controllers/decorators/editor";

@Category("Containers")
@Icon("fas fa-box")
class Headline extends Component {
    constructor() {
        super("Headline", body, { style });
    }
}

export default new Headline;