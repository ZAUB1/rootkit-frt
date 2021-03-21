import Editor from "..";
import Controller from "../../controllers";
import { genRandId } from "../../etc/rand";

export default class EditorTraits {
    private _editor: Editor;

    constructor(_editor: Editor) {
        this._editor = _editor;
    }

    public displayTraitsMenu() {
        const traits = Controller.componentTraits[this._editor.selectedComp.label];
        const sideMenu = document.getElementsByTagName("editor-sidemenu")[0] as HTMLElement;
        const traitsMenu = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        const traitsBody = document.getElementById("component-traits");
        traitsBody.innerHTML = `
            <span editor>Component ID: #${(this._editor.selectedElem.parentNode as HTMLElement).id}</span>
            <span editor>Component type: ${this._editor.selectedComp.label}</span>
            <div editor style="height: 1px; background-color: #e0e0e0; width: 90%; margin: 10px"></div>
            ${(() => {
                if (!traits)
                    return "";
                let traitElems = "";
                for (const trait of traits as any[]) {
                    const traitId = genRandId(10);
                    switch (trait.type) {
                        case "text":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='text' onkeydown='editor.traitKeyHandler(event, "${trait.name}")' value="${this._editor.selectedComp.getVar(trait.name)}">
                            `;
                            break;
                        case "number":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='number' onkeydown='editor.traitKeyHandler(event, "${trait.name}")' onchange='editor.traitChangeHandler(event, "${trait.name}")' value="${this._editor.selectedComp.getVar(trait.name)}">
                            `;
                            break;
                        case "checkbox":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='checkbox' onclick='editor.traitCheckHandler(event, "${trait.name}", ["${trait.valueTrue}", "${trait.valueFalse}"])' value="${this._editor.selectedComp.getVar(trait.name)}">
                            `;
                            break;
                        case "color":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <input editor id="${traitId}" type='color' oninput='editor.traitChangeHandler(event, "${trait.name}")'>
                            `;
                            break;
                        case "select":
                            traitElems += `
                                <label editor for="${traitId}">${trait.label}</label>
                                <select editor id="${traitId}" onchange='editor.traitChangeHandler(event, "${trait.name}")' value="${this._editor.selectedComp.getVar(trait.name)}">>
                                    ${(() => {
                                        let selectOptions = "";
                                        for (const option of trait.options)
                                            selectOptions += `<option editor value="${option.id}">${option.name}</option>`;
                                        return selectOptions;
                                    })()}
                                </select>
                            `;
                            break;
                    }
                }
                return traitElems;
            })()}
        `;
        sideMenu.style.display = null;
        traitsMenu.style.display = "block";
    };

    public hideTraitsMenu() {
        const sideMenu = document.getElementsByTagName("editor-sidemenu")[0] as HTMLElement;
        const traitsMenu = document.getElementsByTagName("editor-traitmenu")[0] as HTMLElement;
        sideMenu.style.display = "block";
        traitsMenu.style.display = null;
    };

    public traitKeyHandler(event: KeyboardEvent, traitName: string) {
        if (event.key != "Enter")
            return;
        const el = event.target as any;
        if (!el)
            return;
        this._editor.selectedComp.setVar(traitName, el.value);
    };

    public traitChangeHandler(event: any, traitName: string) {
        const el = event.target as any;
        if (!el)
            return;
        this._editor.selectedComp.setVar(traitName, el.value);
    };

    public traitCheckHandler(event: any, traitName: string, [ traitTrue, traitFalse ]: any) {
        const el = event.target as any;
        if (!el)
            return;
        this._editor.selectedComp.setVar(traitName, el.checked ? traitTrue : traitFalse);
    }
}