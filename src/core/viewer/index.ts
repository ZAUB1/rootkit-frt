import { NucleusComponent, NucleusInstance } from "../nucleus/component";

export default class Viewer {
    // Main UI comp
    public viewerComp: NucleusInstance;
    private components: NucleusInstance[] = [];
    // Holding load handlers

    // Load any comp in the viewer
    public loadCompInside(comp: NucleusInstance) {
        comp.renderTo(this.viewerComp);
    };

    // Create comp in the viewer
    public createComp(compGen: NucleusComponent): NucleusInstance {
        const comp = compGen.create();
        this.loadCompInside(comp);
        return comp;
    };

    public constructor() {
        this.viewerComp = (new NucleusComponent("Viewer", "", { hideFromStack: true })).create();
    };
};

export const Instance = new Viewer;