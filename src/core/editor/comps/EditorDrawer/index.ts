import "./style.scss";
import body from "./body.html";

import * as Nucleus from "&/core/controllers/component";
import { Built, Vars, Rendered } from "&/core/controllers/decorators/component";
import Controller from "&/core/controllers";
import { ModelEventHandler } from "&/core/controllers/decorators/model";
import type { ComponentInstance } from "&/core/controllers/component";

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
@Built((_this: ComponentInstance) => {
    _this.setChildsAttrs(_this.DOMElem, "editor", "true");
})
@Rendered((_this: ComponentInstance) => {
    setCurrentMenu.call(_this, 0);
})
@ModelEventHandler("menuBtn0", "click", function() { setCurrentMenu.call(this, 0) })
@ModelEventHandler("menuBtn1", "click", function() { setCurrentMenu.call(this, 1) })
class EditorDrawer extends Nucleus.Component {
    constructor() {
        super("EditorDrawer", body, {  });
    }
};

export default new EditorDrawer;