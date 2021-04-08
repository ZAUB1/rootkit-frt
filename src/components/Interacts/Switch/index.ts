import body from "./body.html";
import { NucleusComponent } from "&/core/nucleus/component";
import { Category } from "&/core/editor/decorators";

@Category("Interacts")
class Switch extends NucleusComponent {
    constructor() {
        super("Switch", body, {  });
    }
};

export default new Switch;