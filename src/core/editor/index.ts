declare global {
    interface Window { editor: any; }
};

import "./style.scss";
import style from "./style.scss";

console.log(style);
import "./selector/style.scss";
import body from "./body.html";
import selectorBody from "./selector/body.html";

import Router from "../router";
import { genRandId } from "../etc/rand";
import Controller from "../../core/controllers";
import { Component, ComponentInstance } from "../controllers/component";

let currentInstance: any;

export default class Editor {
    public lastHover: HTMLElement;
    public selectedElem: HTMLElement;
    public editorComp: ComponentInstance;
    public selectedComp: ComponentInstance;
    public selecterComp: ComponentInstance;
    public dragHoverElem: HTMLElement = Router.getElem();
    public currentDragComp: string;

    private elementHoverHandler(ev: MouseEvent) {
        const hoverElement = document.elementFromPoint(ev.x, ev.y) as HTMLElement;
        (this.lastHover) ? this.lastHover.style.outline = null : void 0;
        // Shouldn't be identified as a custom elem
        if (!hoverElement
        || hoverElement == this.selectedElem
        || hoverElement.nodeName.toLocaleLowerCase().includes("editor")
        || hoverElement.attributes.getNamedItem("editor"))
            return;
        hoverElement.style.outline = "2px solid #ec4646";
        this.lastHover = hoverElement;
    };

    // ${(() => {
    //     /* let compsButtons = "";
    //     for (const comp of Object.keys(Controller.components))
    //         compsButtons += `<button editor onclick="editor.createComponent(${comp})">${comp}</button>`
    //     return compsButtons; */
    //     return ""
    // })()}

