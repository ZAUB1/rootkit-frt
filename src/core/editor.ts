declare global {
    interface Window { editor: any; }
}

import Controller from "../core/controllers";

const routerContainer = document.getElementById("editor-container");

export default class Editor {
    public lastHover: HTMLElement;
    public selectedElem: HTMLElement;
    public selecterComp: any;

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
        el.style.left = `${rect.right + 2}px`;
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
                    <button editor onclick="editor.createComponent()">Text</button>
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

    private closeElementTools() {
        routerContainer.removeChild(this.selecterComp);
        this.selecterComp = null;
    };

    private createComponent(name: string = "Text") {
        return Controller.getComponent(name).createAndAppend();
    };

    private destroySelectedElem() {
        const comp = Controller.getComponentInstance(this.selectedElem.parentElement.id);
        if (!comp)
            return; // @TODO Error case
        comp.remove();
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

        this.displayElementTools();
    };

    public constructor() {
        window.addEventListener("mousemove", ev => this.elementHoverHandler(ev));
        window.addEventListener("mousedown", ev => this.elementClickHandler(ev));

        window.editor = {};
        window.editor.destroySelectedElem = () => { this.destroySelectedElem(); this.closeElementTools() };
        window.editor.createComponent = () => { this.createComponent() };

        this.displayUi();
    };
}