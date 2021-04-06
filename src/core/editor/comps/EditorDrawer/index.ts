import "./style.scss";
import body from "./body.html";

import * as Editor from "&/core/editor";
import * as Nucleus from "&/core/controllers/component";
import { Built, Vars } from "&/core/controllers/decorators/component";
import Controller from "&/core/controllers";
import { ModelEventHandler } from "&/core/controllers/decorators/model";

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
@Built((_this: Nucleus.ComponentInstance) => {
    //_this.setChildsAttrs(_this.getFirstChild("editor-sidemenu"), "editor", "true");
})
@ModelEventHandler("menuBtn0", "click", function () { console.log("oui"); this.setVar("comps", Controller.componentsCategories[0]) })
@ModelEventHandler("menuBtn1", "click", function () { this.setVar("comps", Controller.componentsCategories[1]) })
class EditorDrawer extends Nucleus.Component {
    constructor() {
        super("EditorDrawer", body, {  });
    }
};

export default new EditorDrawer;