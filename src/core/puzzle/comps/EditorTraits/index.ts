import style from "./style";
import body from "./body.html"
import { NucleusComponent } from "&/core/nucleus/component";
import { Vars } from "&/core/nucleus/decorators/component";
import { ModelEventHandler } from "&/core/nucleus/decorators/model";

@Vars({
    isUp: false,
    traits: []
})
@ModelEventHandler("mainContainer", "click", function(model: HTMLElement, event: any) {
    /* const target = model;
    if (this.getVar("isUp"))
        return;
    //event.preventDefault();
    target.style.boxShadow = "rgba(0, 0, 0, 0.20) 0px 16px 64px 0px, rgba(0, 0, 0, 0.01) 0px 0px 0px 1px";
    const mouseMove = (event: MouseEvent) => {
        let { top, left }: any = target.getBoundingClientRect();
        target.style.left = `${left + event.movementX}px`;
        target.style.top = `${top + event.movementY}px`;
    };
    const mouseUp = (event: MouseEvent) => {
        document.body.style.cursor = null;
        target.style.boxShadow = null;
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mousedown", mouseUp);
        setTimeout(() => {
            this.setVarNoBuild("isUp", false);
        }, 500);
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    document.body.style.cursor = "move";
    this.setVarNoBuild("isUp", true); */
})
class EditorTraits extends NucleusComponent {
    constructor() {
        super("EditorTraits", body, { style });
    }
};

export default new EditorTraits;