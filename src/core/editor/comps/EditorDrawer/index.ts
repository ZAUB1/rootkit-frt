import "./style.scss";
import body from "./body.html";

import * as Nucleus from "&/core/nucleus/component";
import { Built, Vars, Rendered } from "&/core/nucleus/decorators/component";
import Controller from "&/core/nucleus";
import { ModelEventHandler } from "&/core/nucleus/decorators/model";
import type { NucleusInstance } from "&/core/nucleus/component";

function setCurrentMenu(menu: number) {
    this.setVar("comps", Controller.componentsCategories[menu]);
    this.getCompByModel(`menuBtn${this.getVar("currentSelected")}`).style.borderBottom = null;
    this.setVarNoBuild("currentSelected", menu);
    this.getCompByModel(`menuBtn${this.getVar("currentSelected")}`).style.borderBottom = "2px solid #9677CF";
};

@Vars({
    menus: [
        { icon: "fas fa-box" },
        { icon: "fas fa-cubes" },
        { icon: "fas fa-database" },
        { icon: "fas fa-layer-group" },
    ],
    currentSelected: 0,
    comps: Controller.componentsCategories[0]
})
@Built((_this: NucleusInstance) => {
    _this.setChildsAttrs(_this.DOMElem, "editor", "true");
})
@Rendered((_this: NucleusInstance) => {
    setCurrentMenu.call(_this, 0);
})
@ModelEventHandler("menuBtn0", "click", function() { setCurrentMenu.call(this, 0) })
@ModelEventHandler("menuBtn1", "click", function() { setCurrentMenu.call(this, 1) })
class EditorDrawer extends Nucleus.NucleusComponent {
    constructor() {
        super("EditorDrawer", body, {  });
    }
};

export default new EditorDrawer;