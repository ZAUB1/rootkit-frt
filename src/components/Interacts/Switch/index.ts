import body from "./body.html";
import { NucleusComponent } from "&/core/nucleus/component";
import { Category } from "&/core/puzzle/decorators";
import { Vars } from "&/core/nucleus/decorators/component";

@Category("Interacts")
@Vars({
    checked: false
})
class Switch extends NucleusComponent {
    constructor() {
        super("Switch", body, {  });
    }
};

export default new Switch;