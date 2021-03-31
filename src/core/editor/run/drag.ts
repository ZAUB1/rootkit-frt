import Editor from "..";
import Controller from "../../controllers";

export default class EditorDrag {
    private _editor: Editor;

    constructor(_editor: Editor) {
        this._editor = _editor;

        // Drag & Drop declarations
        window.editor.startDrag = (event: DragEvent, compType: string) => { /* event.preventDefault(); */ this.startDrag(event, compType) };
        window.editor.stopDrag = (event: DragEvent) => { /* event.preventDefault();  */this.stopDrag(event) };
        window.editor.setDragElem = (el: HTMLElement) => { this.setDragElem(el) };
        window.editor.setDragOut = (el: HTMLElement) => { this.setDragOut(el) };
    }

    public setDraggable(el: HTMLElement) {
        el.draggable = true;
        el.ondragstart = (event) => this.startDrag(event, this._editor.selectedComp.label);
        el.ondragend = (event) => {
            (this._editor.selectedComp.parent ? this._editor.selectedComp.parent : this._editor.selectedComp).moveTo(this._editor.dragHoverElem);
            this._editor.editorTools.close();
        };
    };

    public startDrag(event: DragEvent, compType: string) {
        this._editor.currentDragComp = compType;
    };

    public stopDrag(event: DragEvent) {
        const comp = Controller.getComponent(this._editor.currentDragComp).create();
        comp.parentOriginId = this._editor.dragHoverElem.id;
        const parent = Controller.componentsInstances[this._editor.dragHoverElem.parentElement.parentElement.id];
        (parent) ? comp.parent = parent : void 0;
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
        comp.renderTo(this._editor.dragHoverElem);
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