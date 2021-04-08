import body from "./body.html";
import style from "./style";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/puzzle/decorators";
import { ModelEventHandler } from "&/core/nucleus/decorators/model";

@Category("Interacts")
@Icon("fas fa-square")
@ModelEventHandler("dropBtn", "click", function() {
    const content = this.getCompByModel("dropContent");
    (content.style.visibility == "hidden") ? content.style.visibility = null : content.style.visibility = "visible";
    (content.style.opacity == 1) ? content.style.opacity = 0 : content.style.opacity = 1;
})
class Dropdown extends NucleusComponent {
    constructor() {
        super("Dropdown", body, { style });
    }
};

export default new Dropdown;
