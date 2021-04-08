import body from "./body.html";
import { NucleusComponent } from "&/core/nucleus/component";
import { Category } from "&/core/puzzle/decorators";

@Category("Interacts")
class Switch extends NucleusComponent {
    constructor() {
        super("Switch", body, {  });
    }
};

export default new Switch;