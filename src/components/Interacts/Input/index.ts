import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/puzzle/decorators";

@Category("Interacts")
@Icon("fas fa-square")
class InputField extends NucleusComponent {
    constructor() {
        super("Input Field", body, { });
    }
};

export default new InputField;
