import { Component, ComponentInstance } from "../controllers/component";

export default class Viewer {
    // Main UI comp
    public viewerComp: ComponentInstance;
    private components: ComponentInstance[] = [];
    // Holding load handlers

    // Load any comp in the viewer
    public loadCompInside(comp: ComponentInstance) {
        comp.renderTo(this.viewerComp);
    };

    // Create comp in the viewer
    public createComp(compGen: Component): ComponentInstance {
        const comp = compGen.create();
        this.loadCompInside(comp);
        return comp;
    };

    public constructor() {
        this.viewerComp = (new Component("Viewer", "", { hideFromStack: true })).create();
    };
};

export const Instance = new Viewer;