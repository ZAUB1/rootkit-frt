import Controller from "&/core/nucleus";
import type { NucleusInstance } from ".";

const DOM_EVENTS = [ "click", "mouseover", "contextmenu" ];

export default class ComponentEvents {
    private _instance: NucleusInstance;
    private modelElementsHandlers: { model: string, event: string, cb: (comp: NucleusInstance | HTMLElement) => void }[] = [];

    constructor(_instance: NucleusInstance) {
        // Forward instance
        this._instance = _instance;
    };

    private emitEventListener(event: string, ..._: any) {
        this._instance.emit(event, ..._);
        Controller?.componentHandlers
        && Controller?.componentHandlers[this._instance.label]
        && Controller.componentHandlers[this._instance.label][event] 
            ? Controller.componentHandlers[this._instance.label][event](this._instance, ..._) : void 0;
    }

    private elementEventHandler(model: string, event: string, cb: (comp: NucleusInstance | HTMLElement) => void) {
        const elem = this._instance.getCompByModel(model) as HTMLElement;
        if (!elem)
            return console.error("Element not found with model:", model);
        elem.addEventListener(event, () => { cb.call(this._instance, elem) });
    };

    public addElementEventHandler(model: string, event: string, cb: (comp: NucleusInstance | HTMLElement) => void) {
        this.modelElementsHandlers.push({ model, event, cb });
        this.elementEventHandler(model, event, cb);
    };

    public regenEventHandlers() {
        for (const modelElem of this.modelElementsHandlers)
            this.elementEventHandler(modelElem.model, modelElem.event, modelElem.cb);
        for (const eventName of DOM_EVENTS)
            this._instance.DOMElem.addEventListener(eventName, (ev: any) => { this.emitEventListener(eventName, ev) });
    };
};