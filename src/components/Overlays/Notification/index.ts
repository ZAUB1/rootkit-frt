import body from "./body.html";
import style from "./style";

import { Vars, Rendered } from "../../../core/nucleus/decorators/component";
import { NucleusComponent, NucleusInstance } from "../../../core/nucleus/component";

@Vars({
    body: "Test notification"
})
@Rendered((comp: NucleusInstance) => {
    setTimeout(() => {
        comp.remove();
    }, 3000);
})
class Notification extends NucleusComponent {
    constructor() {
        super("Notification", body, { style });
    }
};

export default new Notification;