import body from "./body.html";
import style from "./style";


import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/editor/decorators";
@Category("Interacts")
@Icon("fas fa-square")
class Thumbnail extends NucleusComponent {
    constructor() {
        super("Thumbnail", body, { });
    }
};

export default new Thumbnail;
