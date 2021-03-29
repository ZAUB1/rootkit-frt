import Editor from "..";
import Router from "../../router";

export default class EditorResizer {
    private _editor: Editor;
    // Which resizer is being clicked
    private resizingIndex: number;
    // Tuple containing the resizers elements
    private DOMElems: [HTMLElement, HTMLElement];

    public constructor(_editor: Editor) {
        this._editor = _editor;
    };

    // Gen UI
    public displayResizers() {
        if (this.DOMElems?.length)
            this.hideResizers();
        const rect = this._editor.selectedElem.getBoundingClientRect();
        this.DOMElems = [
            document.createElement("div"),
            document.createElement("div")
        ];
        this.DOMElems[0].style.left = `${rect.left - 5}px`;
        this.DOMElems[1].style.left = `${rect.right - 5}px`;
        this.DOMElems.map(elem => {
            elem.style.position = "absolute";
            elem.setAttribute("editor", "true");
            elem.style.cursor = "ew-resize";
            elem.style.zIndex = "10";
            elem.style.borderRadius = "50%";
            elem.style.top = `${rect.y + (rect.height / 2) - 5}px`;
            elem.style.width = "10px";
            elem.style.height = "10px";
            elem.style.backgroundColor = "grey";
            elem.style.border = "2px solid #30364c";
            Router.getElem().appendChild(elem);
        });

        const mouseMove = (event: MouseEvent) => {
            let { width }: { width: string | number } = document.defaultView.getComputedStyle(this._editor.selectedElem);
            width = parseInt(width);
            this._editor.selectedElem.style.width = `${width + ((this.resizingIndex) ? event.movementX : -(event.movementX))}px`;
            this.displayResizers();
        };

        const mouseStop = () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseStop);
        };

        // Handle move
        this.DOMElems.map((elem, i) => {
            elem.addEventListener("mousedown", event => {
                this.resizingIndex = i;
                event.preventDefault();
                window.addEventListener("mousemove", mouseMove);
                window.addEventListener("mouseup", mouseStop);
            });
        })
    };

    public hideResizers() {
        this.DOMElems?.map(elem => elem.remove());
    };
};