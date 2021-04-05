import Editor, { CATEGORIES } from "..";
import Controller from "&/core/controllers";

export default class EditorDrawer {
    private _editor: Editor;
    public currentDrawer: number = 0;

    public constructor(_editor: Editor) {
        this._editor = _editor;
        window.editor.clickCompMenuHandler = (el: HTMLElement, menu: number) => { el && this.clickMenuHandler(el, menu) };
    };

    // Generate component drawer
    public gen(child: number = 0) {
        const compMenu = this._editor.editorComp.getFirstChild("editor-components");
        if (!compMenu)
            return;
        compMenu.innerHTML = null;
        if (child < 0)
            return;
        // Layer menu
        this.currentDrawer = child;
        if (child == 3)
            return this._editor.editorLayers.gen();
        compMenu.innerHTML = `
            ${(() => {
                let compsButtons = "";
                let count = 0;
                for (const comp of Controller.componentsCategories[child]) {
                    if (count % 2 == 0) {
                        count != 0 ? compsButtons += "</div>" : void 0;
                        compsButtons += "<div editor style='display: flex; width: 100%; justify-content: stretch;'>"
                    }
                    compsButtons += `
                        <compbtn-div
                            editor
                            draggable="true"
                            ondragstart="editor.startDrag(event, '${comp.label}')"
                            ondragend="editor.stopDrag(event)"
                        >
                            <div editor style="display: flex; flex-direction: column; margin: 5px 5px">
                                <i editor style="font-size: 20px; margin-bottom: 10px; color: ${(comp as any).iconColor ? (comp as any).iconColor : "black"}" class="${(Controller.components[comp.label] as any).icon || "fas fa-pen"}"></i>
                                <span editor>${comp.label}</span>
                            </div>
                        </compbtn-div>
                    `;
                    count += 1;
                }
                return compsButtons;
            })()}
        `;
    };

    // Components UI menu click handler @DRAWER
    public clickMenuHandler(el: HTMLElement, menu: number) {
        const compMenu = this._editor.editorComp.getFirstChild("category-buttons");
        const compTitle = document.getElementById("component-title-menu");
        if (!compMenu)
            return;
        for (const child of compMenu.children) {
            child.style.backgroundColor = null;
            child.style.borderBottom = "3px solid transparent";
        }
        el.style.backgroundColor = "#f7f6f9";
        el.style.borderBottom = "3px solid crimson";
        compTitle.innerHTML = CATEGORIES[menu];
        this.gen(menu);
    }
};