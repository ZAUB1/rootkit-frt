import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/editor/decorators";

@Category("Interacts")
@Icon("fas fa-square")
class Avatar extends NucleusComponent {
    constructor() {
        super("Avatar", body, { });
    }
};

export default new Avatar;
