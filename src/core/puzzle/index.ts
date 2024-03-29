declare global {
    interface Window { editor: any; }
};

import "./style.scss";
import body from "./body.html";

import Router from "../nucleus-router";
import Nucleus from "&/core/nucleus";

import { NucleusComponent, NucleusInstance } from "../nucleus/component";

import EditorDrawer from "./ui/drawer";
import EditorDrag from "./run/drag";
import EditorTraits from "./ui/traits";
import EditorResizer from "./ui/resizers";
import EditorLayers from "./ui/layers";
import EditorTools from "./ui/tools";

export const CATEGORIES = [ "Containers", "Interacts", "Api Linked", "Layers" ];

export default class Editor {
    // Last element the user had its cursor on
    public lastHover: HTMLElement;
    // Current clicked element
    public selectedElem: HTMLElement;

    // Editor UI component
    public editorComp: NucleusInstance;
    // Current clicked component instance
    public selectedComp: NucleusInstance;

    // Store for dragging
    public dragHoverElem: HTMLElement = Router.getElem();
    // What type of component the user is dragging
    public currentDragComp: string;

    // Editor dragger instance
    public editorDrawer: EditorDrawer;
    // Editor dragger instance
    private editorDrag: EditorDrag;
    // Editor traits instance
    private editorTraits: EditorTraits;
    // Editor resizers instance
    private editorResizer: EditorResizer;
    // Editor Layers instance
    public editorLayers: EditorLayers;
    // Editor tools instance
    public editorTools: EditorTools;

    // Hold the spawned components from the editor from t(0)
    public spawnedComponents: NucleusInstance[] = [];

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
        return Nucleus.getComponent(name).createAndRender();
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
        const comp = Nucleus.getComponentInstance(id);
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
        || hoverElement.attributes.getNamedItem("editor")
        || hoverElement == this.selectedElem)
            return;
        (this.selectedElem) ? this.selectedElem.style.outline = null : void 0;
        this.lastHover = null;
        this.selectedElem = hoverElement;
        const parentCompElem = this.getParentMovable(this.selectedElem);
        this.selectedComp = Nucleus.getComponentInstance(parentCompElem.id);

        this.editorTraits.displayTraitsMenu();
        this.editorTools.display();
        this.editorResizer.displayResizers();
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
        console.time("editorBuild");
        // Global access point
        window.editor = {};

        // Workers
        this.editorDrawer = new EditorDrawer(this);
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
        this.editorComp = (new NucleusComponent("EditorMain", body, { hideFromStack: true })).create();

        // Avoid editor detection
        // Draw UI
        this.flagChildsAsEditor(this.editorComp.DOMElem);
        this.dragHoverElem = this.editorComp.getFirstChild("editor-main");
        console.timeEnd("editorBuild");
    };
};

export const Instance = new Editor;