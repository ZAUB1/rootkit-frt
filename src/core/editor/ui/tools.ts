import Editor from "..";
import Router from "../../router";
import Controller from "../../controllers";
import selectorBody from "../selector/body.html";

import { Component } from "../../controllers/component";
import { ComponentInstance } from "../../controllers/instance";

export default class EditorTools {
    private _editor: Editor;
    // Selector menu UI component
    public selecterComp: ComponentInstance;

    constructor(_editor: Editor) {
        this._editor = _editor;
        this.selecterComp = (new Component("EditorSelector", selectorBody, { hideFromStack: true })).create();
        this._editor.flagChildsAsEditor(this.selecterComp.DOMElem);
        this.selecterComp.on("click", () => { this._editor.destroySelectedElem(); this.close() });
    }

    public display() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        const rect = this._editor.getParentMovable(this._editor.selectedElem).getBoundingClientRect();
        const el = this.selecterComp.getFirstChild("editor-pick");
        el.style.left = `${rect.x + 2}px`;
        el.style.top = `${rect.bottom + 3}px`;
        this.selecterComp = this.selecterComp;
        this.selecterComp.renderTo(Router.getElem());
        this._editor.selectedElem.style.outline = "2px solid #51c2d5";
    }

    public close() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        this._editor.selectedElem ? this._editor.selectedElem.style.outline = null : void 0;
    };
};