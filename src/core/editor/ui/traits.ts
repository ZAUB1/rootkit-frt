import Editor from "..";
import Controller from "&/core/controllers";
import { genRandId } from "&/core/etc/rand";

export default class EditorTraits {
    private _editor: Editor;

    constructor(_editor: Editor) {
        this._editor = _editor;

        // Traits methods declarations
        window.editor.traitKeyHandler = (event: KeyboardEvent, traitName: string) => { this.traitKeyHandler(event, traitName) };
        window.editor.traitChangeHandler = (event: KeyboardEvent, traitName: string) => { this.traitChangeHandler(event, traitName) };
        window.editor.traitCheckHandler = (event: KeyboardEvent, traitName: string, array: any) => { this.traitCheckHandler(event, traitName, array) };
        window.editor.closeTraitMenu = () => { this.hideTraitsMenu() };
    }

    // Gen traits menu UI from comp traits
    public displayTraitsMenu() {
        const traits = (Controller.components[this._editor.selectedComp.label] as any).traits;
        const sideMenu = document.getElementsByTagName("editor-sidemenu")[0] as HTMLElement;
        const traitsMenu = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        const traitsBody = document.getElementById("component-traits");
        traitsBody.innerHTML = `
            <span editor>Component ID: #${(this._editor.selectedElem.parentNode as HTMLElement).id}</span>
            <span editor>Component type: ${this._editor.selectedComp.label}</span>
            <div editor style="height: 1px; background-color: #e0e0e0; width: 90%; margin: 5px 10px"></div>
            ${(() => {
                if (!traits)
                    return "";
                let traitElems = "";
                for (const trait of traits as any[]) {
                    const traitId = genRandId(10);
                    switch (trait.type) {
                        case "text":
                            traitElems += `
                                <trait>
                                    <label editor for="${traitId}">${trait.label}</label>
                                    <input editor id="${traitId}" type='text' onkeydown='editor.traitKeyHandler(event, "${trait.name}")' value="${this._editor.selectedComp.getVar(trait.name)}">
                                </trait>
                            `;
                            break;
                        case "number":
                            traitElems += `
                                <trait>
                                    <label editor for="${traitId}">${trait.label}</label>
                                    <input editor id="${traitId}" type='number' onkeydown='editor.traitKeyHandler(event, "${trait.name}")' onchange='editor.traitChangeHandler(event, "${trait.name}")' value="${this._editor.selectedComp.getVar(trait.name)}">
                                </trait>
                            `;
                            break;
                        case "checkbox":
                            traitElems += `
                                <trait>
                                    <label editor for="${traitId}">${trait.label}</label>
                                    <input editor id="${traitId}" type='checkbox' onclick='editor.traitCheckHandler(event, "${trait.name}", ["${trait.valueTrue}", "${trait.valueFalse}"])' value="${this._editor.selectedComp.getVar(trait.name)}">
                                </trait>
                            `;
                            break;
                        case "color":
                            traitElems += `
                                <trait>
                                    <label editor for="${traitId}">${trait.label}</label>
                                    <input editor id="${traitId}" type='color' oninput='editor.traitChangeHandler(event, "${trait.name}")'>
                                </trait>
                            `;
                            break;
                        case "select":
                            traitElems += `
                                <trait>
                                    <label editor for="${traitId}">${trait.label}</label>
                                    <select editor id="${traitId}" onchange='editor.traitChangeHandler(event, "${trait.name}")' value="${this._editor.selectedComp.getVar(trait.name)}">>
                                        ${(() => {
                                            let selectOptions = "";
                                            for (const option of trait.options)
                                                selectOptions += `<option editor value="${option.id}">${option.name}</option>`;
                                            return selectOptions;
                                        })()}
                                    </select>
                                </trait>
                            `;
                            break;
                    }
                }
                return traitElems;
            })()}
        `;
        sideMenu.style.display = null;
        traitsMenu.style.display = "block";

        // Handler for menu moving
        traitsMenu.addEventListener("mousedown", this.traitMenuClickHandler);
    };

    public hideTraitsMenu() {
        const sideMenu = document.getElementsByTagName("editor-sidemenu")[0] as HTMLElement;
        const traitsMenu = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        sideMenu.style.display = "block";
        traitsMenu.style.display = null;
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
        target.style.boxShadow = "rgba(99, 99, 99, 0.6) 0px 2px 10px 0px";

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