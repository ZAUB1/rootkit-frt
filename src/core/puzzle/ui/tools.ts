import type Editor from "..";
import Router from "../../nucleus-router";

import EditorPicker from "../comps/EditorPicker";
import type { NucleusInstance } from "&/core/nucleus/instance";

export default class EditorTools {
    private _editor: Editor;
    // Selector menu UI component
    public selecterComp: NucleusInstance;

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
        el.style.opacity = 0;
        el.style.top = `${rect.top - 40}px`;
        this.selecterComp.render();
        this._editor.selectedElem.style.outline = "2px solid #51c2d5";
        setTimeout(() => {
            el.style.top = `${rect.top - 47.5}px`;
            el.style.opacity = 1;
            el.style.zIndex = 10;
        }, 10);
    }

    public close() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        this._editor.selectedElem ? this._editor.selectedElem.style.outline = null : void 0;
    };
};