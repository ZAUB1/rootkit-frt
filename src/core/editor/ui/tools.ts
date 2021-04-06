import type Editor from "..";
import Router from "../../router";

import EditorPicker from "../comps/EditorPicker";
import type { ComponentInstance } from "&/core/controllers/instance";

export default class EditorTools {
    private _editor: Editor;
    // Selector menu UI component
    public selecterComp: ComponentInstance;

    constructor(_editor: Editor) {
        this._editor = _editor;
        this.selecterComp = EditorPicker.create();
        this._editor.flagChildsAsEditor(this.selecterComp.DOMElem);
    }

    public display() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        const rect = this._editor.getParentMovable(this._editor.selectedElem).getBoundingClientRect();
        const el = this.selecterComp.getFirstChild("editor-pick");
        el.style.left = `${rect.x}px`;
        el.style.top = `${rect.bottom + 5}px`;
        this.selecterComp.render();
        this._editor.selectedElem.style.outline = "2px solid #51c2d5";
    }

    public close() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        this._editor.selectedElem ? this._editor.selectedElem.style.outline = null : void 0;
    };
};