import type Editor from "..";
import Nucleus from "&/core/nucleus";
import { genRandId } from "&/core/etc/rand";

import TraitsComp from "../comps/EditorTraits";
import type { NucleusInstance } from "&/core/nucleus/instance";
import type { Trait } from "&/core/editor/decorators";

export default class EditorTraits {
    private _editor: Editor;
    private menu: NucleusInstance;

    constructor(_editor: Editor) {
        this._editor = _editor;

        // Traits methods declarations
        window.editor.traitKeyHandler = (event: KeyboardEvent, traitName: string) => { this.traitKeyHandler(event, traitName) };
        window.editor.traitChangeHandler = (event: KeyboardEvent, traitName: string) => { this.traitChangeHandler(event, traitName) };
        window.editor.traitCheckHandler = (event: KeyboardEvent, traitName: string, array: any) => { this.traitCheckHandler(event, traitName, array) };
        window.editor.closeTraitMenu = () => { this.hideTraitsMenu() };
        this.menu = TraitsComp.create();
    }

    // Gen traits menu UI from comp traits
    public displayTraitsMenu() {
        if (this.menu.appened)
        this.menu.remove();
        const traits = (Nucleus.components[this._editor.selectedComp.label] as any).traits;
        this.menu.setVar("traits", traits.map((trait: Trait) => {
            return {
                ...trait,
                rand: genRandId(10),
                value: this._editor.selectedComp.vars[trait.name]
            }
        }));
        this.menu.setChildsAttrs(this.menu.DOMElem, "editor", "true");
        this.menu.render();
    };

    public hideTraitsMenu() {
        this.menu.remove();
    };

    // Key change
    private traitKeyHandler(event: KeyboardEvent, traitName: string) {
        if (event.key != "Enter")
            return;
        const el = event.target as any;
        if (!el)
            return;
        this._editor.selectedComp.setVar(traitName, el.value);
    };

    // Normal change
    private traitChangeHandler(event: any, traitName: string) {
        const el = event.target as any;
        if (!el)
            return;
        this._editor.selectedComp.setVar(traitName, el.value);
    };

    // Checkbox
    private traitCheckHandler(event: any, traitName: string, [ traitTrue, traitFalse ]: any) {
        const el = event.target as any;
        if (!el)
            return;
        this._editor.selectedComp.setVar(traitName, el.checked ? traitTrue : traitFalse);
    };

    // Move handler
    public traitMenuClickHandler(event: MouseEvent) {
        if ((event.target as HTMLElement).nodeName != "EDITOR-TRAITMENU")
            return;
        const target = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        event.preventDefault();
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
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
        document.body.style.cursor = "move";
    };
}