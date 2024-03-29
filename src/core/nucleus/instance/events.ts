import Nucleus from "&/core/nucleus";
import type { NucleusInstance } from ".";

const DOM_EVENTS = [ "click", "mouseover", "contextmenu" ];

export default class ComponentEvents {
    private _instance: NucleusInstance;
    private modelElementsHandlers: { model: string, event: string, cb: (comp: NucleusInstance | HTMLElement, event: any) => void }[] = [];

    constructor(_instance: NucleusInstance) {
        // Forward instance
        this._instance = _instance;
    };

    private emitEventListener(event: string, ..._: any) {
        this._instance.emit(event, ..._);
        Nucleus?.componentHandlers
        && Nucleus?.componentHandlers[this._instance.label]
        && Nucleus.componentHandlers[this._instance.label][event] 
            ? Nucleus.componentHandlers[this._instance.label][event](this._instance, ..._) : void 0;
    }

    private elementEventHandler(model: string, event: string, cb: (comp: NucleusInstance | HTMLElement, event: any) => void) {
        const elem = this._instance.getCompByModel(model) as HTMLElement;
        if (!elem)
            return console.error("Element not found with model:", model);
        elem.addEventListener(event, () => { cb.call(this._instance, elem, event) });
    };

    public addElementEventHandler(model: string, event: string, cb: (comp: NucleusInstance | HTMLElement, event: any) => void) {
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