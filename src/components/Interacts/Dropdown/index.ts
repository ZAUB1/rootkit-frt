import body from "./body.html";
import style from "./style";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
import { ModelEventHandler } from "&/core/controllers/decorators/model";

@Category("Interacts")
@Icon("fas fa-square")
@ModelEventHandler("dropBtn", "click", function() {
    const content = this.getCompByModel("dropContent");
    (content.style.visibility == "hidden") ? content.style.visibility = null : content.style.visibility = "visible";
    (content.style.opacity == 1) ? content.style.opacity = 0 : content.style.opacity = 1;
})
class Dropdown extends Component {
    constructor() {
        super("Dropdown", body, { style });
    }
};

export default new Dropdown;
