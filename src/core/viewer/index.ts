import { Component, ComponentInstance } from "../controllers/component";

let viewerInstance: Viewer;

export default class Viewer {
    public viewerComp: ComponentInstance;
    private components: ComponentInstance[] = [];
    private static loadHandlers: Function[] = [];

    public loadCompInside(comp: ComponentInstance) {
        comp.appendTo(this.viewerComp);
    };

    public createComp(compGen: Component): ComponentInstance {
        const comp = compGen.create();
        this.loadCompInside(comp);
        return comp;
    };

    public static getInstance() {
        return viewerInstance;
    };

    public static onLoad(handler: Function) {
        this.loadHandlers.push(handler);
    };

    public constructor() {
        this.viewerComp = (new Component("Viewer", "", { hideFromStack: true })).create();
        viewerInstance = this;
        Viewer.loadHandlers.map(handler => handler(viewerInstance));
    };
};