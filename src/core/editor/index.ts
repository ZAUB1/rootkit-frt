declare global {
    interface Window { editor: any; }
};

import "./style.scss";
import "./selector/style.scss";
import body from "./body.html";
import selectorBody from "./selector/body.html";

import Router from "../router";
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
        const rect = this.selectedElem.getBoundingClientRect();
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
        }, 5);
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
        if (hoverElement.nodeName.toLocaleLowerCase() == "body")
            return this.closeElemMenus();
        if (hoverElement.nodeName.toLocaleLowerCase().includes("editor")
        || hoverElement.attributes.getNamedItem("editor"))
            return /* this.closeElemMenus() */;
        (this.selectedElem) ? this.selectedElem.style.outline = null : void 0;
        this.lastHover = null;
        this.selectedElem = hoverElement;
        this.selectedComp = Controller.getComponentInstance(this.selectedElem.parentElement.id);

        this.displayTraitsMenu();
        this.displayElementTools();
        this.setDraggable();
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
        window.editor.startDrag = (event: DragEvent, compType: string) => { /* event.preventDefault(); */ this.startDrag(event, compType) };
        window.editor.stopDrag = (event: DragEvent) => { /* event.preventDefault();  */this.stopDrag(event) };
        window.editor.setDragElem = (el: HTMLElement) => { this.setDragElem(el) };
        window.editor.setDragOut = (el: HTMLElement) => { this.setDragOut(el) };

        this.selecterComp = (new Component("EditorSelector", selectorBody, { hideFromStack: true })).create();
        this.editorComp = (new Component("EditorMain", body, { hideFromStack: true })).create();
        this.dragHoverElem = this.editorComp.getFirstChild("editor-main");
        currentInstance = this;
    };
};