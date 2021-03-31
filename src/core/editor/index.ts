declare global {
    interface Window { editor: any; }
};

import "./style.scss";
import style from "./style.scss";

import "./selector/style.scss";
import body from "./body.html";

import Router from "../router";
import { genRandId } from "../etc/rand";
import Controller from "../../core/controllers";
import { Component, ComponentInstance } from "../controllers/component";

import EditorDrag from "./run/drag";
import EditorTraits from "./ui/traits";
import EditorResizer from "./ui/resizers";
import EditorLayers from "./ui/layers";
import EditorTools from "./ui/tools";

let currentInstance: any;

const CATEGORIES = [ "Containers", "Interacts", "Api Linked", "Layers" ];

export default class Editor {
    // Last element the user had its cursor on
    public lastHover: HTMLElement;
    // Current clicked element
    public selectedElem: HTMLElement;

    // Editor UI component
    public editorComp: ComponentInstance;
    // Current clicked component instance
    public selectedComp: ComponentInstance;

    // Store for dragging
    public dragHoverElem: HTMLElement = Router.getElem();
    // What type of component the user is dragging
    public currentDragComp: string;

    // Editor dragger instance
    private editorDrag: EditorDrag;
    // Editor traits instance
    private editorTraits: EditorTraits;
    // Editor resizers instance
    private editorResizer: EditorResizer;
    // Editor Layers instance
    private editorLayers: EditorLayers;
    // Editor tools instance
    public editorTools: EditorTools;

    // Hold the spawned components from the editor from t(0)
    public spawnedComponents: ComponentInstance[] = [];

    public currentDrawer: number = 0;

    // mouseover handler
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

    // Generate component drawer
    private displayComponents(child: number = 0) {
        const compMenu = this.editorComp.getFirstChild("editor-components");
        if (!compMenu)
            return;
        compMenu.innerHTML = null;
        if (child < 0)
            return;
        // Layer menu
        this.currentDrawer = child;
        if (child == 3)
            return this.editorLayers.gen();
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
    public clickCompMenuHandler(el: HTMLElement, menu: number) {
        const compMenu = this.editorComp.getFirstChild("category-buttons");
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
        this.displayComponents(menu);
    };

    // Closes all component UI
    private closeElemMenus() {
        if (!this.editorTools.selecterComp)
            return;
        this.editorTools.close();
        this.editorTraits.hideTraitsMenu();
        this.editorResizer.hideResizers();
    };

    // @DEPRECATED
    private createComponent(name: string = "Text") {
        return Controller.getComponent(name).createAndRender();
    };

    // Handler delete button
    public destroySelectedElem() {
        if (!this.selectedComp)
            return; // @TODO Error case
        this.selectedComp.remove();
        this.editorResizer.hideResizers();
        this.editorTraits.hideTraitsMenu();
    };

    private destroyElemById(id: string) {
        const comp = Controller.getComponentInstance(id);
        if (!comp)
            return; // @TODO Error case
        comp.remove();
        this.editorResizer.hideResizers();
        this.editorTraits.hideTraitsMenu();
        this.editorLayers.gen();
    };

    // Recursive to find the first 'real' component from any child
    public getParentMovable(el: Element): Element {
        if (!el.attributes.getNamedItem("component-instance"))
            return this.getParentMovable(el.parentElement);
        return el;
    };

    // onclick handler
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
        this.editorTools.display();
        this.editorResizer.displayResizers();
    };

    public static getInstance(): Editor {
        return currentInstance; // == this
    };

    // Recursive to flag all childs as uneditable
    public flagChildsAsEditor(el: HTMLElement) {
        if (!el)
            return;
        el.setAttribute("editor", "true");
        if (!el.children.length)
            return;
        for (const child of el.children as any)
            this.flagChildsAsEditor(child as HTMLElement);
    };

    public constructor() {
        // Global access point
        window.editor = {};

        this.editorDrag = new EditorDrag(this);
        this.editorTraits = new EditorTraits(this);
        this.editorResizer = new EditorResizer(this);
        this.editorLayers = new EditorLayers(this);
        this.editorTools = new EditorTools(this);

        // Main tools handlers
        window.addEventListener("mousemove", ev => this.elementHoverHandler(ev));
        window.addEventListener("mousedown", ev => this.elementClickHandler(ev));

        // HTML window wrappers
        window.editor.createComponent = () => { this.createComponent() };
        window.editor.destroyElemById = (id: string) => { this.destroyElemById(id) };

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

        window.editor.dump = () => {
            console.log(this.spawnedComponents.map(comp => {
                const { id, label, vars, parent } = comp;
                return {
                    id,
                    label,
                    vars,
                    parent: parent?.id
                }
            }));
        }

        // Start editor sub comps
        this.editorComp = (new Component("EditorMain", body, { hideFromStack: true })).create();

        // Avoid editor detection
        // Draw UI
        this.displayComponents();
        this.flagChildsAsEditor(this.editorComp.DOMElem);
        this.dragHoverElem = this.editorComp.getFirstChild("editor-main");
        currentInstance = this;
    };
};