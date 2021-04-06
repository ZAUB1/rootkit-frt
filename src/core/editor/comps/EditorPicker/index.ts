import "./style.scss";
import body from "./body.html";

import * as Editor from "&/core/editor";
import * as Nucleus from "&/core/controllers/component";
import { ModelEventHandler } from "&/core/controllers/decorators/model";
import { Vars } from "&/core/controllers/decorators/component";

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
class EditorPicker extends Nucleus.Component {
    constructor() {
        super("EditorPicker", body, { });
    }
};

export default new EditorPicker;