import { Component, ComponentInstance } from "../controllers/component";

let viewerInstance: Viewer;

export default class Viewer {
    // Main UI comp
    public viewerComp: ComponentInstance;
    private components: ComponentInstance[] = [];
    // Holding load handlers
    private static loadHandlers: Function[] = [];

    // Load any comp in the viewer
    public loadCompInside(comp: ComponentInstance) {
        comp.appendTo(this.viewerComp);
    };

    // Create comp in the viewer
    public createComp(compGen: Component): ComponentInstance {
        const comp = compGen.create();
        this.loadCompInside(comp);
        return comp;
    };

    public static getInstance() {
        return viewerInstance;
    };

    // Load handlers
    public static onLoad(handler: Function) {
        this.loadHandlers.push(handler);
    };

    public constructor() {
        this.viewerComp = (new Component("Viewer", "", { hideFromStack: true })).create();
        viewerInstance = this;
        Viewer.loadHandlers.map(handler => handler(viewerInstance));
    };
};