    private displayElementTools() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        const rect = this.getParentMovable(this.selectedElem).getBoundingClientRect();
        const el = this.selecterComp.getFirstChild("editor-pick");
        el.style.left = `${rect.x + 2}px`;
        el.style.top = `${rect.bottom + 3}px`;
        this.selecterComp = this.selecterComp;
        this.selecterComp.appendTo(Router.getElem());
        this.selectedElem.style.outline = "2px solid #51c2d5";
    };

    private closeElementTools() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        this.selectedElem.style.outline = null;
    };

    private displayTraitsMenu() {
        const sideMenu = document.getElementsByTagName("editor-sidemenu")[0] as HTMLElement;
        const traitsMenu = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        const traitsBody = document.getElementById("component-traits");
        traitsBody.innerHTML = `
            <span editor>Component ID: #${(this.selectedElem.parentNode as HTMLElement).id}</span>
            <span editor>Component type: ${this.selectedComp.label}</span>
            ${(() => {
                let traitElems = "";
                for (const trait of this.selectedComp?.traits) {
                    const traitId = genRandId(10);
                    switch (trait.type) {
                        case "text":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='text' onkeydown='editor.traitKeyHandler(event, "${trait.name}")' value="${this.selectedComp.getVar(trait.name)}">
                            `;
                            break;
                        case "number":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='number' onkeydown='editor.traitKeyHandler(event, "${trait.name}")' onchange='editor.traitChangeHandler(event, "${trait.name}")' value="${this.selectedComp.getVar(trait.name)}">
                            `;
                            break;
                        case "checkbox":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='checkbox' onclick='editor.traitCheckHandler(event, "${trait.name}", ["${trait.valueTrue}", "${trait.valueFalse}"])' value="${this.selectedComp.getVar(trait.name)}">
                            `;
                            break;
                        case "color":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='color' oninput='editor.traitChangeHandler(event, "${trait.name}")'>
                            `;
                            break;
                        case "select":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <select editor id="${traitId}" onchange='editor.traitChangeHandler(event, "${trait.name}")' value="${this.selectedComp.getVar(trait.name)}">>
                                    ${(() => {
                                        let selectOptions = "";
                                        for (const option of trait.options)
                                            selectOptions += `<option editor value="${option.id}">${option.name}</option>`;
                                        return selectOptions;
                                    })()}
                                </select>
                            `;
                            break;
                    }
                }
                return traitElems;
            })()}
        `;
        sideMenu.style.display = null;
        traitsMenu.style.display = "block";
    };

    private hideTraitsMenu() {
        const sideMenu = document.getElementsByTagName("editor-sidemenu")[0] as HTMLElement;
        const traitsMenu = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        sideMenu.style.display = "block";
        traitsMenu.style.display = null;
    };

    private traitKeyHandler(event: KeyboardEvent, traitName: string) {
        if (event.key != "Enter")
            return;
        const el = event.target as any;
        if (!el)
            return;
        this.selectedComp.setVar(traitName, el.value);
    };

    private traitChangeHandler(event: any, traitName: string) {
        const el = event.target as any;
        if (!el)
            return;
        this.selectedComp.setVar(traitName, el.value);
    };

    private traitCheckHandler(event: any, traitName: string, [ traitTrue, traitFalse ]: any) {
        const el = event.target as any;
        if (!el)
            return;
        this.selectedComp.setVar(traitName, el.checked ? traitTrue : traitFalse);
    }

    private closeElemMenus() {
        if (!this.selecterComp)
            return;
        this.closeElementTools();
        this.hideTraitsMenu();
    };

    private startDrag(event: DragEvent, compType: string) {
        this.currentDragComp = compType;
    };

    private stopDrag(event: DragEvent) {
        const comp = Controller.getComponent(this.currentDragComp).create();
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
            this.dragHoverElem = this.editorComp.getFirstChild("editor-main");
        }, 1000);
    };

    private createComponent(name: string = "Text") {
        return Controller.getComponent(name).createAndAppend();
    };

    private destroySelectedElem() {
        if (!this.selectedComp)
            return; // @TODO Error case
        this.selectedComp.remove();
    };

    private setDraggable(el: HTMLElement) {
        el.draggable = true;
        el.ondragstart = (event) => this.startDrag(event, this.selectedComp.label);
        el.ondragend = (event) => {
            console.log("eend;")
            this.selectedComp.moveTo(this.dragHoverElem);
            this.closeElementTools();
        };
    };

    private getParentMovable(el: Element): Element {
        if (!el.attributes.getNamedItem("component-instance"))
            return this.getParentMovable(el.parentElement);
        return el;
    };

    private elementClickHandler(ev: MouseEvent) {
        const hoverElement = document.elementFromPoint(ev.x, ev.y) as HTMLElement;
        if (hoverElement.nodeName.toLocaleLowerCase() == "body")
            return this.closeElemMenus();
        if (hoverElement.nodeName.toLocaleLowerCase().includes("editor")
        || hoverElement.attributes.getNamedItem("editor"))
            return /* this.closeElemMenus() */;
        (this.selectedElem) ? this.selectedElem.style.outline = null : void 0;
        this.lastHover = null;
        this.selectedElem = hoverElement;
        const parentCompElem = this.getParentMovable(this.selectedElem);
        this.selectedComp = Controller.getComponentInstance(parentCompElem.id);

        this.displayTraitsMenu();
        this.displayElementTools();
    };

    public static getInstance(): Editor {
        return currentInstance;
    };

    public constructor() {
        window.addEventListener("mousemove", ev => this.elementHoverHandler(ev));
        window.addEventListener("mousedown", ev => this.elementClickHandler(ev));

        window.editor = {};
        window.editor.destroySelectedElem = () => { this.destroySelectedElem(); this.closeElementTools() };
        window.editor.createComponent = () => { this.createComponent() };

        // Drag & Drop declarations
        window.editor.startDrag = (event: DragEvent, compType: string) => { /* event.preventDefault(); */ this.startDrag(event, compType) };
        window.editor.stopDrag = (event: DragEvent) => { /* event.preventDefault();  */this.stopDrag(event) };
        window.editor.setDragElem = (el: HTMLElement) => { this.setDragElem(el) };
        window.editor.setDragOut = (el: HTMLElement) => { this.setDragOut(el) };

        // Traits methods declarations
        window.editor.traitKeyHandler = (event: KeyboardEvent, traitName: string) => { this.traitKeyHandler(event, traitName) };
        window.editor.traitChangeHandler = (event: KeyboardEvent, traitName: string) => { this.traitChangeHandler(event, traitName) };
        window.editor.traitCheckHandler = (event: KeyboardEvent, traitName: string, array: any) => { this.traitCheckHandler(event, traitName, array) };

        this.selecterComp = (new Component("EditorSelector", selectorBody, { hideFromStack: true })).create();
        this.editorComp = (new Component("EditorMain", body, { hideFromStack: true })).create();
        this.dragHoverElem = this.editorComp.getFirstChild("editor-main");
        currentInstance = this;
    };
};