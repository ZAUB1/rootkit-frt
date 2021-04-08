import body from "./body.html";

import { NucleusComponent } from "../../../core/nucleus/component";
import { Category, Icon } from "../../../core/editor/decorators";
@Category("Interacts")
@Icon("fas fa-square")
class ImageTransText extends NucleusComponent {
    constructor() {
        super("Image TransText", body, { });
    }
};

export default new ImageTransText;
