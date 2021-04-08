import type Editor from "..";

import DrawerComp from "../comps/EditorDrawer";
import type { NucleusInstance } from "&/core/nucleus/instance";

export default class EditorDrawer {
    private _editor: Editor;
    public currentDrawer: number = 0;
    private comp: NucleusInstance;

    public constructor(_editor: Editor) {
        this._editor = _editor;
        this.comp = DrawerComp.create();
        this._editor.flagChildsAsEditor(this.comp.DOMElem);
        this.comp.render();
    };
};