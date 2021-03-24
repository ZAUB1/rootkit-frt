import Controller from "../";

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
                Controller.componentTraits[(this as any).label] = traits;
            }
        }
        return nclass;
    }
};

export function Icon(icon: string = "fas fa-pen") {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const nclass: any = class extends constructor {
            constructor(..._: any[]) {
                super();
                Controller.componentIcons[(this as any).label] = icon;
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
                        Controller.componentsCategories[0].push(this as any);
                        break;
                    case "Interacts":
                        Controller.componentsCategories[1].push(this as any);
                        break;
                    case "ApiLinked":
                        Controller.componentsCategories[2].push(this as any);
                        break;
                }
            }
        }
        return nclass;
    }
};