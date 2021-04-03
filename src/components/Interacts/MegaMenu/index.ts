import body from "./body.html";

import { Component, ComponentInstance } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
import { ModelEventHandler } from "../../../core/controllers/decorators/model";

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
class MegaMenu extends Component {
    constructor() {
        super("Mega Menu", body, { });
    }
};

export default new MegaMenu;
