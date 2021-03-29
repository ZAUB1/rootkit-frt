import Editor from "..";
import Controller from "../../controllers";

export default class EditorDrag {
    private _editor: Editor;

    constructor(_editor: Editor) {
        this._editor = _editor;
    }

    public setDraggable(el: HTMLElement) {
        el.draggable = true;
        el.ondragstart = (event) => this.startDrag(event, this._editor.selectedComp.label);
        el.ondragend = (event) => {
            (this._editor.selectedComp.parent ? this._editor.selectedComp.parent : this._editor.selectedComp).moveTo(this._editor.dragHoverElem);
            this._editor.closeElementTools();
        };
    };

    public startDrag(event: DragEvent, compType: string) {
        this._editor.currentDragComp = compType;
    };

    public stopDrag(event: DragEvent) {
        const comp = Controller.getComponent(this._editor.currentDragComp).create();
        this._editor.spawnedComponents.push(comp);
        this.setDraggable(comp.DOMElem);
        comp.childrens.map((child: HTMLElement) => {
            if (child.attributes.getNamedItem("editor-container")) {
                child.ondrop = () => { window.editor.setDragOut(child) };
                child.ondragover = () => { window.editor.setDragElem(child) };
                child.ondragleave = () => { window.editor.setDragOut(child) };
                child.style.border = "1px dotted black";
                child.parentElement.style.border = "1px dotted black";
            }
        });
        comp.appendTo(this._editor.dragHoverElem);
    };

    public setDragElem(el: HTMLElement) {
        if (el.children.length)
            return;
        this._editor.dragHoverElem = el;
        el.style.backgroundColor = "black";
    };

    public setDragOut(el: HTMLElement) {
        el.style.backgroundColor = null;
        // Ugly solution but works for now
        setTimeout(() => {
            this._editor.dragHoverElem = this._editor.editorComp.getFirstChild("editor-main");
        }, 1000);
    };
};