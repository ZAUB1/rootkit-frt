import "./style.scss";
import body from "./body.html";

import * as Editor from "&/core/puzzle";
import * as Nucleus from "&/core/nucleus/component";
import { ModelEventHandler } from "&/core/nucleus/decorators/model";
import { Vars } from "&/core/nucleus/decorators/component";

@Vars({
    buttons: [
        { name: "edit", icon: "fas fa-pen" },
        { name: "clone", icon: "far fa-clone" },
        { name: "delete", icon: "fas fa-trash" }
    ]
})
@ModelEventHandler("editBtn", "click", () => {
})
@ModelEventHandler("cloneBtn", "click", () => {
})
@ModelEventHandler("deleteBtn", "click", () => {
    Editor.Instance.destroySelectedElem();
    // Close UI
    Editor.Instance.editorTools.close();
})
class EditorPicker extends Nucleus.NucleusComponent {
    constructor() {
        super("EditorPicker", body, { });
    }
};

export default new EditorPicker;