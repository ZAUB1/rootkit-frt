import Controller from "../core/controllers";

export default class Editor {
    public lastHover: any;
    public selectedElem: any;

    public constructor() {
        window.addEventListener("mousemove", (ev: MouseEvent) => {
            const hoverElement = document.elementFromPoint(ev.x, ev.y) as HTMLElement;
            if (hoverElement == this.selectedElem)
                return;
            (this.lastHover) ? this.lastHover.style.outline = null : void 0;
            hoverElement.style.outline = "3px solid crimson";
            this.lastHover = hoverElement;
        });

        window.addEventListener("mousedown", (ev: MouseEvent) => {
            const hoverElement = document.elementFromPoint(ev.x, ev.y) as HTMLElement;
            (this.selectedElem) ? this.selectedElem.style.outline = null : void 0;
            this.lastHover = null;
            hoverElement.style.outline = "3px solid blue";
            this.selectedElem = hoverElement;
        });
    }
}