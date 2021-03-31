import body from "./body.html";
import style from "./style";

import { Vars, Rendered } from "../../../core/controllers/decorators/component";
import { Component, ComponentInstance } from "../../../core/controllers/component";
import { ModelEventHandler } from "../../../core/controllers/decorators/model";

@Vars({
    opacity: 0
})
@ModelEventHandler("closeBtn", "click", (_this: ComponentInstance) => {
    _this.parent.remove();
})
class ModalContent extends Component {
    constructor() {
        super("ModalContent", body, { style });
    }
};

export default new ModalContent;