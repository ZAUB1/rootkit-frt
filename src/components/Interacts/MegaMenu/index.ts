import body from "./body.html";

import { NucleusComponent, NucleusInstance } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/puzzle/decorators";
import { ModelEventHandler } from "../../../core/nucleus/decorators/model";

@Category("Interacts")
@Icon("fas fa-square")
@ModelEventHandler("dropBtn", "mouseenter", function() {
    const dropContent = this.getCompByModel("dropContent") as HTMLElement;
    dropContent.style.display = "block";
})
@ModelEventHandler("dropContent", "mouseleave", function() {
    const dropContent = this.getCompByModel("dropContent") as HTMLElement;
    dropContent.style.display = null;
})
class MegaMenu extends NucleusComponent {
    constructor() {
        super("Mega Menu", body, { });
    }
};

export default new MegaMenu;
