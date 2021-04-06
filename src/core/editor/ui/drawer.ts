import type Editor from "..";

import DrawerComp from "../comps/EditorDrawer";
import type { ComponentInstance } from "&/core/controllers/instance";

export default class EditorDrawer {
    private _editor: Editor;
    public currentDrawer: number = 0;
    private comp: ComponentInstance;

    public constructor(_editor: Editor) {
        this._editor = _editor;
        this.comp = DrawerComp.create();
        this._editor.flagChildsAsEditor(this.comp.DOMElem);
        this.comp.render();
    };
};