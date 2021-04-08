import Nucleus from "&/core/nucleus";

Nucleus.globalStorage.set("editorCategories", [
    [],
    [],
    [],
    []
]);

export interface Trait {
    type: string;
    label: string;
    name: string;

    placeholder?: string;
    options?: object;
    min?: number;
    max?: number;
    step?: number;
    valueTrue?: string;
    valueFalse?: string;
};

export function Traits(traits: Trait[] = []) {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).traits = traits;
            }
        }
        return nclass;
    }
};

export function Icon(icon: string = "fas fa-pen", color: string = "black") {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                (this as any).icon = icon;
                (this as any).iconColor = color;
            }
        }
        return nclass;
    }
};

export function Category(category: string = "Containers") {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                switch (category) {
                    case "Containers":
                        Nucleus.globalStorage.get("editorCategories")[0].push(this as any);
                        break;
                    case "Interacts":
                        Nucleus.globalStorage.get("editorCategories")[1].push(this as any);
                        break;
                    case "ApiLinked":
                        break;
                }
            }
        }
        return nclass;
    }
};