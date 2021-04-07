import body from "./body.html";
import style from "./style";

import { Vars, Rendered } from "../../../core/controllers/decorators/component";
import { Component, ComponentInstance } from "../../../core/controllers/component";
import { ModelEventHandler } from "../../../core/controllers/decorators/model";
import { Built } from "&/core/controllers/decorators/component";

@Vars({
    opacity: 0
})
@ModelEventHandler("closeBtn", "click", (_this: ComponentInstance) => {
    _this.parent.remove();
})
@Built((_this: ComponentInstance) => {
    _this.setChildsAttrs(_this.DOMElem, "editor", "true");
})
class ModalContent extends Component {
    constructor() {
        super("ModalContent", body, { style });
    }
};

export default new ModalContent;