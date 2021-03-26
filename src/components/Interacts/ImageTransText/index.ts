import body from "./body.html";

import { Component } from "../../../core/controllers/component";
import { Category, Icon } from "../../../core/controllers/decorators/editor";
@Category("Interacts")
@Icon("fas fa-square")
class ImageTransText extends Component {
    constructor() {
        super("Image TransText", body, { });
    }
};

export default new ImageTransText;
