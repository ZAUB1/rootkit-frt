import { NucleusComponent } from "../component";
import type { NucleusInstance } from ".";
import Nucleus from "&/core/nucleus";
import { camelToSnake } from "&/core/nucleus/etc/str";

const SPE_OPERAT = [ "for", "if" ];

export default class ComponentDOM {
    private _instance: NucleusInstance;

    constructor(_instance: NucleusInstance) {
        // Forward instance
        this._instance = _instance;
    };

    private parseBool = (str: string) => {
        if (str == "true")
            return true;
        if (str == "false")
            return false;
        return str;
    };

    private for(child: HTMLElement, ite: string, array: string, iterator: string) {
        let pos = 0;
        let res = "";
        const baseContent = child.innerHTML as string;
        for (const _ite of this._instance.vars[array]) {
            const comp = new NucleusComponent("",
                baseContent.replace(/\{ (.*?) \}|\{(.*?)\}/g, (sub: string, ...args: any[]): any => sub.replace(new RegExp(`${ite}.`, "g"), "")),
                { hideFromStack: true }).create();
            comp.vars = _ite;
            iterator ? comp.vars[iterator.split("[")[1].split("]")[0]] = pos++ : void 0;
            comp.rebuild();
            res += comp.content;
        }
        child.outerHTML = res;
    };

    private if(rmPool: HTMLElement[], child: HTMLElement, ifCond: Attr) {
        const rmChild = () => {
            child.innerHTML = "";
            rmPool.push(child);
            return true;
        };

        let [ val, operator, comparaison ] = ifCond.value.split(" ") as any;
        val = val.replace(/['"]+/g, '');
        comparaison = comparaison.replace(/['"]+/g, '');
        (parseFloat(val)) ? val = parseFloat(val) : void 0;
        (parseFloat(comparaison)) ? comparaison = parseFloat(comparaison) : void 0;
        val = this.parseBool(val);
        comparaison = this.parseBool(comparaison);
        (this._instance.vars[val]) ? val = this._instance.vars[val] : void 0;
        (this._instance.vars[comparaison]) ? comparaison = this._instance.vars[comparaison] : void 0;
        switch (operator) {
            case "==":
                if (val != comparaison)
                    return rmChild();
                return false;
            case "!=":
                if (val == comparaison)
                    return rmChild();
                return false;
        }
        return false;
    };

    private createAndRenderComp(child: HTMLElement) {
        const nodeName = child.nodeName.toLowerCase();
        const comp: NucleusComponent = Nucleus.components[`${nodeName.charAt(0).toUpperCase()}${nodeName.slice(1, nodeName.length)}`];
        const compInstance = comp.create();

        // Look for model
        compInstance.model = child.attributes.getNamedItem("nuc-model")?.value;
        compInstance.model ? this._instance.models[compInstance.model] = compInstance : void 0;

        // Look for default vars
        const keys = Object.keys(compInstance.vars);
        for (const key of keys) {
            const childVal = child.attributes.getNamedItem(camelToSnake(key));
            if (!childVal)
                continue;
            compInstance.vars[key] = childVal.value;
        }

        // Saving parent
        compInstance.parent = this._instance;
        compInstance.parentOriginId = this._instance.id;
        compInstance.rebuild();
        compInstance.renderTo(child as HTMLElement);
    };

    public spawnSubComps(el: HTMLElement): void {
        const rmPool: HTMLElement[] = [];
        const tagNames = Object.keys(Nucleus.components).map(tag => tag.toLowerCase());
        for (const child of el.children as any) {
            // Special components for loops and conditions handling
            const opName = child.nodeName.toLowerCase().split("nuc-")[1];
            if (SPE_OPERAT.includes(opName)) {
                if (opName == "for") {
                    const [ite, _, array, iterator] = Object.values(child.attributes).map((val: Attr) => val.name);
                    if (!this._instance.vars[array])
                        continue;
                    this.for(child, ite, array, iterator);
                }
                //continue;
            }

            // If cond handling
            const ifCond = child.attributes.getNamedItem("nuc-if");
            if (ifCond) {
                if (this.if(rmPool, child, ifCond))
                    continue;
            }

            // Is tag a component ?
            if (!tagNames.includes(child.nodeName.toLowerCase())) {
                const model = child.attributes.getNamedItem("nuc-model")?.value;
                (model) ? this._instance.models[model] = child as HTMLElement : void 0;
                this.spawnSubComps(child as HTMLElement);
                continue;
            }

            // Create component
            this.createAndRenderComp(child);
        }

        // Clear the mess
        for (const elem of rmPool)
            elem.remove();
    };
};