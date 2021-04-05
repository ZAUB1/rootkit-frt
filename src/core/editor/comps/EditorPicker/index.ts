import "./style.scss";
import body from "./body.html";

import * as Editor from "&/core/editor";
import * as Nucleus from "&/core/controllers/component";
import { ModelEventHandler } from "&/core/controllers/decorators/model";

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