declare global {
    interface Window { editor: any; }
};

import "./style.scss";
import style from "./style.scss";

import "./selector/style.scss";
import body from "./body.html";
import selectorBody from "./selector/body.html";

import Router from "../router";
import { genRandId } from "../etc/rand";
import Controller from "../../core/controllers";
import { Component, ComponentInstance } from "../controllers/component";

import EditorDrag from "./run/drag";
import EditorTraits from "./ui/traits";
import EditorResizer from "./ui/resizers";

let currentInstance: any;

const CATEGORIES = [ "Containers", "Interacts", "Api Linked", "Favorites" ];

export default class Editor {
    public lastHover: HTMLElement;
    public selectedElem: HTMLElement;

    public editorComp: ComponentInstance;
    public selectedComp: ComponentInstance;
    public selecterComp: ComponentInstance;

    public dragHoverElem: HTMLElement = Router.getElem();
    public currentDragComp: string;

    private editorDrag: EditorDrag;
    private editorTraits: EditorTraits;
    private editorResizer: EditorResizer;

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

    private displayComponents(child: number = 0) {
        const compMenu = this.editorComp.getFirstChild("editor-components");
        if (!compMenu)
            return;
        compMenu.innerHTML = null;
        // @TODO categories
        if (child < 0)
            return;
        compMenu.innerHTML = `
            ${(() => {
                let compsButtons = "";
                for (const comp of Controller.componentsCategories[child])
                    compsButtons += `
                        <compbtn-div
                            editor
                            draggable="true"
                            ondragstart="editor.startDrag(event, '${comp.label}')"
                            ondragend="editor.stopDrag(event)"
                        >
                            <i editor class="${Controller.componentIcons[comp.label] || "fas fa-pen"}" style="margin-left: 15px"></i>
                            <div editor style="flex-grow: 1">
                                <span editor style="margin-left: 10px">${comp.label}</span>
                            </div>
                        </compbtn-div>
                    `
                return compsButtons;
            })()}
        `;
    };

    public clickCompMenuHandler(el: HTMLElement, menu: number) {
        const compMenu = this.editorComp.getFirstChild("category-buttons");
        const compTitle = document.getElementById("component-title-menu");
        if (!compMenu)
            return;
        for (const child of compMenu.children)
            child.style.backgroundColor = null;
        el.style.backgroundColor = "rgb(242, 242, 242)";
        compTitle.innerHTML = CATEGORIES[menu];
        this.displayComponents(menu);
    };

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

    public closeElementTools() {
        (this.selecterComp.appened) ? this.selecterComp.remove() : void 0;
        this.selectedElem ? this.selectedElem.style.outline = null : void 0;
    };

    private closeElemMenus() {
        if (!this.selecterComp)
            return;
        this.closeElementTools();
        this.editorTraits.hideTraitsMenu();
        this.editorResizer.hideResizers();
    };

    private createComponent(name: string = "Text") {
        return Controller.getComponent(name).createAndAppend();
    };

    private destroySelectedElem() {
        if (!this.selectedComp)
            return; // @TODO Error case
        this.selectedComp.remove();
        this.editorResizer.hideResizers();
        this.editorTraits.hideTraitsMenu();
    };

    public getParentMovable(el: Element): Element {
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
            return;
        (this.selectedElem) ? this.selectedElem.style.outline = null : void 0;
        this.lastHover = null;
        this.selectedElem = hoverElement;
        const parentCompElem = this.getParentMovable(this.selectedElem);
        this.selectedComp = Controller.getComponentInstance(parentCompElem.id);

        this.editorTraits.displayTraitsMenu();
        this.displayElementTools();
        this.editorResizer.displayResizers();
    };

    public static getInstance(): Editor {
        return currentInstance;
    };

    private flagChildsAsEditor(el: HTMLElement) {
        if (!el)
            return;
        el.setAttribute("editor", "true");
        if (!el.children.length)
            return;
        for (const child of el.children as any)
            this.flagChildsAsEditor(child as HTMLElement);
    };

    public constructor() {
        this.editorDrag = new EditorDrag(this);
        this.editorTraits = new EditorTraits(this);
        this.editorResizer = new EditorResizer(this);

        window.addEventListener("mousemove", ev => this.elementHoverHandler(ev));
        window.addEventListener("mousedown", ev => this.elementClickHandler(ev));

        window.editor = {};
        window.editor.createComponent = () => { this.createComponent() };

        // Drag & Drop declarations
        window.editor.startDrag = (event: DragEvent, compType: string) => { /* event.preventDefault(); */ this.editorDrag.startDrag(event, compType) };
        window.editor.stopDrag = (event: DragEvent) => { /* event.preventDefault();  */this.editorDrag.stopDrag(event) };
        window.editor.setDragElem = (el: HTMLElement) => { this.editorDrag.setDragElem(el) };
        window.editor.setDragOut = (el: HTMLElement) => { this.editorDrag.setDragOut(el) };

        // Traits methods declarations
        window.editor.traitKeyHandler = (event: KeyboardEvent, traitName: string) => { this.editorTraits.traitKeyHandler(event, traitName) };
        window.editor.traitChangeHandler = (event: KeyboardEvent, traitName: string) => { this.editorTraits.traitChangeHandler(event, traitName) };
        window.editor.traitCheckHandler = (event: KeyboardEvent, traitName: string, array: any) => { this.editorTraits.traitCheckHandler(event, traitName, array) };

        window.editor.clickCompMenuHandler = (el: HTMLElement, menu: number) => { el && this.clickCompMenuHandler(el, menu) };

        this.selecterComp = (new Component("EditorSelector", selectorBody, { hideFromStack: true })).create();
        this.editorComp = (new Component("EditorMain", body, { hideFromStack: true })).create();
        this.flagChildsAsEditor(this.selecterComp.DOMElem);
        this.displayComponents();
        this.flagChildsAsEditor(this.editorComp.DOMElem);
        this.dragHoverElem = this.editorComp.getFirstChild("editor-main");
        currentInstance = this;

        this.selecterComp.on("click", () => { this.destroySelectedElem(); this.closeElementTools() });
    };
};