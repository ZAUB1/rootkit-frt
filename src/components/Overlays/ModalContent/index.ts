import body from "./body.html";
import style from "./style";

import { Vars, Rendered } from "../../../core/nucleus/decorators/component";
import { NucleusComponent, NucleusInstance } from "../../../core/nucleus/component";
import { ModelEventHandler } from "../../../core/nucleus/decorators/model";
import { Built } from "&/core/nucleus/decorators/component";

@Vars({
    opacity: 0
})
@ModelEventHandler("closeBtn", "click", (_this: NucleusInstance) => {
    _this.parent.remove();
})
@Built((_this: NucleusInstance) => {
    _this.setChildsAttrs(_this.DOMElem, "editor", "true");
})
class ModalContent extends NucleusComponent {
    constructor() {
        super("ModalContent", body, { style });
    }
};

export default new ModalContent;