import style from "./style";
import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
import { ModelEventHandler } from "../../../core/controllers/decorators/model";

import ModalContent from "../../Overlays/ModalContent";

@Category("Interacts")
@Icon("fas fa-clone", "#4361ee")
@ModelEventHandler("modalTrigger", "click", () => {
    const comp = ModalContent.create();
    comp.render();
})
class Modal extends Component {
    constructor() {
        super("Modal", body, { style });
    }
};

export default new Modal;