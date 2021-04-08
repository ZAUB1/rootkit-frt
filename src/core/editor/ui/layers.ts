import type Editor from "..";
import Controller from "&/core/nucleus";

export default class EditorLayers {
    private _editor: Editor;
    private lastHoverLayer: HTMLElement;

    public hoverHandler(id: string) {
        (this.lastHoverLayer) ? this.lastHoverLayer.style.outline = null : void 0;
        const comp = Controller.componentsInstances[id];
        if (!comp)
            return;
        comp.childrens[comp.childrens.length - 1].style.outline = "2px solid #ec4646";
        this.lastHoverLayer = comp.DOMElem;
        this.gen();
    };

    public gen() {
        const compMenu = this._editor.editorComp.getFirstChild("editor-components");
        if (!compMenu)
            return;
        let count = 0;
        let res = "<layers>"
        for (const comp of this._editor.spawnedComponents) {
            res += `
                <div onmouseover="editor.hoverHandler('${comp.id}')" onmouseleave="editor.hoverHandler('-1')">
                    (${count++}) ${comp.label}
                    <i class="fas fa-trash" onclick="editor.destroyElemById('${comp.id}')"></i>
                </div>
                ${(!count || count == this._editor.spawnedComponents.length) ? "" : "<span style='height: 1px; width: 75%; background-color: grey; margin: 5px'></span>"}
            `;
        }
        res += "</layers>";
        compMenu.innerHTML = res;
        this._editor.flagChildsAsEditor(compMenu);
    }

    public constructor(_editor: Editor) {
        this._editor = _editor;

        window.editor.hoverHandler = (elId: string) => { this.hoverHandler(elId) };
    };
};