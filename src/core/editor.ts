declare global {
    interface Window { editor: any; }
};

import Controller from "../core/controllers";
import { ComponentInstance } from "./controllers/component";

const routerContainer = document.getElementById("editor-container");

export default class Editor {
    public lastHover: HTMLElement;
    public selectedElem: HTMLElement;
    public selectedComp: ComponentInstance;
    public selecterComp: any;
    public dragHoverElem: HTMLElement = routerContainer;
    public currentDragComp: string;

    private elementHoverHandler(ev: MouseEvent) {
        const hoverElement = document.elementFromPoint(ev.x, ev.y) as HTMLElement;
        // Shouldn't be identified as a custom elem
        if (hoverElement == this.selectedElem
        || hoverElement.nodeName.toLocaleLowerCase().includes("editor")
        || hoverElement.attributes.getNamedItem("editor"))
            return;
        (this.lastHover) ? this.lastHover.style.outline = null : void 0;
        hoverElement.style.outline = "2px solid #ec4646";
        this.lastHover = hoverElement;
    };

    private displayElementTools() {
        (this.selecterComp) ? routerContainer.removeChild(this.selecterComp) : void 0;
        const rect = this.selectedElem.getBoundingClientRect();
        const el = document.createElement("div");
        el.style.position = "absolute";
        el.style.left = `${rect.x + 2}px`;
        el.style.top = `${rect.bottom + 3}px`;
        el.style.backgroundColor = "crimson";
        el.style.borderRadius = "5px";
        el.innerHTML = `
            <editor-pick style="display: flex;">
                <editor-div style="margin: 5px; user-select: none">
                    <button editor onclick="editor.destroySelectedElem()">DELETE</button>
                </editor-div>
            </editor-pick>
        `;
        this.selecterComp = el;
        routerContainer.appendChild(el);
    };

    private displayUi() {
        const mainEl = document.createElement("div");
        mainEl.innerHTML = `
            <editor-sidemenu>
                <header editor>
                    <span editor>Components</span>
                </header>
                <components editor>
                    <div editor draggable="true" ondragstart="editor.startDrag(event, 'Text')" ondragend="editor.stopDrag(event)">Text</div>
                    <div editor draggable="true" ondragstart="editor.startDrag(event, 'SimpleColumn')" ondragend="editor.stopDrag(event)">Container</div>
                    ${(() => {
                        /* let compsButtons = "";
                        for (const comp of Object.keys(Controller.components))
                            compsButtons += `<button editor onclick="editor.createComponent(${comp})">${comp}</button>`
                        return compsButtons; */
                        return ""
                    })()}
                </components>
            </editor-sidemenu>
        `;
        routerContainer.appendChild(mainEl);
    };

    private startDrag(event: DragEvent, compType: string) {
        this.currentDragComp = compType;
    };

    private stopDrag(event: DragEvent) {
        const comp = Controller.getComponent(this.currentDragComp).create();
        comp.appendTo(this.dragHoverElem);
    };

    private setDragElem(el: HTMLElement) {
        this.dragHoverElem = el;
        el.style.backgroundColor = "black";
    };

    private setDragOut(el: HTMLElement) {
        el.style.backgroundColor = null;
        // Ugly solution but works for now
        setTimeout(() => {
            this.dragHoverElem = routerContainer
        }, 5);
    };

    private closeElementTools() {
        routerContainer.removeChild(this.selecterComp);
        this.selecterComp = null;
    };

    private createComponent(name: string = "Text") {
        return Controller.getComponent(name).createAndAppend();
    };

    private destroySelectedElem() {
        if (!this.selectedComp)
            return; // @TODO Error case
        this.selectedComp.remove();
    };

    private setDraggable() {
        this.selectedElem.draggable = true;
        this.selectedElem.ondragstart = (event) => this.startDrag(event, this.selectedComp.label);
        this.selectedElem.ondragend = (event) => {
            this.selectedComp.moveTo(this.dragHoverElem);
            this.closeElementTools();
        };
    };

    private elementClickHandler(ev: MouseEvent) {
        const hoverElement = document.elementFromPoint(ev.x, ev.y) as HTMLElement;
        if (hoverElement.nodeName.toLocaleLowerCase().includes("editor")
        || hoverElement.attributes.getNamedItem("editor"))
            return;
        (this.selectedElem) ? this.selectedElem.style.outline = null : void 0;
        this.lastHover = null;
        hoverElement.style.outline = "2px solid #51c2d5";
        this.selectedElem = hoverElement;
        this.selectedComp = Controller.getComponentInstance(this.selectedElem.parentElement.id);

        this.displayElementTools();
        this.setDraggable();
    };

    public constructor() {
        window.addEventListener("mousemove", ev => this.elementHoverHandler(ev));
        window.addEventListener("mousedown", ev => this.elementClickHandler(ev));

        // @TODO Put into mi
        // routerContainer.addEventListener("dragover", ev => this.dragHoverElem != routerContainer && this.setDragElem(routerContainer));

        window.editor = {};
        window.editor.destroySelectedElem = () => { this.destroySelectedElem(); this.closeElementTools() };
        window.editor.createComponent = () => { this.createComponent() };
        window.editor.startDrag = (event: DragEvent, compType: string) => { /* event.preventDefault(); */ this.startDrag(event, compType) };
        window.editor.stopDrag = (event: DragEvent) => { /* event.preventDefault();  */this.stopDrag(event) };
        window.editor.setDragElem = (el: HTMLElement) => { this.setDragElem(el) };
        window.editor.setDragOut = (el: HTMLElement) => { this.setDragOut(el) };

        this.displayUi();
    };
};