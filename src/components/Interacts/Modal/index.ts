import style from "./style";
import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import type { NucleusInstance } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/editor/decorators";
import { ModelEventHandler } from "../../../core/nucleus/decorators/model";

import ModalContent from "../../Overlays/ModalContent";

@Category("Interacts")
@Icon("fas fa-square")
@ModelEventHandler("modalTrigger", "click", () => {
    const comp = ModalContent.create();
    comp.render();
})
class Modal extends NucleusComponent {
    constructor() {
        super("Modal", body, { style });
    }
};

export default new Modal;